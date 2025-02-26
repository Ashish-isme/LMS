require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes/index");
const mediaRoutes = require("./routes/user-routes/media-routes");
const userCourseRoutes = require("./routes/user-routes/course-routes");

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

// For database connectivity (Gives for a Promise)
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB Database Connected"))
  .catch((e) => console.log(e));

//Routes Configuration
app.use("/auth", authRoutes);
app.use("/media", mediaRoutes);
app.use("/user/course", userCourseRoutes);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    sucess: false,
    message: "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT} `);
});
