## 2024-05-18 - [HIGH] Fix NoSQL injection in Mongoose queries
**Vulnerability:** User-controlled input (like `req.body.email`) was directly passed into Mongoose query objects (`User.findOne({ email: req.body.email })`).
**Learning:** This pattern is susceptible to NoSQL injection if an attacker sends an object with MongoDB query operators (e.g., `{"email": {"$gt": ""}}`) instead of a simple string, potentially bypassing authentication or uniqueness checks. CodeQL flags this as a critical vulnerability. Additionally, passing an object to functions like `toLowerCase()` on user input without type checking throws unhandled `TypeError` exceptions, leading to potential DoS.
**Prevention:** Always explicitly cast user-provided input to the expected primitive type (e.g., `String(req.body.email)`) before using it in Mongoose queries or invoking string methods on it.
## 2024-03-01 - Missing Sanitization in Rendered Output
**Vulnerability:** XSS vulnerability through unsanitized API responses and scraped data (`artist.bio` and scraped links rendered via Pug's `!=` operator).
**Learning:** External API data and scraped content must always be treated as untrusted, especially when rendered using raw HTML tags (`!=` in Pug).
**Prevention:** Use established libraries like `sanitize-html` to sanitize third-party content before passing it to the view, or render as plain text if HTML tags aren't required.
## 2024-05-23 - Open Redirect Vulnerability in session returnTo
**Vulnerability:** The application used `req.originalUrl` to set `req.session.returnTo` directly without validation. An attacker could specify a protocol-relative URL (e.g., `//malicious.com`) which would lead to an open redirect when the application redirects to this value upon successful login.
**Learning:** `req.originalUrl` can be controlled by user input and may contain protocol-relative paths that bypass basic open redirect protections if not explicitly checked against starting with `//`.
**Prevention:** Sanitize the session redirect variable by checking if the URL string begins with a single forward slash and not a double forward slash (e.g., `returnTo.match(/^\/[^\/]/)` or equals `/`) before trusting it as a relative redirect URL.
## 2023-10-27 - DoS and NoSQL Injection via Object Payloads in Validator
**Vulnerability:** Attackers could send objects instead of strings in `req.body` parameters (e.g. `req.body.email = { $ne: null }`). This caused the `validator` library functions (like `validator.isEmail()`) to crash the application with unhandled `TypeError: Expected string but received Object`, leading to Denial of Service (DoS). Additionally, such object payloads could potentially act as NoSQL injection vectors in downstream Mongoose queries if not explicitly cast.
**Learning:** Legacy Node.js Express applications passing unvalidated `req.body` directly to `validator` and Mongoose queries are highly susceptible to DoS and NoSQL injection when `body-parser` extends `urlencoded` or `json` payloads to accept nested objects.
**Prevention:** Always explicitly typecast user-provided request inputs to primitives (e.g., using `String()`) before passing them to string validation functions or database queries to ensure robust handling of unexpected data types.
## 2026-03-07 - Open Redirect via req.session.returnTo
**Vulnerability:** The application was vulnerable to Open Redirect. The Express middleware in `app.js` naively assigned `req.originalUrl` to `req.session.returnTo`. An attacker could supply a URL like `//evil.com` or `/\evil.com`, which Express would accept. After login, `res.redirect(req.session.returnTo)` would redirect the user to the attacker's domain using a protocol-relative redirect.
**Learning:** `req.originalUrl` should never be implicitly trusted as a local path for redirection, even if it is the requested path, because Express parses protocol-relative paths (`//domain.com`) which browsers follow externally.
**Prevention:** Always validate `returnTo` URLs before storing them or redirecting. Use a strict regex like `/^\/[^\/\\]/` to ensure the path starts with exactly one forward slash and no backslashes, defaulting to `/` if invalid.
## 2024-05-18 - Fix NoSQL injection vulnerability
**Vulnerability:** Unsanitized user inputs (req.body) are used directly in Mongoose queries and string validation functions without type coercion.
**Learning:** Bypassing string coercion allows attackers to submit objects like `{"$ne": null}` as request parameters. When passed to Mongoose `findOne()`, this results in NoSQL injection, potentially allowing authentication bypass. If passed to `validator` functions, it can crash the Node.js application.
**Prevention:** Always explicitly cast user input to a string, e.g., `String(req.body.email)`, before passing to queries or validators to ensure the application only processes primitive types.
## 2024-03-17 - Rate limiting on Password Reset
**Vulnerability:** Missing rate limit on `/forgot` endpoint allowing potential DoS and email flooding.
**Learning:** Legacy endpoints sending emails or SMS must be explicitly protected by rate limiters to prevent abuse.
**Prevention:** Always apply `express-rate-limit` (or similar) to any route that triggers external side-effects like email delivery.
## 2026-03-22 - [HIGH] Open Redirect Bypass via Backslash in session returnTo
**Vulnerability:** The application attempted to prevent open redirects by verifying that `req.session.returnTo` matched `/^\/[^\/]/`. However, an attacker could supply a path like `/\evil.com`, which Express and browsers treat as `//evil.com`, leading to an open redirect.
**Learning:** Checking that a URL path starts with a single slash and is not followed by another forward slash is insufficient protection for open redirects. Backslashes (`\`) can act similarly to forward slashes in URL parsing contexts, allowing for protocol-relative bypasses.
**Prevention:** Update regex validation for absolute local paths to also reject backslashes. For example, use `/^\/[^\/\\]/` to enforce that the path begins strictly with `/` followed by any character except `/` or `\`.
## 2024-05-28 - [CRITICAL] Fix Arbitrary Field Deletion in OAuth unlink
**Vulnerability:** The application was vulnerable to Arbitrary Field Deletion and potentially Insecure Direct Object Reference (IDOR). In the `getOauthUnlink` route in `controllers/user.js`, user-controlled input `req.params.provider` was used to dynamically access and delete properties on the mongoose user object using bracket notation (`user[provider.toLowerCase()] = undefined`). An attacker could supply an arbitrary provider name (e.g., `tokens` or `password`), leading to unexpected data deletion or corruption of the user document.
**Learning:** Dynamically modifying object properties based on user input without strict validation is highly dangerous. It allows attackers to manipulate the application's internal state and data structure.
**Prevention:** Always validate user-provided input that corresponds to object keys or fields against an allowed list of values (e.g., a whitelist of valid OAuth providers) before using it to dynamically access or modify properties.
