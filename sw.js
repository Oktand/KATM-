const C='katm-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.open(C).then(async c=>{
    const hit=await c.match(e.request);
    if(hit)return hit;
    const r=await fetch(e.request);
    if(r&&(r.ok||r.type==='opaque'))c.put(e.request,r.clone());
    return r;
  }));
});
