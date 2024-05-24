import { Request, Response, Router } from "express";
import cartController from "../controller/cart.controller";
import productController from "../controller/product.controller";
import userSignupController from "../controller/user.signup.controller";

export const userRoutes = Router();

// userRoutes.post("/login", loginController.checkUser);

userRoutes.post("/signup", userSignupController.saveUser);

userRoutes.get("/home", productController.getHomeProduct);

userRoutes.post("/home/:id", cartController.addToCart);

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
