const CACHE='reino-22-b08c2251';
const ARQS=['./','index.html','jogo.b08c2251.js','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png'];
const ARTE=['arte/abertura.webp','arte/chao.webp','arte/k_c01.webp','arte/k_c02.webp','arte/k_c03.webp','arte/k_c04.webp','arte/k_c05.webp','arte/k_c06.webp','arte/k_c07.webp','arte/k_c08.webp','arte/k_c09.webp','arte/k_c10.webp','arte/k_c11.webp','arte/k_c12.webp','arte/k_c13.webp','arte/k_c14.webp','arte/k_c15.webp','arte/k_c16.webp','arte/l_aponta.webp','arte/l_cintura.webp','arte/l_corpo.webp','arte/l_engrenagem.webp','arte/l_oculos.webp','arte/l_rosto.webp','arte/p_academia1.webp','arte/p_academia2.webp','arte/p_academia3.webp','arte/p_alojamento1.webp','arte/p_alojamento2.webp','arte/p_alojamento3.webp','arte/p_arsenal1.webp','arte/p_arsenal2.webp','arte/p_arsenal3.webp','arte/p_banco1.webp','arte/p_banco2.webp','arte/p_banco3.webp','arte/p_central1.webp','arte/p_central2.webp','arte/p_central3.webp','arte/p_deposito1.webp','arte/p_deposito2.webp','arte/p_deposito3.webp','arte/p_fazenda1.webp','arte/p_fazenda2.webp','arte/p_fazenda3.webp','arte/p_forja1.webp','arte/p_forja2.webp','arte/p_forja3.webp','arte/p_madeireira1.webp','arte/p_madeireira2.webp','arte/p_madeireira3.webp','arte/p_oficina1.webp','arte/p_oficina2.webp','arte/p_oficina3.webp','arte/p_pedreira1.webp','arte/p_pedreira2.webp','arte/p_pedreira3.webp','arte/p_quartel1.webp','arte/p_quartel2.webp','arte/p_quartel3.webp','arte/p_sede1.webp','arte/p_sede2.webp','arte/p_sede3.webp','arte/p_siderurgica1.webp','arte/p_siderurgica2.webp','arte/p_siderurgica3.webp','arte/p_taverna1.webp','arte/p_taverna2.webp','arte/p_taverna3.webp'], CARTE='reino-arte-6e1a3aec';
const guardaArte=()=>caches.open(CARTE).then(c=>Promise.all(ARTE.map(a=>c.match(a).then(m=>m||c.add(a).catch(()=>0)))));
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ARQS)).then(guardaArte).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE&&k!=='reino-fontes'&&k!==CARTE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  const u=new URL(r.url);
  if(u.host.includes('fonts.googleapis.com')||u.host.includes('fonts.gstatic.com')){
    e.respondWith(caches.open('reino-fontes').then(c=>c.match(r).then(m=>m||fetch(r).then(res=>{c.put(r,res.clone());return res;}))));return;}
  if(u.origin!==location.origin) return;
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put('index.html',cp));return res;}).catch(()=>caches.match('index.html')));return;}
  if(u.pathname.includes('/arte/')){e.respondWith(caches.open(CARTE).then(c=>c.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok)c.put(r,res.clone());return res;}))));return;}
  e.respondWith(caches.match(r).then(m=>m||fetch(r)));
});
