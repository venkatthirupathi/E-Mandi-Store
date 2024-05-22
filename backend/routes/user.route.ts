import { Router } from "express";
export const userRoutes = Router();

const signupController = require("../controller/user.signup.controller");
const loginController = require("../controller/user.login.controller");
const productController = require("../controller/product.controller");

userRoutes.post("/login", loginController.checkUser);

userRoutes.post("/signup", signupController.saveUser);

userRoutes.get("/home", productController.getHomeProduct);

userRoutes.post("/home/:id", (req, res) => {
  try {
  } catch (error) {}
});

userRoutes.get("/cart/:id", (req, res) => {
  try {
  } catch (error) {}
});

userRoutes.post("/cart/delete", (req, res) => {
  try {
  } catch (error) {}
});

userRoutes.post("/saveOrder", (req, res) => {
  try {
  } catch (error) {}
});

userRoutes.post("/orders", (req, res) => {
  try {
  } catch (error) {}
});

userRoutes.post("/placeOrder", (req, res) => {
  try {
  } catch (error) {}
});
