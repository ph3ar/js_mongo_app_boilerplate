
## 2024-05-15 - [Database Existence Check Optimization]
**Learning:** Using `User.findOne(...)` without modifiers fetches the entire Mongoose document and builds an object. When only checking for a document's existence (where the object itself is not returned or manipulated), this introduces unnecessary performance overhead.
**Action:** Use `.select('_id').lean().exec(...)` or `.exists(...)` (when Promise/callback structure allows) for existence checks to avoid full document overhead and bypass Mongoose schema hydration. Be careful NOT to return `.lean()` objects directly to Passport's `done()` callback.
