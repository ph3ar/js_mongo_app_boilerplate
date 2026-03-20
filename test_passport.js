const email = { $ne: null };
try {
  console.log(email.toLowerCase());
} catch (err) {
  console.log("CRASH:", err.message);
}
