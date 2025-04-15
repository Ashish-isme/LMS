const Transaction = require("../../models/Transaction");
const User = require("../../models/User");
const Course = require("../../models/UserCourses");

const createTransaction = async (req, res) => {
  console.log("Creating transaction with body:", req.body);
  try {
    const { transaction_uuid, total_amount, status, user_id, skill_coin } =
      req.body;

    // Validate required fields
    if (
      !transaction_uuid ||
      !total_amount ||
      !status ||
      !user_id ||
      !skill_coin
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const newTransaction = new Transaction({
      user_id,
      transaction_uuid,
      total_amount,
      status,
      skill_coin,
      date_of_purchase: new Date(),
    });

    const savedTransaction = await newTransaction.save();

    // for updating user skill coins after purchase this is used
    if (status === "SUCCESS") {
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const currentSkillCoins = user.skillCoinBalance || 0;
      const updatedSkillCoins = currentSkillCoins + parseInt(skill_coin);

      await User.findByIdAndUpdate(
        user_id,
        { skillCoinBalance: updatedSkillCoins },
        { new: true }
      );
    }

    res.status(201).json({
      success: true,
      data: {
        transaction: savedTransaction,
        updatedSkillCoinBalance: User.skillCoinBalance,
      },
      message: "Transaction created successfully",
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllTransaction = async (req, res) => {
  // console.log("Api hit for getting all the transaction");
  try {
    const { user_id } = req.params;
    const { startDate, endDate } = req.query;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // This ensures that the transaction belong to the specific suer
    let query = { user_id };

    // Add date filtering if dates are provided
    if (startDate || endDate) {
      query.date_of_purchase = {};
      if (startDate) query.date_of_purchase.$gte = new Date(startDate);
      if (endDate) query.date_of_purchase.$lte = new Date(endDate);
    }

    const transactions = await Transaction.find(query).sort({
      date_of_purchase: -1,
    });

    res.status(200).json({
      success: true,
      data: transactions,
      message: "Transactions fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// controller for admin to get all the transaction

const getRevenueAnalytics = async (req, res) => {
  try {
    const revenueData = await Transaction.aggregate([
      {
        $match: {
          status: "SUCCESS",
        },
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: { format: "%Y-%m-%d", date: "$date_of_purchase" },
            },
          },
          revenue: { $sum: "$total_amount" },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id.date",
          revenue: 1,
        },
      },
      { $sort: { date: 1 } },
    ]);

    res.status(200).json(revenueData);
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    res.status(500).json({ message: "Error fetching revenue data" });
  }
};

const getTotalEarnings = async (req, res) => {
  try {
    const totalEarnings = await Transaction.aggregate([
      // accts like a WHERE cluase in SQL . spearate data grouping for fitlering, sorting and aggregration fucntions
      {
        $match: {
          status: "SUCCESS",
        },
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$total_amount" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: totalEarnings[0]?.totalEarnings || 0,
    });
  } catch (error) {
    console.error("Error fetching total earnings:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createTransaction,
  getAllTransaction,
  getRevenueAnalytics,
  getTotalEarnings,
};
