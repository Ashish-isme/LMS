const UserCourses = require("../../models/UserCourses");
const User = require("../../models/User");

const getCoursesByUserId = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

const purchaseCourse = async (req, res) => {
  console.log("Purchase API HIT");
  try {
    const {
      userId,
      courseId,
      title,
      creatorId,
      creatorName,
      dateofPurchase,
      courseImage,
      coursePricing,
    } = req.body;

    console.log(req.body);

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const userBalance = user.skillCoinBalance;
    const coursePricingNumber = coursePricing;

    console.log("User Balance:", userBalance);
    console.log("Course Pricing:", coursePricingNumber);

    if (userBalance < coursePricingNumber) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient skill coin balance." });
    }

    const existingUserCourses = await UserCourses.findOne({ userId });

    if (existingUserCourses) {
      const alreadyPurchased = existingUserCourses.courses.some(
        (course) => course.courseId === courseId
      );

      if (alreadyPurchased) {
        return res
          .status(400)
          .json({ success: false, message: "Course already purchased." });
      }

      // Add the new course to the user's courses
      existingUserCourses.courses.push({
        courseId,
        title,
        creatorId,
        creatorName,
        dateofPurchase: new Date(dateofPurchase),
        courseImage,
      });

      // Deduct the balance only after confirming the course is not already purchased
      user.skillCoinBalance = userBalance - coursePricingNumber;
      console.log("Updated User Balance:", user.skillCoinBalance);

      // Save both the updated user balance and the user's courses
      await existingUserCourses.save();
      await user.save();
    } else {
      // If the user has no courses yet, create a new entry
      const newUserCourse = new UserCourses({
        userId,
        courses: [
          {
            courseId,
            title,
            creatorId,
            creatorName,
            dateofPurchase: new Date(dateofPurchase),
            courseImage,
          },
        ],
      });

      // Deduct the balance only after confirming the course is not already purchased
      user.skillCoinBalance = userBalance - coursePricingNumber;
      console.log("Updated User Balance:", user.skillCoinBalance);

      // Save both the new user courses and the updated user balance
      await newUserCourse.save();
      await user.save();
    }

    return res.status(201).json({
      success: true,
      message: "Course purchased successfully!",
      updatedBalance: user.skillCoinBalance,
    });
  } catch (error) {
    console.error("Error processing course purchase:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = {
  purchaseCourse,
};
