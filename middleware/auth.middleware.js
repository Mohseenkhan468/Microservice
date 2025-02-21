import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import mongoose from 'mongoose'
async function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }
    const token = header?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }
    const decode = await jwt.verify(
      token,
      process.env.JWT_SECRET || "thisissecretkey"
    );
    const user = await UserModel.findOne({
      _id: new mongoose.Types.ObjectId(decode._id),
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized.",
    });
  }
}
export default authMiddleware;
