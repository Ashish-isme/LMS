const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
  title: String,
  videoUrl: String, //not being saved
  public_id: String,
  freePreview: Boolean,
});

const CourseSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  date: Date,
  title: String,
  category: String,
  level: String,
  primarylanguage: String, // not being saved
  subtitle: String,
  description: String,
  image: String,
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

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
  },
});

module.exports = mongoose.model("Course", CourseSchema);
