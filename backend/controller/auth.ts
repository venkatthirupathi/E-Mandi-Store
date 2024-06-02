import bcrypt from "bcrypt";
import { Response, Router } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../error";
import { User, userModel, validators } from "../model/UserModel";
import { HttpStatusCode, Overwrite } from "../utils";

export const authRouter = Router();

authRouter.post("/signup", async (req, res: Response) => {
  const user = validators.createUser.validateSync(req.body);
  const { password, ...userWithoutPassword } = user;
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  await userModel.create({
    ...userWithoutPassword,
    password: hashedPassword,
  });
  res
    .status(HttpStatusCode.Created)
    .json({ message: "Registration successful" });
});

export interface LoginResponse {
  token: string;
  user: Overwrite<User, { _id: string }>;
}

authRouter.post("/login", async (req, res: Response<LoginResponse>) => {
  const credentials = validators.loginUser.validateSync(req.body);
  const user = await userModel.findOne({ email: credentials.email });
  if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
    throw new ApiError(401, "Invalid credentials");
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("env JWT_SECRET not set");
  }

  const token = jwt.sign({ userId: user._id }, secret, {
    expiresIn: "7d",
  });

  res.status(HttpStatusCode.Ok).json({ token, user: user.toObject() });
});
