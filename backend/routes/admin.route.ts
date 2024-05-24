const express=require('express')
export const  adminRouter=express.Router();
import {Request,Response} from "express";

const productController = require("../controller/product.controller");
// const orderController = require("../controller/orders.controller");

adminRouter.get("", productController.getProduct);
adminRouter.get("/add", (req:Request, res:Response) => {
  res.send({ message: "true" });
});

adminRouter.post("/addProduct", productController.productSave);

adminRouter.get("/delete/:id", productController.productDelete);

adminRouter.get("/productEdit/:id", productController.productEditData);

adminRouter.post("/productEdit/:id", productController.productEditSave);

// adminRouter.get("/orders", orderController.getOrders);
