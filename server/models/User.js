const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  accessToken: { type: String },
  refreshToken: { type: String },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
