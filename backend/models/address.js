const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
  addressName: String,
  addressLat: Number,
  addressLng: Number
});

module.exports = mongoose.model('Address', addressSchema);
