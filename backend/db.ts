import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDb() {
  try {
    const url = process.env.MONGODB_URL;
    if (!url) {
      throw new Error("env MONGODB_URL not set");
    }
    await connect(url);
    console.log("Connected to DB");
  } catch (e) {
    console.error("DB connection failed");
    console.error(e);
  }
}
