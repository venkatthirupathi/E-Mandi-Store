import { Request, Response } from "express";
const productModel = require("../model/ProductModel");

interface List<T> {
  data: T[];
}

export const getProduct = async (
  req: Request,
  res: Response,
): Promise<List<typeof productModel>> => {
  try {
    return await productModel.find();
  } catch {
    res.status(500).json({ message: "Server falied" });
    return Promise.reject(new Error("Failed to fetch products"));
  }
};

export const getHomeProduct = async (
  req: Request,
  res: Response,
): Promise<List<typeof productModel>> => {
  try {
    return await productModel.find().limit(10);
  } catch {
    res.status(500).json({ message: "Server falied" });
    return Promise.reject(new Error("Failed to fetch products"));
  }
};

export const productEditData = async (
  req: Request,
  res: Response,
): Promise<typeof productModel> => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return Promise.reject(new Error("Failed to fetch product"));
    }
    return product;
  } catch (error) {
    res.status(500).json({ message: "Server falied" });
    return Promise.reject(new Error("Failed to fetch product"));
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server failed" });
  }
};
