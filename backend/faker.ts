import { faker } from "@faker-js/faker";
import { CreateProductSchema } from "./model/ProductModel";
import { CreateUserSchema, UserRole } from "./model/UserModel";

export function randomUser(role: UserRole): CreateUserSchema {
  return {
    active: true,
    email: faker.internet.email(),
    mobileNumber: faker.phone.number(),
    password: faker.internet.password(),
    role,
    username: faker.internet.userName(),
  };
}

export function randomProduct(): CreateProductSchema {
  return {
    description: faker.commerce.productDescription(),
    imageUrl: faker.image.url(),
    price: faker.number.int({ min: 10, max: 100000 }),
    productName: faker.commerce.productName(),
    quantity: faker.number.int({ min: 1, max: 100 }),
  };
}
