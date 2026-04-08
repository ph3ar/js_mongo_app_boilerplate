## 2026-03-20 - Mongoose .lean() with Passport
**Learning:** Returning lean Mongoose objects (plain JS objects) to Passport's `done()` callback causes critical authentication regressions. Passport's `serializeUser` relies on Mongoose virtual getters like `.id`. Because `.id` evaluates to `undefined` on plain objects, OAuth login fails entirely.
**Action:** Never apply `.lean()` to Mongoose queries if the resulting document is directly passed to a Passport authentication strategy callback or used for subsequent `.save()` operations. Only use `.lean()` for pure existence checks where the object is discarded or only specific string properties are read.
## 2024-05-15 - Mongoose read-only query performance
**Learning:** Using `.lean()` on Mongoose `.findOne()` and `.find()` queries where the returned document is only used to check for existence (e.g., checking if an email is already registered) skips instantiating a full Mongoose document, returning a simple POJO. This reduces execution time and memory overhead. However, it's crucial to remember that virtuals and methods are lost; references to `.id` must be updated to `._id.toString()` if passed to downstream code like Passport serialization.
**Action:** Always append `.lean()` to Mongoose queries that fetch data for read-only purposes, especially within authentication loops or frequent API calls, ensuring no document modifications or virtual property accesses are required.
## 2023-10-24 - Speeding up Mongoose Reads with .lean()
**Learning:** By default, Mongoose queries return instances of the Mongoose Document class. Documents are much heavier than vanilla JavaScript objects, because they have a lot of internal state for change tracking. We can append `.lean()` to queries to return plain JavaScript objects instead.
**Action:** Use `.lean()` whenever you're querying for documents that won't be updated (e.g. read-only checks to see if an email already exists), saving significant memory and compute time. BUT CAUTION: Using `.lean()` strips Mongoose-specific properties, meaning virtuals (like `id` vs `_id`) won't be available!

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

## 2026-03-22 - [Caching Static External API Calls]
**Learning:** Some controller endpoints (like `/api/lastfm`) make external API calls for static data (e.g., info about a specific artist "Roniit") that does not vary per user. Fetching this data from external APIs on every single user request introduces massive, unnecessary latency and wastes API rate limits.
**Action:** When an endpoint fetches external data that is static across all users and uses a global application key (not a user-specific OAuth token), implement a module-level cache (e.g., `let cache = null; let cacheTime = 0;`) with a reasonable duration (e.g., 5 minutes) to serve the data instantly and reduce network overhead.
## 2026-04-08 - Added Native Lazy Loading to Image Grids
**Learning:** Found an opportunity to improve frontend initial load times in Pug templates containing large image grids (`views/api/index.pug`) by adding the native `loading='lazy'` attribute.
**Action:** Always check loop constructs or large grids of static images in views (especially logos or thumbnails) for missing lazy loading to easily defer below-the-fold asset loading.
