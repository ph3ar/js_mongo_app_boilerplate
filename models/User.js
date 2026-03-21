const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: { type: String, index: true },
  passwordResetExpires: Date,
  emailVerificationToken: String,
  emailVerified: Boolean,

  // ⚡ Bolt: Added sparse unique indexes to OAuth provider IDs to prevent O(N) full collection scans during login
  snapchat: { type: String, unique: true, sparse: true },
  facebook: { type: String, unique: true, sparse: true },
  twitter: { type: String, unique: true, sparse: true },
  google: { type: String, unique: true, sparse: true },
  github: { type: String, unique: true, sparse: true },
  instagram: { type: String, unique: true, sparse: true },
  linkedin: { type: String, unique: true, sparse: true },
  steam: { type: String, unique: true, sparse: true },
  twitch: { type: String, unique: true, sparse: true },
  quickbooks: { type: String, unique: true, sparse: true },
  tokens: Array,

  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  }
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
