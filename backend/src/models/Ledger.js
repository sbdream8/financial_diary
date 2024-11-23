const mongoose = require('mongoose');

const ledgerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  category: String,
  amount: Number,
  description: String,
});

module.exports = mongoose.model('Ledger', ledgerSchema);
