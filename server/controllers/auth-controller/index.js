const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { userName, userEmail, password, role, skillCoinBalance } = req.body; //passed data from the handleregister function index.jsx

  const existingUser = await User.findOne({
    $or: [{ userEmail }],
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User with this  email already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    userName,
    userEmail,
    role,
    password: hashPassword,
    skillCoinBalance,
  });

  await newUser.save();

  return res.status(201).json({
    success: true,
    message: "User registered successfully!",
  });
};

const loginUser = async (req, res) => {
  const { userEmail, password } = req.body;

  const checkUser = await User.findOne({ userEmail });

  if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // Very important step used for verification n sigining of the token to allow access.
  const accessToken = jwt.sign(
    {
      // passign payload for the JWT
      _id: checkUser._id,
      userName: checkUser.userName,
      userEmail: checkUser.userEmail,
      role: checkUser.role,
      skillCoinBalance: checkUser.skillCoinBalance,
    },
    "JWT_SECRET",
    { expiresIn: "120m" }
  );

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: {
      accessToken,
      user: {
        _id: checkUser._id,
        userName: checkUser.userName,
        userEmail: checkUser.userEmail,
        role: checkUser.role,
        skillCoinBalance: checkUser.skillCoinBalance,
      },
    },
  });
};

module.exports = { registerUser, loginUser };
