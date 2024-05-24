import mongoose from "mongoose";

const userOrderModelSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Types.ObjectId,
    ref: "Cart",
  },
  orderList: {
    type: [mongoose.Types.ObjectId],
    ref: "Order",
  },
});
export const userOrderModel = mongoose.model("UserOrder", userOrderModelSchema);
