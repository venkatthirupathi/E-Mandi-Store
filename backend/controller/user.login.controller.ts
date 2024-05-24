import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { loginModel } from "../model/LoginModel";
import { User } from "../model/UserModel";

export const checkUser = async (
  req: Request<unknown, unknown, Pick<User, "email" | "password">>,
  res: Response,
): Promise<boolean> => {
  const { email, password } = req.body;

  try {
    const user = await loginModel.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "enter valid email id" });
      return false;
    }

    const isPassword = bcrypt.compareSync(password, user.password);
    if (!isPassword) {
      res.status(404).json({ message: "enter valid password" });
      return false;
    }

    res.status(200).json({ message: "login successful" });
    return true;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    return false;
  }
};
