const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(
  // Match all files with the following extensions
  ({ request }) =>
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image',
  // Use a CacheFirst strategy for these files
  new CacheFirst({
    cacheName: 'assets-cache',
    plugins: [
      // CacheableResponsePlugin to cache responses with status 200
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      // ExpirationPlugin to set a maximum age for cached assets
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);
