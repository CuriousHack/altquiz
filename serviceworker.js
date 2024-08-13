const altQuiz = "AltQuiz-v1"
const assets = [
  "/",
  "/index.html",
  "/quiz.html",
  "/assets/css/app.css",
  "/assets/js/app.js",
  "/assets/images/altQuiz.png",
  "/assets/images/altQuiz.svg",
  "/assets/images/android-chrome-192x192.png",
  "/assets/images/android-chrome-512x512.png",
  "/assets/images/apple-touch-icon.png",
  "/assets/images/favicon-16x16.png",
  "/assets/images/favicon-32x32.png",
  "/favicon.ico",
  
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(altQuiz).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })