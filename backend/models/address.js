const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
  siren: String,
  siret: String,
  name: String,
  location: {
    type: { type: String },
    coordinates: Array
  },
  label: String,
  postalCode: Number,
  associatedKey: Number,
  qrCode: String,
  points: String
});

addressSchema.index({ location: "2dsphere" });
module.exports = mongoose.model('Address', addressSchema);
