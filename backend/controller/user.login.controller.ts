const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/userModel");
import { Response, Request } from "express";

const loginmodel = require("../model/LoginModel.ts");
export const checkUser = async (
  req: Request,
  res: Response,
): Promise<boolean> => {
  const { email, password } = req.body;

  try {
    const user = await loginmodel.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "enter valid email id" });
      return false;
    }
    const ispassword = await bcrypt.compare(password, user.password);
    if (!ispassword) {
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
