const express = require("express");
const transactionController = require("../controller/transactionController");

const router = express.Router();

router
  .route("/")
  .get(transactionController.getTransactions)
  .post(transactionController.addTransaction);

router.route("/:id").delete(transactionController.deleteTransaction);

module.exports = router;
