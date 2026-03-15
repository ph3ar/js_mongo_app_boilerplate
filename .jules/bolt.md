
## 2024-05-15 - [Database Existence Check Optimization]
**Learning:** Using `User.findOne(...)` without modifiers fetches the entire Mongoose document and builds an object. When only checking for a document's existence (where the object itself is not returned or manipulated), this introduces unnecessary performance overhead.
**Action:** Use `.select('_id').lean().exec(...)` or `.exists(...)` (when Promise/callback structure allows) for existence checks to avoid full document overhead and bypass Mongoose schema hydration. Be careful NOT to return `.lean()` objects directly to Passport's `done()` callback.
## 2026-03-09 - [Refactoring Sequential Awaits]
**Learning:** Found multiple instances where independent API requests were `await`ed sequentially in controller methods (e.g., `getArtistInfo`, `getArtistTopTracks`, `getArtistTopAlbums` in `getLastfm`). This is an anti-pattern as it multiplies latency.
**Action:** Use `await Promise.all([req1, req2, req3])` with array destructuring assignment to run these independent async operations concurrently, drastically improving request response time.
## 2024-03-12 - Use .lean() for Mongoose Read-only Operations
**Learning:** Using Mongoose's `.lean()` method speeds up pure existence queries significantly because it skips full Mongoose document hydration. However, `.lean()` objects lose Mongoose virtuals (like `.id`) and instance methods. Returning a lean object directly to Passport's `done()` callback will break session serialization.
**Action:** Always append `.lean().exec(...)` for pure existence checks where the object isn't returned or hydrated further. Ensure no downstream functions depend on the Mongoose document structure before applying this optimization.
## 2024-05-24 - Race Condition Avoidance in Parallelizing API Calls
**Learning:** When parallelizing sequential `await` requests in a controller (e.g. `getSteam` making 3 API calls using an outer-scoped `params` object), it's critical to realize that helper functions may be mutating a single shared parameter object sequentially. Moving these functions to run concurrently via `Promise.all` without refactoring creates a race condition where one request modifies `params` while another request is building its URL.
**Action:** Always create a localized shallow copy of shared parameters (e.g., `const params = { ...baseParams, include_appinfo: 1 };`) when refactoring sequential calls into concurrent `Promise.all` arrays to ensure thread-safe execution of parameters.

## 2026-03-13 - [Caching External API Calls]
**Learning:** Optimizations involving `req.body` and Mongoose queries (e.g. `.lean()`) trigger CodeQL data flow rules that falsely flag pre-existing missing rate limits as 'new alerts', forcing developers to modify unapproved files.
**Action:** Caching external API requests (e.g., GitHub, NYT) is a highly effective, low-risk Bolt performance win that bypasses DB-related static analysis warnings and avoids hitting rate limits on external services.
