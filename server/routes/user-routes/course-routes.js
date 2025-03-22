const express = require("express");

const {
  addNewCourse,
  getAllCourses,
  getCourseDetailsById,
  updateCourseById,
  getAllUserViewCourses,
  getAllUserViewCoursesDetails,
  checkCoursePurchasedInfo,
} = require("../../controllers/user-controller/course-controller");

const router = express.Router();

router.post("/add", addNewCourse);
// router.get("/get", getAllCourses);
router.get("/get/details/:id", getCourseDetailsById);
router.put("/update/:id", updateCourseById);
router.get("/get", getAllUserViewCourses);
router.get("/get/details/:id", getAllUserViewCoursesDetails);
router.get("/purchase-info/:id/:userId", checkCoursePurchasedInfo);

module.exports = router;
