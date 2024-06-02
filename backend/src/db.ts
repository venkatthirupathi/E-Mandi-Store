import { connect } from "mongoose";

export async function connectDb() {
  try {
    const url = process.env.MONGODB_URL;
    if (!url) {
      throw new Error("env MONGODB_URL not set");
    }
    const db = await connect(url);
    console.log("Connected to DB");
    return db;
  } catch (e) {
    console.error("DB connection failed");
    console.error(e);
  }
  return null;
}
