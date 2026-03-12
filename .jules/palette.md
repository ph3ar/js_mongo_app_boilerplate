## 2026-03-12 - Form Label Copy-Paste Errors
**Learning:** Found an accessibility issue pattern where copy-pasted form groups retain the `for` attribute of the original field (e.g., Website label pointing to `steamid`). Also, custom radio buttons in Bootstrap 4 require explicit `id` and `for` mapping which was missing.
**Action:** Always verify `for` attributes match their corresponding `input` `id`s when adding new fields, and ensure custom radio/checkbox inputs use explicit IDs.
