import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("user", UserSchema);
export default UserModel;
