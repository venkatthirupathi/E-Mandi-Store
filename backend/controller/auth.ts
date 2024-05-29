import bcrypt from "bcrypt";
import { Response, Router } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../error";
import { userModel, validators } from "../model/UserModel";

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
  res.json({ message: "Registration successful" });
});

authRouter.post("/login", async (req, res) => {
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

  res.json({ token, user: user.toObject() });
});
