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

["toJSON", "toObject"].forEach((key) =>
  userOrderModelSchema.set(key as any, {
    transform(doc: any, ret: any, opt: any) {
      delete ret["__v"];
      return ret;
    },
  })
);

export const userOrderModel = mongoose.model("UserOrder", userOrderModelSchema);
