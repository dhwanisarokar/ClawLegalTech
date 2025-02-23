const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const catchAsync = require("../utils/catchAsync");

const register = catchAsync(async (req, res) => {
  const { username, password, role = "Employee", email } = req.body;
  if (await User.findOne({ username }))
    return res.status(400).json({ message: "User already exists" });

  await User.create({ username, password, role, email });
  res.status(201).json({ message: "User registered successfully" });
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.status(200).json({ token, user: {username: user.username, role: user.role} });
});

module.exports = { register, login };
