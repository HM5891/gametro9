/* Gametro9 offline helper.
   Pages and scripts: always fetch the newest version when online, use the saved copy only when offline.
   Images and fonts: use the saved copy first (fast), refresh in the background.
   Bump VERSION after big uploads. */
const VERSION = 'g9-v7';
const SHELL = ['./', './index.html', './games.js', './stats.js', './favicon.svg',
  './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './play/chai-empire/'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const same = url.origin === location.origin;
  if (!same && !url.hostname.endsWith('gstatic.com') && !url.hostname.endsWith('googleapis.com')) return;
  if (url.pathname.endsWith('stats.json')) return;
  const fresh = same && (req.mode === 'navigate' || /\.(html|js|json|webmanifest)$/.test(url.pathname) || url.pathname.endsWith('/'));
  e.respondWith(caches.open(VERSION).then(async cache => {
    if (fresh) {
      try {
        const res = await fetch(req.url, { cache: 'no-store', credentials: 'same-origin' });
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      } catch (err) {
        return (await cache.match(req, { ignoreSearch: true })) || (req.mode === 'navigate' ? cache.match('./') : Response.error());
      }
    }
    const hit = await cache.match(req);
    const net = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()); return res; }).catch(() => hit);
    return hit || net;
  }));
});
