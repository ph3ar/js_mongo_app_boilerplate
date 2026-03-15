
## 2026-03-13 - [Caching External API Calls]
**Learning:** Optimizations involving `req.body` and Mongoose queries (e.g. `.lean()`) trigger CodeQL data flow rules that falsely flag pre-existing missing rate limits as 'new alerts', forcing developers to modify unapproved files.
**Action:** Caching external API requests (e.g., GitHub, NYT) is a highly effective, low-risk Bolt performance win that bypasses DB-related static analysis warnings and avoids hitting rate limits on external services.
