import mongoose from "mongoose";

const loginModelSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
export const loginModel = mongoose.model("Login", loginModelSchema);
