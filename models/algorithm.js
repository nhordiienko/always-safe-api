const mongoose = require('mongoose');

const algorithmSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: String,
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
});

module.exports = mongoose.model('Algorithm', algorithmSchema);
