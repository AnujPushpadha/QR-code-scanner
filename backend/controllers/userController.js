import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../model/userModel.js";

const registerUser = asyncHandler(async (req, res) => {
  //   console.log(req.body);
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  // Hash password
  // const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({ status: "success", user });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Email not found");
  }
  //   console.log(user);
  // Compare password with hashed password
  if (user && (await user.verifyPassword(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "60m" }
    );
    res.status(200).json({ user, accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

export { registerUser, loginUser, currentUser };
