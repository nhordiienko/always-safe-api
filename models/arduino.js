const mongoose = require('mongoose');

const arduinoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  latitude: Number,
  longitude: Number,
  temperature: Number,
  humidity: Number,
  pressure: Number,
  O2content: Number,
  CO2content: Number,
  infrasound: Number
});

module.exports = mongoose.model('Arduino', arduinoSchema);
