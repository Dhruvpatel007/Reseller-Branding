const mongoose = require('mongoose');

const SecurityDataSchema = new mongoose.Schema({
  type: String,
  data: Object,
});

module.exports = mongoose.model('SecurityData', SecurityDataSchema);
