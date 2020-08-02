// imports
importScripts('js/sw-utils.js');
const STATIC = 'static-v3';
const DYNAMIC = 'dynamic-v1';
const INMUTABLE = 'inmutable-v1';
const APP_SHEEL = [
    // '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
    'js/sw-utils.js'
];
const APP_SHEEL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js'
]

self.addEventListener('install', e => {

    const chStatic = caches.open(STATIC).then(ch => {
        ch.addAll(APP_SHEEL);
    });
    const chInmutable = caches.open(INMUTABLE).then(ch => {
        ch.addAll(APP_SHEEL_INMUTABLE);
    });

    e.waitUntil(Promise.all([chStatic, chInmutable]));
});

self.addEventListener('activate', e => {
    const rpt = caches.keys().then(keys => keys.forEach(k => (k != STATIC && k.includes('static')) ? caches.delete(k) : null));
    e.waitUntil(rpt);
});

self.addEventListener('fetch', e => {
    const rpt = caches.match(e.request).then(rs => {
        if (rs) {
            return rs;
        } else {
            return fetch(e.request).then(nwRs => {
                return actualizaCacheDinamico(DYNAMIC, e.request, nwRs);
            });
            console.log(e.request.url);
        }
    });
    e.respondWith(rpt);
});
