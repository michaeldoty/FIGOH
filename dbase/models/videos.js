const mongoose = require('mongoose');

const videosSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  path: String
});

module.exports = mongoose.model('Videos', videosSchema);
