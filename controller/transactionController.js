const uuid = require("uuid");

const Transaction = require("../model/transactionModel");
// @desc GET all transactions
// @route GET /api/v1/transaction

exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc Add transaction
// @route POST /api/v1/transaction

exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;

    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
};

// @desc Delete  transaction
// @route DELETE /api/v1/transaction/:id

exports.deleteTransaction = async (req, res, next) => {
  try {
    const id = req.params.id;
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      res.status(404).json({
        success: false,
        error: "No Transaction found",
      });
    }

    await transaction.remove();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
