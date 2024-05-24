const express=require('express')
export const userRoutes=express.Router();
import { Request,Response } from "express";
const signupController = require("../controller/user.signup.controller");
const cartController = require("../controller/cart.controller");
const productController = require("../controller/product.controller");

// userRoutes.post("/login", loginController.checkUser);


userRoutes.post("/signup", signupController.saveUser());

userRoutes.get("/home", productController.getHomeProduct);

userRoutes.post("/home/:id", cartController.addToCart);

userRoutes.get("/cart/:id", cartController.showCart);

userRoutes.post("/cart/delete", cartController.deleteCartItem);

userRoutes.post("/saveOrder", (req:Request, res:Response) => {
  try {
  } catch (error) {}
});

userRoutes.post("/orders", (req:Request, res:Response) => {
  try {
  } catch (error) {}
});

userRoutes.post("/placeOrder", (req:Request, res:Response) => {
  try {
  } catch (error) {}
});
