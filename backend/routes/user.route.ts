import { Request, Response, Router } from "express";
import cartController from "../controller/cart.controller";
import productController from "../controller/product.controller";
import userSignupController from "../controller/user.signup.controller";

export const userRoutes = Router();

import {saveUser} from "../controller/user.signup.controller"
import {checkUser} from "../controller/user.login.controller"
import {getHomeProduct} from "../controller/product.controller"
import {addToCart, deleteCartItem, showCart} from "../controller/cart.controller"
import {getUserProducts, } from "../controller/orders.controller"


// const signupController = require("../controller/user.signup.controller");
// const loginController = require("../controller/user.login.controller");
// const productController = require("../controller/product.controller");

userRoutes.post("/login", checkUser);

userRoutes.post("/signup", saveUser);

userRoutes.get("/home", getHomeProduct);

userRoutes.post("/home/:id", );

userRoutes.get("/cart/:id", cartController.showCart);

userRoutes.post("/cart/delete", cartController.deleteCartItem);

userRoutes.post("/saveOrder", (req: Request, res: Response) => {
  try {
  } catch (error) {}
});

userRoutes.post("/orders", (req: Request, res: Response) => {
  try {
  } catch (error) {}
});

userRoutes.post("/placeOrder", (req: Request, res: Response) => {
  try {
  } catch (error) {}
});