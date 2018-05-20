import Modernizr from 'modernizr';

/* globals navigator, window */

Modernizr.addTest('android', navigator.userAgent.indexOf('Android') !== -1);
Modernizr.addTest('ios', !!navigator.userAgent.match(/iOS/i));
Modernizr.addTest('pwa', window.matchMedia('(display-mode: standalone)').matches);
Modernizr.addTest('serviceworker', 'serviceworker' in navigator);
