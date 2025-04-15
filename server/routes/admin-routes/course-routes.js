const express = require("express");

const {
  getAllCourses,
} = require("../../controllers/admin-controller/course-controller");

const router = express.Router();

router.get("/getCourses", getAllCourses);

module.exports = router;
