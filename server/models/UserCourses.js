const mongoose = require("mongoose");

const UserCoursesSchema = new mongoose.Schema({
  userId: String,
  courses: [
    {
      courseId: String,
      title: String,
      userId: String,
      userName: String,
      dateofPurchase: Date,
      courseImage: String,
    },
  ],
});

module.exports = mongoose.model("UserCourses", UserCoursesSchema);
