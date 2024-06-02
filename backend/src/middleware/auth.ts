import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../error";
import { User, UserRole, userModel } from "../model/UserModel";
import { HttpStatusCode } from "../utils";

interface AuthenticatedResponse extends Response<unknown, { user: User }> {}

export const authenticate = function (...roles: UserRole[]) {
  return function (
    req: Request,
    res: AuthenticatedResponse,
    next: NextFunction
  ) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      throw new ApiError(HttpStatusCode.Unauthorized, "Unauthorized");
    }
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("env JWT_SECRET not set");
    }
    jwt.verify(token, secret, async (err, payload) => {
      if (err || !payload) {
        console.error(err);
        return res
          .status(HttpStatusCode.Unauthorized)
          .json({ error: "Unauthorized" });
      }
      const userId = (payload as jwt.JwtPayload & { userId: string }).userId;
      const foundUser = await userModel.findById(userId);
      if (!foundUser || !roles.includes(foundUser.role as UserRole)) {
        return res
          .status(HttpStatusCode.Unauthorized)
          .json({ error: "Unauthorized" });
      }
      res.locals.user = foundUser;
      next();
    });
  };
};
