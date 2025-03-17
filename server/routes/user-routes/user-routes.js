const express = require("express");

const {
  getUserSkillCoins,
} = require("../../controllers/user-controller/userDetails-contoller");

const router = express.Router();

router.get("/get/userdetails/:id", getUserSkillCoins);

module.exports = router;
