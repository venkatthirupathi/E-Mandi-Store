import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./db";
import { adminRouter } from "./routes/admin.route";
import { userRoutes } from "./routes/user.route";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRouter);

app.get("/app", (req, res) => {
  res.send("welcome to e-mandi store");
  console.log("login success");
});

async function main() {
  // connect to the db
  await connectDb();

  // then start the server
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

main();
