import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return req.status(400).json({ message: "All fields are Required" });
    }

    if (password.length < 6) {
      return req
        .status(400)
        .json({ message: "Password is at least 6 characters" });
    }

    // check if emails valid :regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.text(email)) {
      return req.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    // hash the password ex = ("12343" => (!@34wu4ou3w))
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      //   generateToken(newUser._id, res);
      //   await newUser.save();

      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);
      res.staus(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullName,
          ENV.CLIENT_URL,
        );
      } catch (error) {
        console.log("Failed to send welcome email: ", error);
      }
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller:", error);
    res.status(500).json({ messge: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { emai, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  try {
    const user = await User.findOne({ email });

    // check if user exists
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, User.password);

    // check for correct password
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller : ", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const logout = async (__, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  req.status(200).json({ message: "Logged out successfully.." });
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;

    if (!profilePic)
      return res.status(400).json({ message: "Profile pic is required" });

    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true },
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updating profile :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
