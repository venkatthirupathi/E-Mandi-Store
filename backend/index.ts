import dotenv from "dotenv";
import { connectDb } from "./db";
import { server } from "./server";
dotenv.config();

async function main() {
  // connect to the db
  await connectDb();

  // then start the server
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

void main();
