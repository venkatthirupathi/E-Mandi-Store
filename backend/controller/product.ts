import { Router } from "express";
import { ApiError } from "../error";
import { authenticate } from "../middleware/auth";
import { productModel, validators } from "../model/ProductModel";
import { UserRole, userModel } from "../model/UserModel";

export const productRouter = Router();

/* Create a product */
productRouter.post("/", authenticate(UserRole.user), async (req, res) => {
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
  return res.json({ product: createdProduct });
});

/* Read all products */
productRouter.get("/", authenticate(UserRole.user), async (req, res) => {
  const products = await productModel.find();
  res.json({ products });
});

/* Read a product */
productRouter.get(
  "/:productId",
  authenticate(UserRole.user),
  async (req, res) => {
    const { productId } = req.params;
    const product = await productModel.findById(productId);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    res.json({ product: product.toObject() });
  }
);

/* Update a product */
productRouter.patch(
  "/:productId",
  authenticate(UserRole.user),
  async (req, res) => {
    const { productId } = req.params;
    const { user } = res.locals;
    const patch = validators.patchProduct.validateSync(req.body);
    const product = await productModel.findById(productId);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    if (!product.ownerId.equals(user._id)) {
      throw new ApiError(401, "Unauthorized");
    }
    product.set(patch);
    await product.save();
    return res.json({ product: product.toObject() });
  }
);

/* Delete a product */
productRouter.delete(
  "/:productId",
  authenticate(UserRole.user),
  async (req, res) => {
    const { productId } = req.params;
    const { user } = res.locals;
    const product = await productModel.findById(productId);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    if (!product.ownerId.equals(user._id)) {
      throw new ApiError(401, "Unauthorized");
    }
    await product.deleteOne();
    return res.json({ message: "Product deleted" });
  }
);
