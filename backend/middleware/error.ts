import { ErrorRequestHandler } from "express";
import { ApiError } from "../error";
import { HttpStatusCode } from "../utils";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res
      .status(HttpStatusCode.InternalServerError)
      .json({ error: (err as Error).message });
  }

  next();
};
