import express, { Router } from "express";
import { authRouter } from "./controller/auth";
import { productRouter } from "./controller/product";
import { errorHandler } from "./middleware/error";

const app = express();
// App middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
const apiRouter = Router();
app.use("/api", apiRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/product", productRouter);

// Health check endpoint
apiRouter.get("/health", (req, res) => {
  res.json({ message: "healthy" });
});

// Error handler middleware
app.use(errorHandler);

export const server = app;
