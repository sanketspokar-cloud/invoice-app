self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("invoice-cache").then(cache =>
      cache.addAll([
        "index.html",
        "app.js",
        "style.css"
      ])
    )
  );
});
