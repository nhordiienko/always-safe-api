const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  pass: { type: String, required: true },
  age: { type: Number, required: true, min: 5, max: 120, default: 18 },
  placeOfBirth: String,
  curLocation: { type: String, required: true },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
});

module.exports = mongoose.model('User', userSchema);
