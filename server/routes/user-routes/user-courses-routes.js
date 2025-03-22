const express = require("express");

const {
  getCoursesByUserId,
} = require("../../controllers/user-controller/user-courses-controller");

const router = express.Router();

router.get("/get/:userId", getCoursesByUserId);

module.exports = router;
