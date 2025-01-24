import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
import { CONFIG, connectToDatabase } from "./config";
import swaggerDocs from "./swagger";
import express from "express";
import ejs from "ejs";
import cors from "cors";
import router from "./routes";
import helmet from "helmet";
import helmetCsp from "helmet-csp";
import xss from "xss-clean";

import { RateLimiterMemory } from "rate-limiter-flexible";
import expressSanitizer from "express-sanitizer";

import { sendMail } from "libraries/resend";
import { LeadToProspectMail } from "static/views/email/get-templates/LeadToProspectMail";
import * as process from "node:process";

dotenv.config();

const rateLimiter = new RateLimiterMemory({
    points: 50, // Number of points
    duration: 1, // Per second
});

import "./apps/database/index";
import { loggerMiddleware } from "./apps/logger/middlewares/loggerMiddleware";
import { PendingOrderModel } from "./apps/pending-orders/models/PendingOrderTable";
import {
    parseAndSavePendingOrderToOrder,
    parsedToPayload,
} from "./apps/order/parser/parseOrder";
import { OrderRepo } from "./apps/order/repos/orderRepo";
import RepoProvider from "./apps/RepoProvider";
import { invoice } from "apps/invoice/functions/create-invoice";
import {
    ORDER_TYPE,
    OrderStatus,
    ParsedOrder,
    PAYMENT_TYPE,
} from "apps/order/interface/Order";
import { USER_TYPE } from "apps/user/interface/user";
import { PRODUCT_STATUS, PRODUCTS_TYPE } from "apps/product/interface/Product";
import { CATEGORY_TYPE } from "apps/products-category/interface/Category";
import { PRODUCT_OPTIONS_STATUS } from "apps/product/interface/ProductOptions";
import {
    ORDER_ITEM_TYPE,
    PRICE_COMP_TYPE_CART,
    VALUE_TYPE,
} from "apps/order/interface/OrderItem";
import { saveBuffersAsPDF } from "apps/invoice/utils/invoice-utils";
import {OrderMail} from "./static/views/email/get-templates/OrderMail";

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
const whitelist = ["http://localhost:3001", "http://localhost:3000", "*"];

const corsOptions = {
    origin: (origin, callback) => {
        callback(null, true);
        // if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
        //   callback(null, true);
        // } else {
        //   callback(new Error("UNAUTHORIZED!"));
        // }
    },
    credentials: true,
};

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100 // Limit each IP to 100 requests per windowMs
// });

export const server = express();

// server.use(loggerMiddleware);

server.use(async (req, res, next) => {
    // Purpose: A more flexible rate limiter than express-rate-limit, suitable
    // for different types of stores (e.g., Redis).
    try {
        await rateLimiter.consume(req.ip);
        next();
    } catch (rejRes) {
        res.status(429).send("Too Many Requests");
    }
});

server.use(express.urlencoded({ limit: "10mb", extended: true }));
server.use(express.json({ limit: "10mb" }));
server.use(helmet()); // Purpose: Adds various HTTP headers to help protect
// your app from common web
server.use(
    helmetCsp({
        // Purpose: Provides a Content Security Policy (CSP) middleware for
        // Helmet to help prevent XSS attacks.
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "trusted-cdn.com"],
            // Additional directives
        },
    }),
);
server.use(xss()); // Purpose: Middleware for Express to sanitize user input
// for XSS attacks.
server.use(expressSanitizer());
// server.use(limiter); // Purpose: Limits repeated requests to public APIs
// and/or endpoints, which helps to prevent
server.use(cors(corsOptions));
server.engine("html", ejs.renderFile);
server.set("view engine", "ejs");


server.get("/a", async (_, res) => {
    const response =
        await RepoProvider.pendingOrderRepo.getPendingOrderByAttributes({
            id: 1,
        });
    const payload = parsedToPayload(response);
    const ress = await RepoProvider.orderRepo.createOrder(payload);

    res.json(ress);
});


server.get("/b", async (_, res) => {
    const response =  await RepoProvider.pendingOrderRepo.getPendingOrderByAttributes({
        id: 4,
    });

   const dd = await new OrderMail().getPayload({order:response},"niteshrghv@gmail.com")
    await  sendMail(dd)

    res.json(dd);
});


server.get("/", async (_, res) => {
    const resp = await RepoProvider.orderRepo.getAllOrders(100, 100, "", {});
    res.send(resp);
});



server.use("/api", router);

// commissionCron.startCron("11 15 * * *");
const PORT = CONFIG.PORT;
try {
    server.listen(PORT, () =>
        console.log(`Server is live at localhost:${PORT}`),
    );
    swaggerDocs(server, PORT);
} catch (error) {
    console.log("Cannot connect to the server");
}
