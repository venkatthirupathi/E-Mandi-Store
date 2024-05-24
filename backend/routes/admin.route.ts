import { Request, Response } from "express";
import { Router } from "express";
import productController from "../controller/product.controller";

export const adminRouter = Router();

adminRouter.get("", productController.getProduct);

adminRouter.get("/add", (req: Request, res: Response) => {
  res.send({ message: "true" });
});

adminRouter.post("/addProduct", productController.productSave);

adminRouter.get("/delete/:id", productController.productDelete);

adminRouter.get("/productEdit/:id", productController.productEditData);

adminRouter.post("/productEdit/:id", productController.productEditSave);

// adminRouter.get("/orders", orderController.getOrders);
