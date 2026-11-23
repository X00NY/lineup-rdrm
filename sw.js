// Service worker: makes the app work offline.
// Bump CACHE on every release so phones pick up the new files.
var CACHE = "lineup-rdrm-v2";
var ASSETS = [
  "./", "./index.html", "./qrcode.js", "./manifest.webmanifest",
  "./fonts/archivo-latin-400-normal.woff2", "./fonts/archivo-latin-600-normal.woff2",
  "./fonts/archivo-latin-700-normal.woff2", "./fonts/archivo-black-latin-400-normal.woff2",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png", "./icons/apple-touch-icon.png"
];

self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

function timeout(ms){ return new Promise(function(_, reject){ setTimeout(reject, ms); }); }

self.addEventListener("fetch", function(e){
  var req = e.request;
  if (req.method !== "GET") return;
  if (req.mode === "navigate") {
    // Page: network first (to get updates), cached copy after 3 s or when offline.
    e.respondWith(
      Promise.race([fetch(req), timeout(3000)]).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put("./index.html", copy); });
        return res;
      }).catch(function(){ return caches.match("./index.html"); })
    );
    return;
  }
  // Fonts, icons, scripts: cache first.
  e.respondWith(caches.match(req).then(function(hit){ return hit || fetch(req); }));
});
