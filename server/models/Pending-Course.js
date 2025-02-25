const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
  title: String,
  video: String,
  public_id: String,
  freePreview: Boolean,
});

const CourseSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  date: Date,
  title: String,
  category: String,
  label: String,
  primarylanguage: String,
  subtitle: String,
  description: String,
  Image: String,
  welcomeMessage: String,
  pricing: Number,
  objectives: String,
  students: [
    {
      studentId: String,
      studentName: String,
      studentEmail: String,
    },
  ],
  curriculum: [LectureSchema],
  isPublished: Boolean,
});

module.exports = mongoose.models("Course", CourseSchema);
