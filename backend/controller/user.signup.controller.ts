import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const userModel = require("../model/UserModel");
import {userRoutes} from "../routes/user.route"

export const saveUser = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      username,
      mobileNumber,
      active,
      role } = req.body;
      
      console.log(req.body);

   
    const newUser = await userModel.create({
      email: email,
      password: password,
      username: username,
      mobileNumber: mobileNumber,
      active: active,
      role: role      
    });
    console.log("saved successfully")

  } catch (error) {
  
    if (error) {
      // console.error("Error saving product:", error); // Log the actual error for debugging
      res.status(500).json({ message: "Server failed", error: error });
    } else {
      // console.error("Unexpected error:", error);
      res
        .status(500)
        .json({ message: "Server failed", error: "Unexpected error occurred" });
    }
  }
}

