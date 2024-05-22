import { Router } from "express";
export const adminRouter = Router();

const productController = require("../controller/product.controller");

adminRouter.get("/admin", productController.getProduct);

adminRouter.post("/admin/addProduct", (req, res) => {
  try {
  } catch (error) {}
});

adminRouter.get("/admin/delete/:id", (req, res) => {
  try {
  } catch (error) {}
});

adminRouter.get("/admin/productEdit/:id", (req, res) => {
  try {
  } catch (error) {}
});

adminRouter.post("/admin/productEdit/:id", (req, res) => {
  try {
  } catch (error) {}
});

adminRouter.get("/admin/orders", (req, res) => {
  try {
  } catch (error) {}
});
