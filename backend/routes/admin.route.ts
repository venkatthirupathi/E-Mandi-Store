import { Router } from "express";
export const adminRouter = Router();

const productController = require("../controller/product.controller");
// const orderController = require("../controller/orders.controller");

adminRouter.get("", productController.getProduct);

adminRouter.post("/addProduct", productController.productSave);

adminRouter.get("/delete/:id", productController.productDelete);

adminRouter.get("/productEdit/:id", productController.productEditData);

adminRouter.post("/productEdit/:id", productController.productEditSave);

// adminRouter.get("/orders", orderController.getOrders);
