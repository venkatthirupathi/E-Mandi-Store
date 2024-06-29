import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { MongoServerError } from "mongodb";
import { ApiError } from "../error";
import { HttpStatusCode, Logger } from "../utils";

enum MongoServerErrorCode {
  DuplicateKey = 11000,
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const logger = new Logger("errorHandler");
  logger.error(err);
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  } else if (err instanceof MongoServerError) {
    switch (err.code) {
      case MongoServerErrorCode.DuplicateKey:
        return res
          .status(HttpStatusCode.BadRequest)
          .json({ error: "User already exists" });
    }
  }
  res
    .status(HttpStatusCode.InternalServerError)
    .json({ error: (err as Error).message });

  req;
  next;
};

export const asyncHandler =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
