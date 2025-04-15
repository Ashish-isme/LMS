const express = require("express");

const {
  createTransaction,
  getAllTransaction,
  getRevenueAnalytics,
  getTotalEarnings,
} = require("../../controllers/user-controller/payment-controller");

const router = express.Router();

router.post("/create-transaction", createTransaction);
router.get("/get-all-transaction/:user_id", getAllTransaction);
router.get("/revenue-analytics", getRevenueAnalytics);
router.get("/total-earnings", getTotalEarnings);

module.exports = router;
