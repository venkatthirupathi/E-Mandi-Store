import axios from "axios";
import console from "console";
import dotenv from "dotenv";
import { models } from "mongoose";
import { Logger } from "../Logger";
import { ApiClient } from "../client";
import { type CartGetAllResponse } from "../controller/cart";
import { connectDb } from "../db";
import { randomProduct, randomUser } from "../faker";
import { cartItemModel } from "../model/CartItem";
import { productModel, type CreateProductSchema } from "../model/ProductModel";
import { userModel, type CreateUserSchema } from "../model/UserModel";
import { startServer } from "../server";
import type { UserFromResponse } from "../types";
import { UserRole } from "../types";
import { HttpStatusCode } from "../utils";
dotenv.config({ path: ".env.test" });

/* -------------------------------- Globals --------------------------------- */

// https://stackoverflow.com/a/68017229/13460650
global.console = console;
const testUser = randomUser(UserRole.user);
const jestConsole = console;
let db: Awaited<ReturnType<typeof connectDb>>;
let server: ReturnType<typeof startServer>;
const client = axios.create({
  baseURL: "http://localhost:3024/api",
});

const api = new ApiClient(client);

/* ---------------------------- Helper functions ---------------------------- */

async function signupAndLogin(user: CreateUserSchema) {
  await api.signup(user);

  const res = await api.login({
    email: user.email,
    password: user.password,
  });

  return {
    token: res.data.token as string,
    user: res.data.user,
  };
}

/* --------------------------------- Tests ---------------------------------- */

beforeAll(async () => {
  db = await connectDb();
  server = startServer();
});

describe("Auth endpoints", () => {
  it("should signup and login user", async () => {
    const signupResponse = await api.signup(testUser);
    expect(signupResponse.status).toBe(HttpStatusCode.Created);
    expect(signupResponse.data).toHaveProperty("message");
    expect(await userModel.findOne({ email: testUser.email })).not.toBeFalsy();

    const loginResponse = await api.login({
      email: testUser.email,
      password: testUser.password,
    });
    expect(loginResponse.status).toBe(HttpStatusCode.Ok);
    expect(loginResponse.data).toHaveProperty("token");
    expect(loginResponse.data).toHaveProperty("user");
    expect(loginResponse.data.user.email).toBe(testUser.email);
  });
});

describe("Product endpoints", () => {
  // set in beforeAll
  let token: string;
  let sellerUser: UserFromResponse;
  // set in beforeEach
  let productId: string;
  let testProduct: CreateProductSchema;

  beforeAll(async () => {
    const ret = await signupAndLogin(randomUser(UserRole.seller));
    token = ret.token;
    sellerUser = ret.user;
  });

  beforeEach(async () => {
    testProduct = randomProduct();
    const response = await api.createProduct(testProduct, token);
    productId = response.data.product._id;
  });

  afterEach(async () => {
    await productModel.deleteMany({});
  });

  it("should create a product", async () => {
    const response = await api.createProduct(testProduct, token);
    expect(response.status).toBe(HttpStatusCode.Created);
    expect(response.data).toHaveProperty("product");
    productId = response.data.product._id;
    expect(response.data.product.ownerId).toBe(sellerUser._id);
    expect(await productModel.findOne(testProduct)).not.toBeFalsy();
  });

  it("should get all products", async () => {
    const response = await api.getAllProducts();
    expect(response.status).toBe(HttpStatusCode.Ok);
    expect(response.data).toHaveProperty("products");
    expect(response.data.products).toHaveLength(1);
  });

  it("should get a product", async () => {
    const response = await api.getOneProduct(productId);
    expect(response.status).toBe(HttpStatusCode.Ok);
    expect(response.data).toHaveProperty("product");
    expect(response.data.product._id).toBe(productId);
    expect(response.data.product.ownerId).toBe(sellerUser._id);
  });

  it("should update a product", async () => {
    const response = await api.updateOneProduct(
      productId,
      {
        price: 1000,
        description: "my edited description",
      },
      token
    );

    expect(response.status).toBe(HttpStatusCode.Ok);
    expect(response.data).toHaveProperty("product");
    expect(response.data.product.price).toBe(1000);
    expect(response.data.product.description).toBe("my edited description");
  });

  it("should delete a product", async () => {
    const response = await api.deleteOneProduct(productId, token);
    expect(response.status).toBe(HttpStatusCode.Ok);
    expect(response.data).toHaveProperty("message");
    expect(await productModel.findById(productId)).toBeFalsy();
  });

  afterAll(async () => {
    await userModel.deleteMany({});
  });
});

