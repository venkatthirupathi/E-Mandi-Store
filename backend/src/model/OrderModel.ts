import mongoose from "mongoose";

const orderModelSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

["toJSON", "toObject"].forEach((key) =>
  orderModelSchema.set(key as any, {
    transform(doc: any, ret: any, opt: any) {
      delete ret["__v"];
      return ret;
    },
  })
);

export const orderModel = mongoose.model("Order", orderModelSchema);
