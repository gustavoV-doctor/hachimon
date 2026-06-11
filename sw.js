const CACHE_NAME = 'hachimon-tracker-v4';
const LOCAL_ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './assets/icon_512.png',
    './assets/gai_hero.jpg',
    './assets/gai_gates.jpg',
    './assets/gates_diagram.jpg',
    './assets/night_guy.jpg'
];
const FONTS_CSS = 'https://fonts.googleapis.com/css2?family=Anton&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Noto+Serif+JP:wght@400;700;900&display=swap';

// Install: precache atômico dos assets locais; fontes em best-effort
// (uma falha de terceiro não pode impedir o SW de ativar).
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async cache => {
            await cache.addAll(LOCAL_ASSETS);
            try {
                const res = await fetch(FONTS_CSS);
                if (res && res.ok) {
                    await cache.put(FONTS_CSS, res.clone());
                    const css = await res.text();
                    const urls = [...css.matchAll(/url\((https:[^)]+)\)/g)].map(m => m[1]);
                    await Promise.all(urls.map(u => cache.add(u).catch(() => { })));
                }
            } catch (e) { /* fontes entram pelo runtime cache na próxima visita online */ }
        })
    );
    self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

/** fetch com teto de espera — rede ruim (não morta) não pode pendurar o app. */
function networkWithTimeout(req, ms) {
    return Promise.race([
        fetch(req),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))
    ]);
}

// Fetch:
//  - Arquivos do próprio app (HTML/CSS/JS) → network-first com timeout de 3,5s:
//    frescos online, caem pro cache offline OU em rede arrastada.
//  - Terceiros (Google Fonts, com URL versionada) → cache-first: rápido e estável.
self.addEventListener('fetch', event => {
    const req = event.request;
    if (req.method !== 'GET') return;

    const sameOrigin = new URL(req.url).origin === self.location.origin;

    if (sameOrigin) {
        event.respondWith(
            networkWithTimeout(req, 3500).then(res => {
                if (res && res.status === 200) {
                    const clone = res.clone();
                    caches.open(CACHE_NAME).then(c => c.put(req, clone));
                }
                return res;
            }).catch(() =>
                caches.match(req).then(hit =>
                    hit || (req.destination === 'document' ? caches.match('./index.html') : undefined))
            )
        );
        return;
    }

    // cache-first (fonts e afins)
    event.respondWith(
        caches.match(req).then(hit => hit || fetch(req).then(res => {
            if (res && res.status === 200) {
                const clone = res.clone();
                caches.open(CACHE_NAME).then(c => c.put(req, clone));
            }
            return res;
        }).catch(() => undefined))
    );
});
