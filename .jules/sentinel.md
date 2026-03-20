## 2024-03-01 - Missing Sanitization in Rendered Output
**Vulnerability:** XSS vulnerability through unsanitized API responses and scraped data (`artist.bio` and scraped links rendered via Pug's `!=` operator).
**Learning:** External API data and scraped content must always be treated as untrusted, especially when rendered using raw HTML tags (`!=` in Pug).
**Prevention:** Use established libraries like `sanitize-html` to sanitize third-party content before passing it to the view, or render as plain text if HTML tags aren't required.
