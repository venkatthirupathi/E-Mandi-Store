import dotenv from "dotenv";
import express, { Router } from "express";
import { authRouter } from "./controller/auth";
import { productRouter } from "./controller/product";
import { connectDb } from "./db";
import { errorHandler } from "./middleware/error";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const apiRouter = Router();
app.use("/api", apiRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/product", productRouter);

apiRouter.get("/health", (req, res) => {
  res.json({ message: "healthy" });
});

app.use(errorHandler);

async function main() {
  // connect to the db
  await connectDb();

  // then start the server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

void main();
