const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  id: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastname: { type: String },
  firstname: { type: String },
  token: { type: String, unique: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