describe("Cart endpoints", () => {
  // set in beforeAll
  let userToken: string;
  let userId: string;
  let sellerToken: string;
  // set in beforeEach
  let product: CreateProductSchema;
  let productId: string;

  /* Create a user and a product */
  beforeAll(async () => {
    const sellerResponse = await signupAndLogin(randomUser(UserRole.seller));
    sellerToken = sellerResponse.token;

    const userResponse = await signupAndLogin(randomUser(UserRole.user));
    userToken = userResponse.token;
    userId = userResponse.user._id;
  });

  beforeEach(async () => {
    product = randomProduct();
    const response = await api.createProduct(product, sellerToken);
    productId = response.data.product._id;

    await api.addOneProductToCart(
      {
        productId,
      },
      userToken
    );
  });

  afterEach(async () => {
    await productModel.deleteMany({});
    await cartItemModel.deleteMany({});
  });

  it("should add a product to cart", async () => {
    const response = await api.addOneProductToCart(
      {
        productId,
      },
      userToken
    );

    expect(response.status).toBe(HttpStatusCode.Ok);
    expect(response.data).toHaveProperty("message");
    // ALERT type check populate path
    const user = await userModel
      .findById(userId)
      .populate<CartGetAllResponse>({ path: "cart", populate: "product" });
    expect(user?.cart.length).toBe(1);

    for (const item of user!.cart) {
      expect(item.product._id.equals(productId)).toBe(true);
      // 1 created by beforeEach + 1 created in this test
      expect(item.count).toBe(2);
    }
  });

  it("should get user's cart", async () => {
    const response = await api.getAllProductsFromCart(userToken);
    expect(response.status).toBe(HttpStatusCode.Ok);

    expect(response.data).toHaveProperty("cart");
    expect(response.data.cart).toHaveLength(1);
    expect(response.data.cart[0].product._id).toBe(productId);
    expect(response.data.cart[0].count).toBe(1);
  });

  it("should get user's cart with multiple items", async () => {
    // add existing product
    await api.addOneProductToCart({ productId }, userToken);

    // add new product
    const newProduct = randomProduct();
    const newProductResponse = await api.createProduct(newProduct, sellerToken);
    await api.addOneProductToCart(
      {
        productId: newProductResponse.data.product._id,
      },
      userToken
    );

    const response = await api.getAllProductsFromCart(userToken);
    expect(response.status).toBe(HttpStatusCode.Ok);
    expect(response.data).toHaveProperty("cart");
    expect(response.data.cart).toHaveLength(2);

    const received = response.data.cart.map((item) => ({
      productId: item.product._id,
      count: item.count,
    }));

    const expected = [
      { productId: productId, count: 2 },
      { productId: newProductResponse.data.product._id, count: 1 },
    ];

    expect(received).toEqual<{ productId: string; count: number }[]>(expected);
  });

  it("should decrement quantity", async () => {
    // product created and added in beforeEach - count 1
    // that same product added again - count 2
    await api.addOneProductToCart({ productId }, userToken);
    // add a new product to cart and test if it's data is not being changed
    const newProduct = await api.createProduct(randomProduct(), sellerToken);
    await api.addOneProductToCart(
      { productId: newProduct.data.product._id },
      userToken
    );

    // remove 1 quantity of the product - count 1
    const response = await api.removeOneProductFromCart(productId, userToken);
    expect(response.status).toBe(HttpStatusCode.Ok);
    expect(response.data).toHaveProperty("message");

    const allCartItems = await api.getAllProductsFromCart(userToken);
    expect(allCartItems.data.cart).toHaveLength(2);

    const received = allCartItems.data.cart.map((item) => ({
      productId: item.product._id,
      count: item.count,
    }));

    const expected = [
      { productId: productId, count: 1 },
      { productId: newProduct.data.product._id, count: 1 },
    ];

    expect(received).toEqual<{ productId: string; count: number }[]>(expected);
  });

  it("should delete cart item and remove its id from user.cart", async () => {
    // add a new product to cart and test if it's data is not being changed
    const newProduct = await api.createProduct(randomProduct(), sellerToken);
    await api.addOneProductToCart(
      { productId: newProduct.data.product._id },
      userToken
    );

    const response = await api.removeOneProductFromCart(productId, userToken);
    expect(response.status).toBe(HttpStatusCode.Ok);
    expect(response.data).toHaveProperty("message");

    const allCartItems = await api.getAllProductsFromCart(userToken);
    expect(allCartItems.data.cart).toHaveLength(1);

    const received = allCartItems.data.cart.map((item) => ({
      productId: item.product._id,
      count: item.count,
    }));

    const expected = [{ productId: newProduct.data.product._id, count: 1 }];

    expect(received).toEqual<{ productId: string; count: number }[]>(expected);
  });

  afterAll(async () => {
    await userModel.deleteMany({});
  });
});

afterAll(async () => {
  const logger = new Logger("afterAll");

  if (db) {
    for (const modelName of db.modelNames()) {
      await models[modelName].deleteMany({});
      logger.info(`Cleared ${modelName} collection`);
    }
    logger.info("Closing db connection");
    await db?.disconnect();
    logger.info("db connection closed");
  }

  server.closeAllConnections();
  server.closeIdleConnections();
  await new Promise((res, rej) => {
    const ret = server.close((err) => {
      if (err) {
        rej(err);
      }
    });
    res(ret);
  });
  global.console = jestConsole;
});
