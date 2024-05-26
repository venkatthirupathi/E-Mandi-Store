import { Router } from "express";
import { getOrders } from "../controller/orders.controller";
import {
  getProduct,
  productDelete,
  productEditData,
  productEditSave,
  productSave,
} from "../controller/product.controller";

export const adminRouter = Router();

adminRouter.get("", getProduct);

adminRouter.post("/addProduct", productSave);

adminRouter.get("/delete/:id", productDelete);

adminRouter.get("/productEdit/:id", productEditData);

adminRouter.post("/productEdit/:id", productEditSave);

adminRouter.get("/orders", getOrders);
