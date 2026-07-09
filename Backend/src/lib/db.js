import mongoose from "mongoose";

import dns from "dns";
import { ENV } from "./env.js";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

export const connectDB = async () => {
  try {
    const { MONGO_URI } = ENV;
    if (!MONGO_URI) throw new Error("Mongo_URI is  not set ");

    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log("Mongo DB connected", conn.connection.host);
  } catch (error) {
    console.error("Error connecting the mongoDB : ", error);
    process.exit(1); // 1 status code means fail 0 means success
  }
};
