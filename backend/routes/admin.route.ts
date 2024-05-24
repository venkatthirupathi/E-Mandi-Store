import { Request, Response } from "express";
import { Router } from "express";
import productController from "../controller/product.controller";

export const adminRouter = Router();

import {getOrders } from "../controller/orders.controller"
import {getProduct, productSave, productDelete, productEditData, productEditSave} from "../controller/product.controller"

// const productController = require("../controller/product.controller");
// const orderController = require("../controller/orders.controller");

adminRouter.get("", getProduct);

adminRouter.post("/addProduct", productSave);

adminRouter.get("/delete/:id", productDelete);

adminRouter.get("/productEdit/:id", productEditData);

adminRouter.post("/productEdit/:id", productEditSave);

adminRouter.get("/orders", getOrders);
