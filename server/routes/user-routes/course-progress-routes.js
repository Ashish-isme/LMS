const express = require("express");
const {
  getCurrentCourseProgress,
} = require("../../controllers/user-controller/course-progress-controller");

const router = express.Router();

router.get("/get/:userId/:courseId", getCurrentCourseProgress);

module.exports = router;
