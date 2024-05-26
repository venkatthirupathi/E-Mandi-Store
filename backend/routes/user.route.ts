import { Request, Response, Router } from "express";
import { deleteCartItem, showCart } from "../controller/cart.controller";
import { getHomeProduct } from "../controller/product.controller";
import { checkUser } from "../controller/user.login.controller";
import userSignupController from "../controller/user.signup.controller";

export const userRoutes = Router();

userRoutes.post("/login", checkUser);

userRoutes.post("/signup", userSignupController.saveUser);

userRoutes.get("/home", getHomeProduct);

userRoutes.post("/home/:id");

userRoutes.get("/cart/:id", showCart);

userRoutes.post("/cart/delete", deleteCartItem);

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
