const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cryptodataSchema = new Schema({
  useremail: { type: String, required: true, unique: true }, // Assuming user email is unique
  btc: { type: Number, default: 0 },
  ethereum: { type: Number, default: 0 },
  ripple: { type: Number, default: 0 },
  litecoin: { type: Number, default: 0 },
  bitcoinDash: { type: Number, default: 0 },
});

module.exports = mongoose.model('CryptoData', cryptodataSchema);
