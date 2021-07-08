const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Please add some text"],
  },
  amount: {
    type: Number,
    required: [true, "Please add a positive or negative number"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transactions", transactionSchema);
