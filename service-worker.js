/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["0.312d7eb71942dd71e374.js","aabf7ef43c0d11dfdb8ef526759e5323"],["0.312d7eb71942dd71e374.js.map","9634e16abc8220d13097a9561bb52053"],["1.077bfcef83f4809dfec6.js","d397ca0ab154dfe2e69527a7198005c4"],["1.077bfcef83f4809dfec6.js.map","21adc47e4ed618fdc1eda2807f462807"],["10.88822a08851935ad37b9.js","73d26c89e43e4a00068402f727edc7af"],["10.88822a08851935ad37b9.js.map","1aacafcc9eea1a7bffda4be65443d4ef"],["2.9cabb3f75c68112290f9.js","fac03e383ba502e9e3f9ace43b350d0a"],["2.9cabb3f75c68112290f9.js.map","39d5b0720eb5ce28c0fc6123c05c7998"],["6.cd9001b3ce772d98bd78.js","9a7793a8707de4af829d0a0282f0319e"],["6.cd9001b3ce772d98bd78.js.map","818606f6bbc028cee6d1bd7989470fe4"],["7.a3e1f8de3be40a46c37d.js","c9affa332ba291497fe110c3e0519641"],["7.a3e1f8de3be40a46c37d.js.map","791a3391ab93e80ce125655dc376262b"],["8.21a69057bf91b7d08d09.js","474c19daa5595b07a226192cdf6fb433"],["8.21a69057bf91b7d08d09.js.map","735a6a63d09fc59e3b3ea2db0a2027d7"],["9.d87480ca50eae272542a.js","22b8a526a51eb78bdb26f60d705c5a4d"],["9.d87480ca50eae272542a.js.map","efda73ed8a5b6c290d06d1daf4bfb102"],["about-coc.html","e0bbb3988a9989a2254aebd73dda1415"],["about-committee.html","fc057386dcb3f87e897398f1afbbb728"],["app.103b1fcb39ca5ecc8c001dab5ec03d11.css","0cc21399375123e3266bcf1ec7f3c9c0"],["app.c969e3c4ab871deb928d.js","28cfdbbdda78cf0911f74570a295f5e5"],["app.c969e3c4ab871deb928d.js.map","887610b267c14cfe933fd94980136cfe"],["assets.json","1ad7889a44f44bff7860059a162baf8d"],["cfc.html","beb00a59d66de97eb9be69051411040f"],["cfp.html","f465c00d826865507363e3b27bf00a67"],["cookie.html","e70f0c30aa6f078901733166568eb7ee"],["data/cfp.yml","b65395f8bc8ec35b6c50481d9b14eb54"],["data/community.yml","97a422185106c43f1c36fac6f5a715e9"],["data/general.json","2d7df60c6d0ba905f5c2d5ccec561368"],["data/site.yml","57a5d07879d37c810fd7fc7bc507da52"],["data/timetable-schema.yml","bb7808550ef501ed7f4f09d113e9d0d5"],["data/timetable.json","953608d93dba91a87ea8a6fd1e1fc83b"],["images/banner.jpg","9768d02a027b70840243d53a3f708a50"],["images/cover.jpg","3f1ffa6f7cf5ec7dbd79bd6164f28467"],["images/favicon.png","4634634056d4299d4f1a856d4e52e500"],["images/keyvisual.jpg","85a9cf8ed7185b1eb3109fb0180f86ca"],["images/slides.png","6f8bfd0615b90219315fb8b566bb3e44"],["images/theme-day1.jpg","e1645b5f0388e69308bb8fa1d4875156"],["images/theme-day2.jpg","4ce1064fcd8843b6363844ec866e417b"],["index.html","da08040f6671a96e48f0071037ff42ad"],["manifest.12e07d0109b7a6b5396e.js","a4d61426d002fb85bfddbad8683b65f6"],["manifest.12e07d0109b7a6b5396e.js.map","d5e180b3e9ba7edd6165bbd471908088"],["manifest.json","bab2f310e98acf8fe10106f573b72bc7"],["sponsors/index.html","c99131a3280dec8917358c4f8b887453"],["timetable.afe18ccf3a955a3f4f83.js","af361f687cbafa29ecd37b538dc9dbac"],["timetable.afe18ccf3a955a3f4f83.js.map","0494e17e86edce867a5153af93155c5d"],["timetable/index.html","181d7577b48e2523ace0cacc6c984c05"],["topic/0-1-hk01-internet-transformation-open-source/index.html","52c673e71e02645bf6e7e4e2f6a26445"],["topic/blockchain-and-distributed-ledger-technology-documents/index.html","dbb149a540ffc6aec654d177f765315a"],["topic/blockchain-creative-contents-what-we-do-likecoin/index.html","f01a1cafbbbf4d200c8122af1918ad1e"],["topic/blockchain-discussion-panel/index.html","f2f653c74ddbf25d991f87225c3ca85e"],["topic/blockchain-scalability-solutions-how-build-decentralized-exchanges/index.html","35509067cf2f48aeb3fed9697245e33e"],["topic/boring-ai-business/index.html","669e7ae2f08323eb7c2d66c91ed78915"],["topic/browsers-behind-scenes/index.html","7fac48b82b05925ab9be4b341a2ad1ac"],["topic/containerized-high-availability-virtual-hosting-deployment-kubernetes-docker-and-ansible/index.html","f288df6f8b1f3bda8f42b5de564896e8"],["topic/crossing-relation-and-document-database-using-mysql/index.html","9f06360f49160d6f9744d0a8875c2f10"],["topic/dapp-new-approach-combine-blockchain-and-cryptography-web-application/index.html","7c924b681dd2aa9b9a4ef463ef2c15e1"],["topic/data-pipeline-apache-kafka/index.html","cba495e7447fa721414641fcc4c461ba"],["topic/deploy-serverless-chat-bot-quick-skygear/index.html","d7fc31fa53f5b47196546d6b1810ce41"],["topic/disruption-system-how-open-data-changing-genomic-research/index.html","69be11d80b12e16c50546304cf06ccbf"],["topic/fn-project-how-serverless-empowers-developers-adopt-different-programming-languages/index.html","1c0100226d3445431c57fce0652ca479"],["topic/git-time-travellers/index.html","b066cc995583b7baa18e2f9a42b04691"],["topic/haxe-better-javascript-practical-guide-making-front-end-development-fun-fast-and-less/index.html","6eabefd5aad557bd76d2ae461f593b44"],["topic/heading-new-stage-mysql-80/index.html","4661de32c863dbcaff6c51fd40ae6232"],["topic/how-openresty-guarantees-code-quality-open-source-projects/index.html","694ccbc478c9fcde28db5bfc8d74dd1b"],["topic/lets-fix-internet/index.html","03cd1dd22b5f23bacce692e1b3f7b4fa"],["topic/lightning-talk/index.html","f2c75c8b4b50f00a516173aa540e20e3"],["topic/maintaining-open-source-while-maintaining-your-sanity/index.html","eb05dd2119b0838e36740a57d1f726cd"],["topic/managing-domain-names-your-open-source-projects-gandi/index.html","8186e18f603b9812d90e0d7e33e015cd"],["topic/memory-forensics-101/index.html","d1129f71462b6878b329262e865b08d5"],["topic/mixed-reality-web/index.html","9a69ae7fbc40e9fe6734126453676c1e"],["topic/mysql-fault-tolerant-best-practice-lesson-learned-cases-i-experienced/index.html","483456125f3424c879d045f477aab20f"],["topic/mysql-group-replicationzaijinrongchangjingdeyingyongshijian/index.html","a253115ab8623b5cba6781e6332fded5"],["topic/open-source-agriculture/index.html","99fd78dd2d0dabb660bb83d01414acfa"],["topic/practical-javascript-fuzzing/index.html","9b40b9b317573ec7decb8139ef32127a"],["topic/qilaizaofangeguangdonghuazi/index.html","0f936f186f207f7f416c341224944b75"],["topic/r-short-talks-2/index.html","a71c36199afc33b30515dc4ecfca17ff"],["topic/r-short-talks/index.html","63e3b587a473be6c3179d025af9a753f"],["topic/raspberry-pi-r3-scalable-high-availability-mysql-innodb-cluster-and-apache-kafkar-distributed/index.html","26a53420b1431830da8fb2cbf95c93b4"],["topic/react-async-rendering-paradigm-shift-after-react-fiber/index.html","518b3bf69abf81994f1cb21d028a0b55"],["topic/refactoring-gibbon/index.html","c3f5d0ffa86da6972cfec02722dd374f"],["topic/run-multiple-isolated-web-applications-containers-single-ip-cloud/index.html","d7adc6e6c0f735b48aa6d5617a5e116d"],["topic/scaling-tbs-data-apache-spark-and-scala-dsl-production/index.html","bfa52f43c838b32789efaf2ef256f15d"],["topic/type-safe-rest-api-haxe/index.html","9db10a4794dd21333ff5c3cbd1d211f8"],["topic/unconference-anime-scene-search-image/index.html","1cf410517a646f8c45d63aebc0332104"],["topic/unconference-open-source-aiml-tools-technology-product-developers/index.html","df2cb7757de5c8728049302d75738a5c"],["topic/unconference/index.html","e1d88707b5a86a5f2b8b0fdb57eda386"],["topic/using-web-software-architecture-traditional-desktop-app-development-how-fluxredux-was-ported/index.html","97eb6f6634a84c936aa78f9ed90625c9"],["topic/videojs-hls/index.html","d134149a1baa4789f0f7deee3b58750f"],["topic/why-your-domain-name-matters/index.html","ad4df79a9cb4b06cf4db479da42c1e65"],["vendor.b8e4240eb4360f3bb2d0.js","ecba23abed03e4294239d65b63c6725b"],["vendor.b8e4240eb4360f3bb2d0.js.map","b889f5254dc4a02bf404b60665252a34"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







