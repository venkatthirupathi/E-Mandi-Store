import mongoose from "mongoose";

export interface Product {
  productId: string;
  imageUrl: string;
  productName: string;
  price: number;
  description: string;
  quantity: number;
}

const productModelSchema = new mongoose.Schema<Product>({
  productId: {
    type: String,
    required: true,
    unique: true,
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
export const productModel = mongoose.model<Product>(
  "Product",
  productModelSchema,
);
