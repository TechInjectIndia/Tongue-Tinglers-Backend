import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import sgMail from "@sendgrid/mail";
import { CONFIG } from "./config";
import swaggerDocs from './swagger';
import express from "express";
import ejs from "ejs";
import cors from "cors";
import router from "./routes";
import { connectToDatabase } from "./config";
require("./database/schema");
const helmet = require('helmet');
const helmetCsp = require('helmet-csp');
const rateLimit = require('express-rate-limit');
const { RateLimiterMemory } = require('rate-limiter-flexible');
const rateLimiter = new RateLimiterMemory({
  points: 10, // Number of points
  duration: 1, // Per second
});
const expressSanitizer = require('express-sanitizer');

const env = dotenv.config({ path: `${__dirname}/.env` });
dotenvExpand.expand(env);

declare global {
  interface BigInt {
    /** Convert to BigInt to string form in JSON.stringify */
    toJSON: () => string;
  }
}
BigInt.prototype.toJSON = function () {
  return this.toString();
};

// Set sendgrid api key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Database connection
connectToDatabase();

// List of urls that can make requests to backend
const whitelist = [
  "http://localhost:3001",
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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
});

const server = express();

server.use(async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (rejRes) {
    res.status(429).send('Too Many Requests');
  }
});

server.use(express.urlencoded({ limit: "10mb", extended: true }));
server.use(express.json({ limit: "10mb" }));
server.use(helmet());
server.use(
  helmetCsp({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"],
      // Additional directives
    }
  })
);
server.use(expressSanitizer());
server.use(limiter);
server.use(cors(corsOptions));
server.engine("html", ejs.renderFile);
server.set("view engine", "ejs");
server.use("/api", router);

const PORT = CONFIG.PORT;
try {
  server.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));
  swaggerDocs(server, PORT)
} catch (error) {
  console.log('Cannot connect to the server')
}