/* Gametro9 offline helper. Keeps the site and games working with weak or no internet.
   Bump VERSION whenever you upload big changes, so phones pick up the new files. */
const VERSION = 'g9-v4';
const SHELL = ['./', './index.html', './games.js', './stats.js', './favicon.svg',
  './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './play/chai-empire/'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
/* Show the saved copy instantly, then refresh it from the internet in the background. */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin && !url.hostname.endsWith('gstatic.com') && !url.hostname.endsWith('googleapis.com')) return;
  if (url.pathname.endsWith('stats.json')) return; // live numbers always come fresh
  e.respondWith(caches.open(VERSION).then(async cache => {
    const hit = await cache.match(req, { ignoreSearch: url.origin === location.origin && req.mode === 'navigate' });
    const net = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()); return res; })
      .catch(() => hit || (req.mode === 'navigate' ? cache.match('./') : undefined));
    return hit || net;
  }));
});
