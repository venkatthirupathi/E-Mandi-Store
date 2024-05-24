import { Request, Response } from "express";
const productModel = require("../model/ProductModel");

interface List<T> {
  data: T[];
}

export const getProduct = async (req: Request, res: Response) => {
  try {
    // return await productModel.find();
    const products = await productModel.find();
    res.status(200).json(products);
  } catch {
    res.status(500).json({ message: "Server falied" });
    // return Promise.reject(new Error("Failed to fetch products"));
  }
};

export const getHomeProduct = async (req: Request, res: Response) => {
  try {
    // return await productModel.find().limit(10);
    const products = await productModel.find().limit(10);
    res.status(200).send(products);
  } catch {
    res.status(500).json({ message: "Server falied" });
    // return Promise.reject(new Error("Failed to fetch products"));
  }
};

export const productEditData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      // return Promise.reject(new Error("Failed to fetch product"));
    }
    // return product;
    res.status(500).send(product);
  } catch (error) {
    res.status(500).json({ message: "Server falied" });
    // return Promise.reject(new Error("Failed to fetch product"));
  }
};

export const productEditSave = async (req: Request, res: Response) => {
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

export const productSave = async (req: Request, res: Response) => {
  try {
    const { productId, imageUrl, productName, price, description, quantity } =
      req.body;

    // const existingProd = await productModel.findOne({ productId });
    // if (existingProd) {
    //   res.status(400).json({ message: "Product already exists" });
    //   return false;
    // }

    const product = await productModel.create({
      productId: productId,
      imageUrl: imageUrl,
      productName: productName,
      price: price,
      description: description,
      quantity: quantity,
    });

    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    // res.status(500).json({ message: "Server failed" });
    if (error instanceof Error) {
      console.error("Error saving product:", error.message); // Log the actual error for debugging
      res.status(500).json({ message: "Server failed", error: error.message });
    } else {
      console.error("Unexpected error:", error);
      res
        .status(500)
        .json({ message: "Server failed", error: "Unexpected error occurred" });
    }
  }
};

export const productDelete = async (req: Request, res: Response) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await productModel.deleteOne({ _id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: "Server failed" });
  }
};
