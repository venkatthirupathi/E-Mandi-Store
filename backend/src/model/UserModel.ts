import mongoose, { InferSchemaType, SchemaTypes } from "mongoose";
import { InferType, ObjectSchema, object, string } from "yup";
import { OmitStrict, UserRole } from "../types";
import { WithId, objectIdSchema } from "../utils";

/* -------------------------------- mongoose -------------------------------- */

const userModelSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  active: {
    type: Boolean,
    default: true,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  cart: {
    type: [SchemaTypes.ObjectId],
    ref: "CartItem",
    default: [],
    required: true,
  },
  //
  orderIds: {
    type: [SchemaTypes.ObjectId],
    ref: "Order",
    default: [],
    required: true,
  },
  // User: productsCreated[], Product: ownerId
  productsCreated: {
    type: [SchemaTypes.ObjectId],
    ref: "Product",
    default: [],
    required: true,
  },
});

["toJSON", "toObject"].forEach((key) =>
  userModelSchema.set(key as any, {
    transform(doc: any, ret: any, opt: any) {
      delete ret["password"];
      delete ret["__v"];
      return ret;
    },
  })
);

export const userModel = mongoose.model("User", userModelSchema);

/* --------------------------------- types ---------------------------------- */

type UserModelSchema = InferSchemaType<typeof userModelSchema>;
export type User = WithId<OmitStrict<UserModelSchema, "password">>;

/* ------------------------------- validation ------------------------------- */

const createUserValidator: ObjectSchema<
  OmitStrict<
    UserModelSchema,
    "orderIds" | "productsCreated" | "cart" | "active"
  >
> = object({
  email: string().email().required(),
  password: string().required(),
  username: string().required(),
  mobileNumber: string().required(),
  role: string().oneOf(Object.values(UserRole)).required(),
});

export type CreateUserSchema = InferType<typeof createUserValidator>;

const loginUserValidator = object({
  email: string().email().required(),
  password: string().required(),
});

export type LoginUserSchema = InferType<typeof loginUserValidator>;

const cartAddItemValidator = object({
  productId: objectIdSchema.required(),
});
export type CartAddItemSchema = InferType<typeof cartAddItemValidator>;

export const validators = {
  createUser: createUserValidator,
  loginUser: loginUserValidator,
  cartAddItem: cartAddItemValidator,
};
