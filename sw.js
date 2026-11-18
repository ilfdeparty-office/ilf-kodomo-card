// Only static app assets are cached. Member input, photos and print output are never cached here.
const CACHE = 'ilf-kodomo-card-shell-v1-4-pwa-1';
const ASSETS = ['./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install', event => {event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate', event => {event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('ilf-kodomo-card-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch', event => {
  if(event.request.method!=='GET')return;
  const u=new URL(event.request.url);
  if(u.origin!==self.location.origin)return;
  const path=u.pathname.split('/').pop();
  if(!['index.html','manifest.webmanifest','icon-192.png','icon-512.png',''].includes(path))return;
  event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request,{cache:'no-store'})));
});
