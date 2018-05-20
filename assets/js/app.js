import 'babel-polyfill';
import $ from 'jquery';
import './https';
import './ga';
import '../scss/app.scss';
import './toc';
import './offline';
import './detect';
import './sw';
import './eggs';

$('.button-collapse').sideNav();
$('.collapsible').collapsible();
$('.collapsible a.collapsible-header').click((e) => { e.preventDefault(); });
$('.scrollspy').scrollSpy();
$('ul.tabs').tabs();
