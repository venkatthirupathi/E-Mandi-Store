import mongoose from "mongoose";

export interface User {
  email: string;
  password: string;
  username: string;
  mobileNumber: string;
  active: boolean;
  role: string;
}

const userModelSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  // cart: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "Cart",
  // },
  // orderList: {
  //   type: [mongoose.Types.ObjectId],
  //   ref: "Order",
  // },
});
export const userModel = mongoose.model<User>("User", userModelSchema);
