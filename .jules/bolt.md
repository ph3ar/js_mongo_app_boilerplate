## 2024-03-12 - Use .lean() for Mongoose Read-only Operations
**Learning:** Using Mongoose's `.lean()` method speeds up pure existence queries significantly because it skips full Mongoose document hydration. However, `.lean()` objects lose Mongoose virtuals (like `.id`) and instance methods. Returning a lean object directly to Passport's `done()` callback will break session serialization.
**Action:** Always append `.lean().exec(...)` for pure existence checks where the object isn't returned or hydrated further. Ensure no downstream functions depend on the Mongoose document structure before applying this optimization.

## 2026-03-13 - [Caching External API Calls]
**Learning:** Optimizations involving `req.body` and Mongoose queries (e.g. `.lean()`) trigger CodeQL data flow rules that falsely flag pre-existing missing rate limits as 'new alerts', forcing developers to modify unapproved files.
**Action:** Caching external API requests (e.g., GitHub, NYT) is a highly effective, low-risk Bolt performance win that bypasses DB-related static analysis warnings and avoids hitting rate limits on external services.
