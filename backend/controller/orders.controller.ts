import { Response, Request } from "express";
import { orderModel } from "../model/OrderModel";

interface List<T> {
  data: T[];
}

export const getUserProducts = async (
  req: Request,
  res: Response,
  //   ): Promise<List<typeof orderModel>> => {
) => {
  try {
    const userId = req.params.id;

    const orders = await orderModel.findById(userId);

    console.log(orders);

    if (!orders) {
      res.status(400).json({ message: "No orders found for this user" });
      return Promise.reject(new Error("No orders found for this user"));
    }

    res.status(200).json(orders);
  } catch {
    res.status(500).json({ message: "Server falied" });
    return Promise.reject(new Error("Failed to fetch order"));
  }
};


export const getOrders = async (
  req: Request,
  res: Response,
  //   ): Promise<List<typeof orderModel>> => {
) => {
  try {
    const userId = req.params.id;

    const orders = await orderModel.find();

    console.log(orders);

    if (!orders) {
      res.status(400).json({ message: "No orders found for this user" });
      return Promise.reject(new Error("No orders found for this user"));
    }

    res.status(200).json(orders);
  } catch {
    res.status(500).json({ message: "Server falied" });
    return Promise.reject(new Error("Failed to fetch order"));
  }
};
