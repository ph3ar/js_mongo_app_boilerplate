const assert = require('assert');
let req = { body: { email: { $ne: null } } };
console.log(req.body.email);
let s = String(req.body.email || '');
console.log("String() gives:", s);
