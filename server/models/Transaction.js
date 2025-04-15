const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  user_id: String,
  transaction_uuid: String,
  total_amount: Number,
  status: String,
  skill_coin: Number,
  date_of_purchase: Date,
});

module.exports = mongoose.model("Transaction", TransactionSchema);
