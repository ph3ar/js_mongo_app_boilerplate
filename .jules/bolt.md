## 2026-03-09 - [Refactoring Sequential Awaits]
**Learning:** Found multiple instances where independent API requests were `await`ed sequentially in controller methods (e.g., `getArtistInfo`, `getArtistTopTracks`, `getArtistTopAlbums` in `getLastfm`). This is an anti-pattern as it multiplies latency.
**Action:** Use `await Promise.all([req1, req2, req3])` with array destructuring assignment to run these independent async operations concurrently, drastically improving request response time.
