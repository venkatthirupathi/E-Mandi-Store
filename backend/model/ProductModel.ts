import mongoose from "mongoose";

const productModelSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    // unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});
export const productModel = mongoose.model("Product", productModelSchema);