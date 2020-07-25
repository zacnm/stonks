const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const ExchangeSchema = new Schema({
  code: { type: String, trim: true },
  currency: { type: String, trim: true },
  name: { type: String, trim: true }
}, { versionKey: false });

module.exports = mongoose.model('Exchange', ExchangeSchema, 'exchanges');
