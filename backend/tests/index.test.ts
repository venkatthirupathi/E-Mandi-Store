import console from "console";
import dotenv from "dotenv";
import supertest from "supertest";
import { connectDb } from "../db";
import { randomProduct, randomUser } from "../faker";
import { PatchProductSchema } from "../model/ProductModel";
import { LoginUserSchema, UserRole, userModel } from "../model/UserModel";
import { server } from "../server";
import { HttpStatusCode, Logger, sleep } from "../utils";
dotenv.config({ path: ".env.test" });

/* -------------------------------- Globals --------------------------------- */

const request = supertest(server);
const logger = new Logger("index.test.ts");
// https://stackoverflow.com/a/68017229/13460650
global.console = console;
const testUser = randomUser();
const jestConsole = console;
let db: Awaited<ReturnType<typeof connectDb>>;

logger.log(testUser);

/* --------------------------------- Types ---------------------------------- */

interface UserFromResponse {
  _id: string;
}

/* ---------------------------- Helper functions ---------------------------- */

async function signupAndLogin(role: UserRole) {
  const user = randomUser();
  user.role = role;
  await request.post("/api/auth/signup").send(user);

  const res = await request
    .post("/api/auth/login")
    .send({ email: user.email, password: user.password } as LoginUserSchema);

  return {
    token: res.body.token as string,
    user: res.body.user as UserFromResponse,
  };
}

/* --------------------------------- Tests ---------------------------------- */

beforeAll(async () => {
  db = await connectDb();
});

describe("Auth endpoints", () => {
  it("should signup and login user", async () => {
    const signupResponse = await request
      .post("/api/auth/signup")
      .send(testUser);
    expect(signupResponse.status).toBe(HttpStatusCode.Created);
    expect(signupResponse.body).toHaveProperty("message");

    const loginResponse = await request.post("/api/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    } as LoginUserSchema);
    expect(loginResponse.status).toBe(HttpStatusCode.Ok);
    expect(loginResponse.body).toHaveProperty("token");
    expect(loginResponse.body).toHaveProperty("user");
  });
});

describe("Product endpoints", () => {
  let token: string;
  let sellerUser: UserFromResponse;
  let productId: string;
  const testProduct = randomProduct();

  beforeAll(async () => {
    const ret = await signupAndLogin(UserRole.seller);
    token = ret.token;
    sellerUser = ret.user;
  });

  beforeEach(async () => {
    await sleep(500);
  });

  it("should create a product", async () => {
    const response = await request
      .post("/api/product")
      .send(testProduct)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(HttpStatusCode.Created);
    expect(response.body).toHaveProperty("product");
    productId = response.body.product._id;
    expect(response.body.product.ownerId).toBe(sellerUser._id);
  });

  it("should get all products", async () => {
    const response = await request.get("/api/product");
    expect(response.status).toBe(HttpStatusCode.Ok);
    expect(response.body).toHaveProperty("products");
    expect(response.body.products).toHaveLength(1);
  });

  it("should get a product", async () => {
    const response = await request.get(`/api/product/${productId}`);
    expect(response.status).toBe(HttpStatusCode.Ok);
    expect(response.body).toHaveProperty("product");
  });

  it("should update a product", async () => {
    const response = await request
      .patch(`/api/product/${productId}`)
      .send({
        price: 1000,
        description: "my edited description",
      } as PatchProductSchema)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(HttpStatusCode.Ok);
    expect(response.body).toHaveProperty("product");
    expect(response.body.product.price).toBe(1000);
  });

  it("should delete a product", async () => {
    const response = await request
      .delete(`/api/product/${productId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(HttpStatusCode.Ok);
    expect(response.body).toHaveProperty("message");
  });
});

afterAll(async () => {
  await sleep(500);

  const logger = new Logger("afterAll");
  logger.log("Finding test user");

  const foundTestUser = await userModel.findOneAndDelete({
    email: testUser.email,
  });
  if (foundTestUser) {
    logger.log("Test user found and deleted");
  } else {
    logger.log("Test user not found");
  }

  if (db) {
    logger.log("Closing db connection");
    await db?.disconnect();
    logger.log("db connection closed");
  }

  global.console = jestConsole;
});
