import { Request, Response } from "express";
import { Cart, cartModel } from "../model/CartModel";

export default {
  addToCart: async (
    req: Request<unknown, unknown, Cart>,
    res: Response,
  ): Promise<void> => {
    try {
      const cart_obj = await cartModel.create({
        cartItemID: req.body.cartItemID,
        userId: req.body.userId,
        productName: req.body.productName,
        price: req.body.price,
      });
      const cart = await cart_obj.save();
      res.status(200).send({
        success: true,
        message: "Cart Added Successfully",
        data: cart,
      });
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },

  showCart: async (req: Request, res: Response): Promise<void> => {
    let cartItems;
    try {
      const id = req.params.id;
      const cartItemId = await cartModel.findById(id);

      if (!cartItemId) {
        res.status(404).send({ message: "No Item with given id" });
      }

      cartItems = await cartModel.find({ userId: id });
      if (cartItems) {
        res.status(404).send({ message: "No Items Found" });
      }

      res.status(200).json({ data: cartItems });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  deleteCartItem: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const cart = await cartModel.findById(id);

      if (!cart) {
        res.status(409).send({ message: "No Item with given id" });
      }

      await cartModel.findByIdAndDelete(id);
      res.status(200).send({ message: "Item Deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};
