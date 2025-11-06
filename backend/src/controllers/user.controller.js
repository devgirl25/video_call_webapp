import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Meeting } from "../models/meeting.model.js";

export const register = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(httpStatus.CONFLICT).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, username, password: hashedPassword });

    await newUser.save();
    res.status(httpStatus.CREATED).json({ message: "User Registered Successfully" });
  } catch (e) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Server error: ${e.message}` });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Username and password required" });

    const user = await User.findOne({ username });
    if (!user)
      return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid credentials" });

    const token = crypto.randomBytes(20).toString("hex");
    user.token = token;
    await user.save();

    res.status(httpStatus.OK).json({ token });
  } catch (e) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Server error: ${e.message}` });
  }
};
