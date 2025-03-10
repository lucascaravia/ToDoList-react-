import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userFound = await User.findOne({ email });
    if (userFound)
      return res.status(400).json({ message: ["The email is already in use"] });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: passwordHash });
    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id, username: userSaved.username });

    res.json({ token, user: { id: userSaved._id, username: userSaved.username, email: userSaved.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).json({ message: ["The email does not exist"] });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: ["The password is incorrect"] });

    const token = await createAccessToken({ id: userFound._id, username: userFound.username });

    res.json({ token, user: { id: userFound._id, username: userFound.username, email: userFound.email } });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.sendStatus(401);

      const userFound = await User.findById(user.id);
      if (!userFound) return res.sendStatus(401);

      return res.json({ id: userFound._id, username: userFound.username, email: userFound.email });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  return res.json({ message: "Logout successful" });
};