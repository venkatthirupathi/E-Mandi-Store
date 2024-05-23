import { Router } from "express";
export const userRoutes = Router();

const signupController = require("../controller/user.signup.controller");
const cartController = require("../controller/user.cart.controller");
const productController = require("../controller/product.controller");

// userRoutes.post("/login", loginController.checkUser);

userRoutes.post("/signup", signupController.saveUser);

userRoutes.get("/home", productController.getHomeProduct);

userRoutes.post("/home/:id", cartController.addToCart);

userRoutes.get("/cart/:id", cartController.showCart);

userRoutes.post("/cart/delete", cartController.deleteCartItem);

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
