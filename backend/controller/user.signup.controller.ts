import { Request, Response } from "express";
import { User, userModel } from "../model/UserModel";

export default {
  saveUser: async (req: Request<unknown, unknown, User>, res: Response) => {
    try {
      const { email, password, username, mobileNumber, active, role } =
        req.body;

      console.log(req.body);

      await userModel.create({
        email: email,
        password: password,
        username: username,
        mobileNumber: mobileNumber,
        active: active,
        role: role,
      });
      console.log("saved successfully");
    } catch (error) {
      if (error) {
        // console.error("Error saving product:", error); // Log the actual error for debugging
        res.status(500).json({ message: "Server failed", error: error });
      } else {
        // console.error("Unexpected error:", error);
        res.status(500).json({
          message: "Server failed",
          error: "Unexpected error occurred",
        });
      }
    }
  },
};
