import { Types, isValidObjectId } from "mongoose";
import { mixed } from "yup";

export type Overwrite<T, U extends Partial<{ [k in keyof T]: unknown }>> = Pick<
  T,
  Exclude<keyof T, keyof U>
> &
  U;

export type OmitStrict<T, K extends keyof T> = T extends any
  ? Pick<T, Exclude<keyof T, K>>
  : never;

export const objectIdSchema = mixed<Types.ObjectId>().test(
  (val) => val !== undefined && isValidObjectId(val)
);

export type WithId<T> = T & { _id: Types.ObjectId };
