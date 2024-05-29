import mongoose, { InferSchemaType, SchemaTypes } from "mongoose";
import { InferType, ObjectSchema, boolean, object, string } from "yup";
import { OmitStrict, WithId } from "../utils";

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
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  //
  cartId: {
    type: SchemaTypes.ObjectId,
    ref: "Cart",
    required: false,
  },
  //
  orderIds: {
    type: [SchemaTypes.ObjectId],
    ref: "Order",
    default: [],
    required: false,
  },
  //
  productsCreated: {
    type: [SchemaTypes.ObjectId],
    ref: "Product",
    default: [],
    required: false,
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
export type User = WithId<UserModelSchema>;

export enum UserRole {
  user = "user",
  admin = "admin",
}

export type UserWithoutPassword = OmitStrict<User, "password">;

/* ------------------------------- validation ------------------------------- */

const createUserValidator: ObjectSchema<
  OmitStrict<UserModelSchema, "cartId" | "orderIds" | "productsCreated">
> = object({
  email: string().email().required(),
  password: string().required(),
  username: string().required(),
  mobileNumber: string().required(),
  active: boolean().default(true).required(),
  role: string().oneOf(Object.values(UserRole)).required(),
});

export type CreateUserSchema = InferType<typeof createUserValidator>;

const loginUserValidator = object().shape({
  email: string().email().required(),
  password: string().required(),
});

export type LoginUserSchema = InferType<typeof loginUserValidator>;

export const validators = {
  createUser: createUserValidator,
  loginUser: loginUserValidator,
};
