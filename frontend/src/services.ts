import { ApiClient } from "@backend/client";
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3024/api",
});

export const API = new ApiClient(client);
