const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
  name: String,
  location: {
    type: { type: String },
    coordinates: Array
  },
  label: String,
  postalCode: Number
});

module.exports = mongoose.model('Address', addressSchema);
