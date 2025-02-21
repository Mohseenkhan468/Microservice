import Joi from "joi";
import * as bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
class AuthController {
  static async register(req, res) {
    try {
      const payload = req.body;
      const schema = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        password: Joi.string().required(),
      });
      const { error } = schema.validate(payload, { abortEarly: false });
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }
      const alreadyRegistered = await UserModel.findOne({
        email: payload.email,
      });
      if (alreadyRegistered) {
        return res.status(400).json({
          success: false,
          message: "This email is already registered.",
        });
      }
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      const newUser = await new UserModel({
        ...payload,
        password: hashedPassword,
      }).save();
      return res.status(201).json({
        success: true,
        message: "User created successfully.",
        data: newUser,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  static async login(req, res) {
    try {
      const payload = req.body;
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      });
      const { error } = schema.validate(payload, { abortEarly: false });
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }
      const user = await UserModel.findOne({ email: payload.email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email provided.",
        });
      }
      const isMatch = await bcrypt.compare(payload.password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials.",
        });
      }
      const tokenPayload = { _id: user._id, role: "user" };
      const token = await jwt.sign(
        tokenPayload,
        process.env.JWT_SECRET || "thisissecretkey",
        { expiresIn: "1h" }
      );
      return res.status(201).json({
        success: true,
        message: "Login successfully",
        token,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  static async getProfile(req, res) {
    try {
      const { user } = req;
      return res.status(200).json({
        success: true,
        user,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}
export default AuthController;
