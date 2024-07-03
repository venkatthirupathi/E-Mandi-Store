import type { AxiosInstance } from "axios";
import type { LoginResponse } from "./controller/auth";
import type { CartGetAllResponse } from "./controller/cart";
import type { ProductResponse } from "./controller/product";
import type {
  CreateProductSchema,
  PatchProductSchema,
} from "./model/ProductModel";
import type {
  CartAddItemSchema,
  CreateUserSchema,
  LoginUserSchema,
} from "./model/UserModel";
import type { MessageResponse, Overwrite } from "./types";

export class ApiClient {
  constructor(private client: AxiosInstance) {}

  static bearerToken(token: string) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  /* --------------------------------- Auth --------------------------------- */

  signup = async (data: CreateUserSchema) =>
    await this.client.post<MessageResponse>("/auth/signup", data);

  login = async (data: LoginUserSchema) =>
    await this.client.post<LoginResponse>("/auth/login", data);

  /* ------------------------------- Product -------------------------------- */

  createProduct = async (data: CreateProductSchema, token: string) =>
    await this.client.post<ProductResponse>(
      "/product",
      data,
      ApiClient.bearerToken(token)
    );

  getAllProducts = async () =>
    await this.client.get<{ products: ProductResponse["product"][] }>(
      "/product"
    );

  getOneProduct = async (id: string) =>
    await this.client.get<ProductResponse>(`/product/${id}`);

  updateOneProduct = async (
    id: string,
    data: PatchProductSchema,
    token: string
  ) =>
    await this.client.patch<ProductResponse>(
      `/product/${id}`,
      data,
      ApiClient.bearerToken(token)
    );

  deleteOneProduct = async (id: string, token: string) =>
    await this.client.delete<MessageResponse>(
      `/product/${id}`,
      ApiClient.bearerToken(token)
    );

  search = async (query: string) =>
    await this.client.post<{ products: ProductResponse["product"][] }>(
      "/product/search",
      { q: query }
    );

  /* --------------------------------- Cart --------------------------------- */

  addOneProductToCart = async (
    data: Overwrite<CartAddItemSchema, { productId: string }>,
    token: string
  ) =>
    await this.client.post<MessageResponse>(
      `/cart`,
      data,
      ApiClient.bearerToken(token)
    );

  getAllProductsFromCart = async (token: string) =>
    await this.client.get<CartGetAllResponse>(
      "/cart",
      ApiClient.bearerToken(token)
    );

  removeOneProductFromCart = async (productId: string, token: string) =>
    await this.client.delete(
      `/cart/${productId}`,
      ApiClient.bearerToken(token)
    );
}
