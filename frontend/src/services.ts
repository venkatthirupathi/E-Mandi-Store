import type { LoginResponse } from "@backend/controller/auth";
import type { CartGetAllResponse } from "@backend/controller/cart";
import type { ProductResponse } from "@backend/controller/product";
import type {
  CreateProductSchema,
  PatchProductSchema,
} from "@backend/model/ProductModel";
import type {
  CartAddItemSchema,
  CreateUserSchema,
  LoginUserSchema,
} from "@backend/model/UserModel";
import type { MessageResponse, Overwrite } from "@backend/types";
import axios from "axios";

function bearerToken(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

const client = axios.create({
  baseURL: "http://localhost:3024/api",
});

export const API = {
  auth: {
    signup: async (data: CreateUserSchema) =>
      await client.post<MessageResponse>("/auth/signup", data),
    login: async (data: LoginUserSchema) =>
      await client.post<LoginResponse>("/auth/login", data),
  },
  product: {
    create: async (data: CreateProductSchema, token: string) =>
      await client.post<ProductResponse>("/product", data, bearerToken(token)),
    getAll: async () =>
      await client.get<{ products: ProductResponse["product"][] }>("/product"),
    getOne: async (id: string) =>
      await client.get<ProductResponse>(`/product/${id}`),
    update: async (id: string, data: PatchProductSchema, token: string) =>
      await client.patch<ProductResponse>(
        `/product/${id}`,
        data,
        bearerToken(token),
      ),
    delete: async (id: string, token: string) =>
      await client.delete<MessageResponse>(
        `/product/${id}`,
        bearerToken(token),
      ),
  },
  cart: {
    addProduct: async (
      data: Overwrite<CartAddItemSchema, { productId: string }>,
      token: string,
    ) => await client.post<MessageResponse>(`/cart`, data, bearerToken(token)),
    getAll: async (token: string) =>
      await client.get<CartGetAllResponse>("/cart", bearerToken(token)),
    removeProduct: async (productId: string, token: string) =>
      await client.delete(`/cart/${productId}`, bearerToken(token)),
  },
};
