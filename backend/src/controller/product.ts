import { Request, Response, Router } from "express";
import { ApiError } from "../error";
import { authenticate } from "../middleware/auth";
import { asyncHandler } from "../middleware/error";
import { Product, productModel, validators } from "../model/ProductModel";
import { userModel } from "../model/UserModel";
import { Overwrite, UserRole } from "../types";
import { HttpStatusCode } from "../utils";

export const productRouter = Router();

export interface ProductResponse {
  product: Overwrite<Product, { _id: string; ownerId: string }>;
}

/* Create a product */
productRouter.post(
  "/",
  authenticate(UserRole.seller),
  asyncHandler(async (req: Request, res: Response<ProductResponse>) => {
    const product = validators.createProduct.validateSync(req.body);
    const createdProduct = await productModel.create({
      ...product,
      ownerId: res.locals.user._id,
    });
    await userModel.findByIdAndUpdate(res.locals.user._id, {
      $push: {
        productsCreated: createdProduct._id,
      },
    });
    return res
      .status(HttpStatusCode.Created)
      .json({ product: createdProduct.toObject() });
  })
);

/* Read all products */
productRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await productModel.find();
    res.status(HttpStatusCode.Ok).json({ products });
  })
);

/* Read a product */
productRouter.get(
  "/:productId",
  asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const product = await productModel.findById(productId);
    if (!product) {
      throw new ApiError(HttpStatusCode.NotFound, "Product not found");
    }
    res.status(HttpStatusCode.Ok).json({ product: product.toObject() });
  })
);

/* Update a product */
productRouter.patch(
  "/:productId",
  authenticate(UserRole.seller),
  asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { user } = res.locals;
    const patch = validators.patchProduct.validateSync(req.body);
    const product = await productModel.findById(productId);
    if (!product) {
      throw new ApiError(HttpStatusCode.NotFound, "Product not found");
    }
    if (!product.ownerId.equals(user._id)) {
      throw new ApiError(HttpStatusCode.Unauthorized, "Unauthorized");
    }
    product.set(patch);
    await product.save();
    return res.status(HttpStatusCode.Ok).json({ product: product.toObject() });
  })
);

/* Delete a product */
productRouter.delete(
  "/:productId",
  authenticate(UserRole.seller),
  asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { user } = res.locals;
    const product = await productModel.findById(productId);
    if (!product) {
      throw new ApiError(HttpStatusCode.NotFound, "Product not found");
    }
    if (!product.ownerId.equals(user._id)) {
      throw new ApiError(HttpStatusCode.Unauthorized, "Unauthorized");
    }
    await product.deleteOne();
    return res.status(HttpStatusCode.Ok).json({ message: "Product deleted" });
  })
);

/* Search products */
productRouter.post(
  "/search",
  asyncHandler(async (req, res) => {
    const body = validators.searchProduct.validateSync(req.body);
    const searchQuery = body.q;
    const products = await productModel
      .find({ $text: { $search: searchQuery } })
      .exec();

    res.json({ products });
  })
);
