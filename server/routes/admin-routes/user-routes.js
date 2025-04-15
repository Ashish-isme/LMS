const express = require("express");

const {
  getAllUsers,
} = require("../../controllers/admin-controller/user-controller");

const router = express.Router();

router.get("/getUsers", getAllUsers);

module.exports = router;
