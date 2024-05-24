import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const userModel = require("../model/UserModel");

export const saveUser = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      username,
      mobileNumber,
      active,
      role,
      // cart,
      // orderList,
    } = req.body;

    // const existingUser = await userModel.findOne({ email });
    // if (existingUser) {
    //   res.status(400).json({ message: "User already exists" });
    //   return;
    // }

    const newUser = await userModel.create({
      email: email,
      password: password,
      username: username,
      mobileNumber: mobileNumber,
      active: active,
      role: role,
      // cart: cart,
      // orderList: orderList,
    });

    // const token = jwt.sign(
    //   {
    //     id: newUser._id,
    //     password: newUser.password,
    //   },
    //   process.env.JWT_SECRET as string,
    //   {
    //     expiresIn: "1h",
    //   },
    // );

    res.status(201).send(true);
  } catch (err) {
    res.status(500).send(false);
  }
};
