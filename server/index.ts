import express from "express";
import ejs from "ejs";
import cors from "cors";
import router from "./routes";
import { connectToDatabase } from "./config";
require("./database/schema");

declare global {
  interface BigInt {
    /** Convert to BigInt to string form in JSON.stringify */
toJSON: () => string;
  }
}
BigInt.prototype.toJSON = function () {
  return this.toString();
};

// Database connection
connectToDatabase();

// List of urls that can make requests to backend
const whitelist = [
  "http://localhost:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
      callback(null, true);
    } else {
      callback(new Error("UNAUTHORIZED!"));
    }
  },
  credentials: true,
};

const server = express();
server.use(express.urlencoded({ limit: "10mb", extended: true }));
server.use(express.json({ limit: "10mb" }));
server.use(cors(corsOptions));
server.engine("html", ejs.renderFile);
server.set("view engine", "ejs");
server.use("/api", router);

export default server;
