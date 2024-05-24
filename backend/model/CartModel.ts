import mongoose from "mongoose";

const cartModelSchema = new mongoose.Schema({
  cartItemID: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
export const cartModel = mongoose.model("Cart", cartModelSchema);
