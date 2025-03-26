const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  oauthProvider: String,
  oauthId: String,
  email: String,
});

module.exports = mongoose.model('User', UserSchema);