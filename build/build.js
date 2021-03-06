const fs = require('fs');
const axios = require('axios');
const webpack = require('webpack');
const shell = require('shelljs');
const path = require('path');
const glob = require('glob');
const { Environment, FileSystemLoader } = require('nunjucks');
const { minify } = require('html-minifier');
const config = require('./webpack.prod.conf');
const {
  loadData,
  loadAssets,
  topicSlug,
  topicURL,
} = require('./parameter');
const transformTopics = require('./transform');

process.env.NODE_ENV = 'production';

const assetsPath = './public';

function buildAssets(apiURLs) {
  // prepare assets directory
  shell.rm('-rf', assetsPath);
  shell.mkdir('-p', assetsPath);
  shell.config.silent = true;

  const promises = [
    new Promise((resolve, reject) => {
      webpack(config, (err, stats) => {
        if (err) {
          reject(err);
        } else {
          console.log(stats.toString({
            modules: true,
            children: true,
            chunks: true,
            chunkModules: true,
          }));
          resolve();
        }
      });
    }),
  ];

  // map API call data to build assets
  promises.push(...Object.keys(apiURLs).map((key) => {
    const apiURL = apiURLs[key];
    return new Promise((resolve, reject) => {
      axios(apiURL)
        .then((response) => {
          if (!fs.existsSync('public/data')) {
            fs.mkdirSync('public/data');
          }

          fs.writeFile(
            `public/data/${key}.json`,
            JSON.stringify(response.data),
            (error) => {
              if (error === null) {
                resolve();
                return;
              }
              reject(error);
            },
          );
        })
        .catch(error => reject(error));
    });
  }));

  return Promise.all(promises)
    .then(() => console.log('All assets are rendered.'))
    .catch(error => console.error(error));
}

function getPageFiles() {
  return new Promise((resolve, reject) => {
    glob('assets/pages/**/*.jinja', (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

const minifyOption = {
  removeComments: true,
  minifyJS: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  html5: true,
};

function createRenderPagePromise(env, assets, data, baseURL, fbAppID, file) {
  return new Promise((resolve, reject) => {
    if (path.basename(file).startsWith('_')) {
      // if the filename starts with underscore, do not render it.
      resolve();
      return;
    }

    // parse proper output path and pageURL
    const urlpath = file.replace(/^assets\/pages\/(.+?)\.jinja$/, '$1.html');
    const filepath = `public/${urlpath}`;
    const normalizedPath = urlpath.replace(/(^|\/)index\.html$/, '$1');
    const pageURL = `${baseURL}/${normalizedPath}`;

    const res = env.render(file.replace('assets/pages/', ''), {
      assets,
      data,
      pageURL,
      fbAppID,
    });
    const content = minify(res, minifyOption);
    if (!fs.existsSync(filepath)) {
      const dirpath = path.dirname(filepath);
      if (!fs.existsSync(dirpath)) {
        fs.mkdirSync(dirpath);
      }
      if (!fs.lstatSync(dirpath).isDirectory()) {
        throw new Error(`path is not a directory: ${dirpath}`);
      }
    }
    fs.writeFile(filepath, content, 'utf-8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function createDetailPagePromise(env, {
  assets, data, baseURL, fbAppID,
}, { id, topic }) {
  return new Promise((resolve, reject) => {
    const pageURL = topicURL(baseURL, id);
    const res = env.render('topic.jinja', {
      assets,
      data,
      topic,
      pageURL,
      fbAppID,
    });
    const content = minify(res, minifyOption);
    const filepath = path.join('public', 'topic', id, 'index.html');
    shell.mkdir('-p', path.dirname(filepath));
    fs.writeFile(filepath, content, 'utf-8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function buildPages(apiURLs, baseURL, fbAppID) {
  const layoutsLoader = new FileSystemLoader('assets/layouts');
  const pagesLoader = new FileSystemLoader('assets/pages');
  const env = new Environment([pagesLoader, layoutsLoader]);
  env.addFilter('topicSlug', topicSlug);
  env.addFilter('topicURL', topicURL.bind(null, baseURL));

  const files = await getPageFiles();
  const data = await loadData(apiURLs);

  const assets = await loadAssets();
  const createRenderPage = createRenderPagePromise.bind(null, env, assets, data, baseURL, fbAppID);
  const promises = files.map(createRenderPage);
  const topics = transformTopics(data.timetable);
  // eslint-disable-next-line no-restricted-syntax
  for (const [id, topic] of topics) {
    promises.push(createDetailPagePromise(env, {
      assets,
      data,
      baseURL,
      fbAppID,
    }, { id, topic }));
  }

  return Promise.all(promises)
    .then(() => console.log('All pages is rendered'))
    .catch(error => console.error(error));
}

(async () => {
  const apiURLs = {
    timetable: 'https://data.hkoscon.org/api/v1/days/HKOSCon%202018',
    general: 'https://data.hkoscon.org/api/v1/info/HKOSCon%202018',
  };
  await buildAssets(apiURLs);
  await buildPages(
    apiURLs,
    process.env.BASE_URL || 'https://hkoscon.org/2018',
    process.env.FB_APP_ID || '',
  );
})();
