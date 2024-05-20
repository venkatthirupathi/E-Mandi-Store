import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { userRoutes } from "./routes/user.route";
import { adminRouter } from "./routes/admin.route";

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

app.listen(port, () => {
  console.log(`${port} is successfully running`);
});
