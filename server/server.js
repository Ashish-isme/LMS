require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes/index");
const mediaRoutes = require("./routes/user-routes/media-routes");
const userViewCourseRoutes = require("./routes/user-routes/course-routes");
const userCourseRoutes = require("./routes/user-routes/user-courses-routes");
const userPurchaseCourseRoutes = require("./routes/user-routes/purchase-course");
const userCourseProgressRoutes = require("./routes/user-routes/course-progress-routes");
const adminUserRoutes = require("./routes/admin-routes/user-routes");
const userTransactionRoutes = require("./routes/user-routes/payment-routes");
const paymentController = require("./controllers/user-controller/payment-controller");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// For database connectivity
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB Database Connected"))
  .catch((e) => console.log(e));

// Routes Configuration
app.use("/auth", authRoutes);
app.use("/media", mediaRoutes);
app.use("/user/course", userViewCourseRoutes);
app.use("/user/courses-bought", userCourseRoutes);
app.use("/user/purchase", userPurchaseCourseRoutes);
app.use("/user/course-progress", userCourseProgressRoutes);
app.use("/admin/get-users", adminUserRoutes);
app.use("/user/payment-success", userTransactionRoutes);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
