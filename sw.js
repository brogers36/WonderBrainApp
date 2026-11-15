/* WonderBrain's release version is generated from the complete app and worker.
   Run node scripts/prepare-release.cjs after changing the published app files. */
'use strict';

const VERSION = 'v3.1-03847e8f2b191ada8dd4e54fe62c95f982c46b4dda7c7d44e07f0e9adcdb1e53';
const SCOPE = new URL(self.registration.scope);
const CACHE_PREFIX = `wonderbrain:${encodeURIComponent(SCOPE.href)}:`;
const CACHE_NAME = `${CACHE_PREFIX}${VERSION}`;
const INDEX_URL = new URL('./index.html', SCOPE).href;
const ROOT_URL = SCOPE.href;
const NAVIGATION_TIMEOUT_MS = 4000;
const ASSETS = [
  {path: './index.html', kind: 'html'},
  {path: './manifest.webmanifest', kind: 'manifest'},
  {path: './icons/icon-192.png', kind: 'png'},
  {path: './icons/icon-512.png', kind: 'png'},
  {path: './icons/icon-maskable-512.png', kind: 'png'},
  {path: './icons/apple-touch-icon.png', kind: 'png'}
].map(asset => ({...asset, url: new URL(asset.path, SCOPE).href}));
const ASSET_BY_URL = new Map(ASSETS.map(asset => [asset.url, asset]));

function withinScope(url) {
  return url.origin === SCOPE.origin && url.pathname.startsWith(SCOPE.pathname);
}

// Validate downloads before putting anything into the offline cache. In
// particular, a hosting provider's HTML error page must never become an icon.
async function usableResponse(response, asset) {
  if (!response || !response.ok || response.type === 'opaque' || response.type === 'opaqueredirect') return false;
  const finalURL = new URL(response.url || asset.url);
  if (!withinScope(finalURL)) return false;
  if (asset.kind === 'png') {
    const bytes = new Uint8Array(await response.clone().arrayBuffer());
    const signature = [137, 80, 78, 71, 13, 10, 26, 10];
    return signature.every((byte, index) => bytes[index] === byte);
  }
  if (asset.kind === 'manifest') {
    try {
      const manifest = await response.clone().json();
      return manifest !== null && typeof manifest === 'object' && !Array.isArray(manifest);
    } catch { return false; }
  }
  const contentType = response.headers.get('content-type') || '';
  if (!/^(text\/html|application\/xhtml\+xml)(?:;|$)/i.test(contentType)) return false;
  const html = await response.clone().text();
  return /<html[\s>]/i.test(html) && /WonderBrain/i.test(html);
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cacheAlreadyExisted = (await caches.keys()).includes(CACHE_NAME);
    try {
      const downloads = await Promise.all(ASSETS.map(async asset => {
        const response = await fetch(new Request(asset.url, {
          cache: 'reload', credentials: 'same-origin', redirect: 'error'
        }));
        if (!(await usableResponse(response, asset))) throw new Error(`Cannot cache ${asset.path}`);
        return {asset, response};
      }));
      const cache = await caches.open(CACHE_NAME);
      await Promise.all(downloads.map(({asset, response}) => cache.put(asset.url, response)));
      // Root navigations use INDEX_URL as an alias, avoiding a second copy of
      // the large, self-contained document in Cache Storage.
      await self.skipWaiting();
    } catch (error) {
      if (!cacheAlreadyExisted) await caches.delete(CACHE_NAME);
      throw error;
    }
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

async function readCached(url) {
  try { return await (await caches.open(CACHE_NAME)).match(url); }
  catch { return undefined; }
}

async function remember(url, response) {
  // A full or unavailable disk must not prevent an otherwise valid online load.
  try { await (await caches.open(CACHE_NAME)).put(url, response.clone()); }
  catch { /* Keep serving the successful network response. */ }
}

async function navigate(request) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), NAVIGATION_TIMEOUT_MS);
  try {
    const response = await fetch(request, {signal: controller.signal, cache: 'no-cache'});
    if (!(await usableResponse(response, ASSETS[0]))) throw new Error('App document unavailable');
    // Keep this worker's complete offline release intact. A newer document
    // enters its own versioned cache only after the next full worker install.
    return response;
  } catch {
    const cached = await readCached(INDEX_URL);
    return cached || new Response('WonderBrain is unavailable. Connect to the internet and reopen the app to prepare its offline copy.', {
      status: 503, headers: {'Content-Type': 'text/plain; charset=utf-8'}
    });
  } finally { clearTimeout(timeout); }
}

async function appAsset(request, asset) {
  const cached = await readCached(asset.url);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (!response.ok) return response;
    if (!(await usableResponse(response, asset))) {
      return new Response('The requested WonderBrain asset is unavailable.', {
        status: 502, headers: {'Content-Type': 'text/plain; charset=utf-8'}
      });
    }
    await remember(asset.url, response);
    return response;
  } catch { return Response.error(); }
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || request.headers.has('range')) return;
  const url = new URL(request.url);
  if (!withinScope(url)) return;
  url.search = ''; url.hash = '';
  const canonicalURL = url.href;
  if (request.mode === 'navigate') {
    // WonderBrain uses hash links, so only its actual entry documents need a
    // navigation fallback. Unknown paths keep their normal server semantics.
    if (canonicalURL === ROOT_URL || canonicalURL === INDEX_URL) event.respondWith(navigate(request));
    return;
  }
  const asset = ASSET_BY_URL.get(canonicalURL);
  if (asset) event.respondWith(appAsset(request, asset));
});
