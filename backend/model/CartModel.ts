import mongoose, { InferSchemaType, SchemaTypes, Types } from "mongoose";
import { WithId } from "../utils";
import { userModel } from "./UserModel";

const cartModelSchema = new mongoose.Schema({
  userId: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  products: {
    type: [SchemaTypes.ObjectId],
    ref: "Product",
    required: true,
    default: [],
  },
});

export const cartModel = mongoose.model("Cart", cartModelSchema);

type CartModelSchema = InferSchemaType<typeof cartModelSchema>;
export type Cart = WithId<CartModelSchema>;

export async function findOrCreateCart(
  userId: Types.ObjectId,
  cartId?: Types.ObjectId | null
) {
  console.log({ userId, cartId });
  const found = await cartModel.findById(cartId);
  if (!found) {
    const cart = await cartModel.create({
      userId,
      products: [],
    });
    await userModel.findByIdAndUpdate(userId, {
      $set: {
        cartId: cart._id,
      },
    });
    return cart;
  }
  return found;
}
