## 2024-05-18 - Fix NoSQL injection vulnerability
**Vulnerability:** Unsanitized user inputs (req.body) are used directly in Mongoose queries and string validation functions without type coercion.
**Learning:** Bypassing string coercion allows attackers to submit objects like `{"$ne": null}` as request parameters. When passed to Mongoose `findOne()`, this results in NoSQL injection, potentially allowing authentication bypass. If passed to `validator` functions, it can crash the Node.js application.
**Prevention:** Always explicitly cast user input to a string, e.g., `String(req.body.email)`, before passing to queries or validators to ensure the application only processes primitive types.
