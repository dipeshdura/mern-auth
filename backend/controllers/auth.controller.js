import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { asyncHandler, errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
export const signup = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(errorHandler(400, "Invalid credentials"));
  }
  const hashPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });
  await newUser.save();
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
  const { password: hashedPassword, ...rest } = newUser._doc;
  const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  return res
    .cookie("access_token", token, {
     httpOnly: true,
      expires: expiryDate,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    })
    .status(201)
    .json(rest);
});

export const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const validUser = await User.findOne({ email });

  if (!validUser) return next(errorHandler(404, "User doesn't exists"));

  const validPassword = bcrypt.compareSync(password, validUser.password);
  if (!validPassword) return next(errorHandler(401, "Wrong Credentials"));

  const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

  const { password: hashedPassword, ...rest } = validUser._doc;

  const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); //7days
  res
    .cookie("access_token", token, {
      httpOnly: true,
      expires: expiryDate,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    })
    .status(200)
    .json(rest);
 
});

export const google = asyncHandler(async (req, res, next) => {
  const { displayName, email, photoURL } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = user._doc;
    const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); //7days
    res
      .cookie("access_token", token, {
       httpOnly: true,
      expires: expiryDate,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      })
      .status(200)
      .json(rest);
  } else {
    const generatedPassword =
      Math.random().toString().slice(-8) + Math.random().toString(36).slice(-8);
    const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
    const newUser = await User({
      username: displayName,
      email,
      password: hashedPassword,
      profilePicture: photoURL,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const { password: hashPassword, ...rest } = newUser._doc;
    const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); //7days
    res
      .cookie("access_token", token, {
       httpOnly: true,
      expires: expiryDate,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      })
      .status(200)
      .json(rest);
  }
});

export const signout = asyncHandler(async (req, res) => {
  res
    .clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .status(200)
    .json("Signout Success 🙋‍♂️");
});
