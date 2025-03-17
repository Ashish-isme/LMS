const express = require("express");

const {
  purchaseCourse,
} = require("../../controllers/user-controller/user-courses-controller");

const router = express.Router();

router.post("/purchase-course", purchaseCourse);

module.exports = router;
