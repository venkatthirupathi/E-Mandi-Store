import { connect } from "mongoose";

export async function connectDb() {
  try {
    const url = process.env.MONGODB_URL;
    if (!!url) {
      throw new Error("env MONGODB_URL not set");
    }
    console.log({ url });
    await connect(url!);
    console.log("Connected to DB");
  } catch (e) {
    console.error("DB connection failed");
    console.error(e);
  }
}
