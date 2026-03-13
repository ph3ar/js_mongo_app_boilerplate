
## 2026-03-13 - [Mongoose lean() for Existence Checks]
**Learning:** Using `.lean()` on Mongoose read-only queries bypasses the instantiation of full Mongoose document instances, saving memory overhead and improving performance. However, plain JS objects lose Mongoose virtuals (like `.id`) and Mongoose methods (like `.save()`). Furthermore, do NOT return `.lean()` objects directly to Passport's `done()` callback as it breaks downstream serialization.
**Action:** Only use `.lean()` for pure existence checks where the object isn't returned, modified, or accessed via virtuals/methods.
