const CACHE='reino-17-69475351';
const ARQS=['./','index.html','jogo.69475351.js','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ARQS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE&&k!=='reino-fontes').map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  const u=new URL(r.url);
  if(u.host.includes('fonts.googleapis.com')||u.host.includes('fonts.gstatic.com')){
    e.respondWith(caches.open('reino-fontes').then(c=>c.match(r).then(m=>m||fetch(r).then(res=>{c.put(r,res.clone());return res;}))));return;}
  if(u.origin!==location.origin) return;
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put('index.html',cp));return res;}).catch(()=>caches.match('index.html')));return;}
  e.respondWith(caches.match(r).then(m=>m||fetch(r)));
});
