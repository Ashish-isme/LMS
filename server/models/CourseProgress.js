const mongoose = require("mongoose");

const lectureProgressSchema = new mongoose.Schema({
  lectureId: String,
  viewedId: Boolean,
  dataViewed: Date,
});

const CourseProgressSchema = new mongoose.Schema({
  userId: String,
  courseId: String,
  completed: Boolean,
  completionDate: Date,
  lecturesProgress: [lectureProgressSchema],
});

module.exports = mongoose.model("Progress", CourseProgressSchema);
