const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true},
  pass: { type: String, required: true}
});

module.exports = mongoose.model('Admin', adminSchema);
