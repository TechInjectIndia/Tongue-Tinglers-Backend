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
    res.json(response);
});

// server.get("/harsh", async (_, res) => {
//     // let order: ParsedOrder = {
//     //     id: 0,
//     //     status: OrderStatus.PROCESSED,
//     //     total: 2997,
//     //     totalTax: 539.46,
//     //     deliveryStatus: "",
//     //     customerDetails: {
//     //         id: 1,
//     //         firstName: "Root",
//     //         lastName: "User",
//     //         email: "admin@TongueTingler.com",
//     //         phoneNumber: "+918220735528",
//     //         type: USER_TYPE.ADMIN,
//     //         status: null,
//     //         role: 0,
//     //         updatedBy: null,
//     //         deletedBy: null,
//     //         createdAt: new Date("2025-01-18T06:40:28.613Z"),
//     //         updatedAt: new Date("2025-01-18T06:40:28.615Z"),
//     //         deletedAt: null,
//     //         createdBy: null,
//     //         profilePhoto: "",
//     //     },
//     //     paymentType: PAYMENT_TYPE.RP_CHECKOUT,
//     //     paymentId: "1234",
//     //     cancelledItems: [],
//     //     totalDiscount: 0,
//     //     deliveryDetails: null,
//     //     shippingAddress: {
//     //         id: 3,
//     //         street: "Mathura",
//     //         city: "Mathura",
//     //         state: "Uttar Pradesh",
//     //         postalCode: "281004",
//     //         country: "India",
//     //         phoneNumber: "+919997016578",
//     //         firstName: "Nitesh",
//     //         lastName: "Kumar",
//     //     },
//     //     billingAddress: {
//     //         id: 3,
//     //         street: "Mathura",
//     //         city: "Mathura",
//     //         state: "Uttar Pradesh",
//     //         postalCode: "281004",
//     //         country: "India",
//     //         phoneNumber: "+919997016578",
//     //         firstName: "Nitesh",
//     //         lastName: "Kumar",
//     //     },
//     //     totalShipping: 0,
//     //     anomalyArr: [],
//     //     coupon: "",
//     //     items: [
//     //         {
//     //             id: 5,
//     //             product: {
//     //                 id: 3,
//     //                 name: "Non Veg Kit ",
//     //                 MOQ: 1,
//     //                 category: {
//     //                     id: 3,
//     //                     name: "Non Veg Kit",
//     //                     slug: "Non-Veg-Kit",
//     //                     description: "Non-Veg-Kit",
//     //                     status: PRODUCT_STATUS.ACTIVE,
//     //                     type: CATEGORY_TYPE.SAMPLE_KIT,
//     //                 },
//     //                 description:
//     //                     "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
//     //                 images: [
//     //                     "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
//     //                 ],
//     //                 slug: "Non-Veg-Kit",
//     //                 status: PRODUCT_STATUS.ACTIVE,
//     //                 type: PRODUCTS_TYPE.RETORT,
//     //                 tax_rate_id: 1,
//     //                 vendorId: 1,
//     //                 updatedBy: null,
//     //                 deletedBy: null,
//     //                 createdAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 updatedAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 deletedAt: null,
//     //                 createdBy: 1,
//     //                 variations: [
//     //                     {
//     //                         id: 4,
//     //                         option_value: {
//     //                             id: 2,
//     //                             name: "Large",
//     //                             options: {
//     //                                 id: 2,
//     //                                 name: "Size",
//     //                             },
//     //                         },
//     //                         price: 999,
//     //                         stock: 12,
//     //                         status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                         images: "",
//     //                     },
//     //                 ],
//     //             },
//     //             productOption: {
//     //                 id: 2,
//     //                 option_value: undefined,
//     //                 price: 0,
//     //                 stock: 0,
//     //                 status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                 images: "",
//     //             },
//     //             quantity: 1,
//     //             total_price: 999,
//     //             totalTax: 179.82,
//     //             prices: {
//     //                 "base-price": {
//     //                     type: PRICE_COMP_TYPE_CART.BASE_PRICE,
//     //                     percent: 18,
//     //                     value: 999,
//     //                     tax: 179.82,
//     //                     taxPercent: 0,
//     //                     calc: VALUE_TYPE.ABSOLUTE,
//     //                 },
//     //             },
//     //             disc: {},
//     //             type: ORDER_ITEM_TYPE.RETORT,
//     //             totalDiscount: 0,
//     //         },
//     //         {
//     //             id: 5,
//     //             product: {
//     //                 id: 3,
//     //                 name: "Non Veg Kit ",
//     //                 MOQ: 1,
//     //                 category: {
//     //                     id: 3,
//     //                     name: "Non Veg Kit",
//     //                     slug: "Non-Veg-Kit",
//     //                     description: "Non-Veg-Kit",
//     //                     status: PRODUCT_STATUS.ACTIVE,
//     //                     type: CATEGORY_TYPE.SAMPLE_KIT,
//     //                 },
//     //                 description:
//     //                     "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
//     //                 images: [
//     //                     "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
//     //                 ],
//     //                 slug: "Non-Veg-Kit",
//     //                 status: PRODUCT_STATUS.ACTIVE,
//     //                 type: PRODUCTS_TYPE.RETORT,
//     //                 tax_rate_id: 1,
//     //                 vendorId: 1,
//     //                 updatedBy: null,
//     //                 deletedBy: null,
//     //                 createdAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 updatedAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 deletedAt: null,
//     //                 createdBy: 1,
//     //                 variations: [
//     //                     {
//     //                         id: 4,
//     //                         option_value: {
//     //                             id: 2,
//     //                             name: "Large",
//     //                             options: {
//     //                                 id: 2,
//     //                                 name: "Size",
//     //                             },
//     //                         },
//     //                         price: 999,
//     //                         stock: 12,
//     //                         status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                         images: "",
//     //                     },
//     //                 ],
//     //             },
//     //             productOption: {
//     //                 id: 2,
//     //                 option_value: undefined,
//     //                 price: 0,
//     //                 stock: 0,
//     //                 status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                 images: "",
//     //             },
//     //             quantity: 1,
//     //             total_price: 999,
//     //             totalTax: 179.82,
//     //             prices: {
//     //                 "base-price": {
//     //                     type: PRICE_COMP_TYPE_CART.BASE_PRICE,
//     //                     percent: 18,
//     //                     value: 999,
//     //                     tax: 179.82,
//     //                     taxPercent: 0,
//     //                     calc: VALUE_TYPE.ABSOLUTE,
//     //                 },
//     //             },
//     //             disc: {},
//     //             type: ORDER_ITEM_TYPE.RETORT,
//     //             totalDiscount: 0,
//     //         },
//     //         {
//     //             id: 5,
//     //             product: {
//     //                 id: 3,
//     //                 name: "Non Veg Kit ",
//     //                 MOQ: 1,
//     //                 category: {
//     //                     id: 3,
//     //                     name: "Non Veg Kit",
//     //                     slug: "Non-Veg-Kit",
//     //                     description: "Non-Veg-Kit",
//     //                     status: PRODUCT_STATUS.ACTIVE,
//     //                     type: CATEGORY_TYPE.SAMPLE_KIT,
//     //                 },
//     //                 description:
//     //                     "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
//     //                 images: [
//     //                     "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
//     //                 ],
//     //                 slug: "Non-Veg-Kit",
//     //                 status: PRODUCT_STATUS.ACTIVE,
//     //                 type: PRODUCTS_TYPE.RETORT,
//     //                 tax_rate_id: 1,
//     //                 vendorId: 1,
//     //                 updatedBy: null,
//     //                 deletedBy: null,
//     //                 createdAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 updatedAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 deletedAt: null,
//     //                 createdBy: 1,
//     //                 variations: [
//     //                     {
//     //                         id: 4,
//     //                         option_value: {
//     //                             id: 2,
//     //                             name: "Large",
//     //                             options: {
//     //                                 id: 2,
//     //                                 name: "Size",
//     //                             },
//     //                         },
//     //                         price: 999,
//     //                         stock: 12,
//     //                         status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                         images: "",
//     //                     },
//     //                 ],
//     //             },
//     //             productOption: {
//     //                 id: 2,
//     //                 option_value: undefined,
//     //                 price: 0,
//     //                 stock: 0,
//     //                 status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                 images: "",
//     //             },
//     //             quantity: 1,
//     //             total_price: 999,
//     //             totalTax: 179.82,
//     //             prices: {
//     //                 "base-price": {
//     //                     type: PRICE_COMP_TYPE_CART.BASE_PRICE,
//     //                     percent: 18,
//     //                     value: 999,
//     //                     tax: 179.82,
//     //                     taxPercent: 0,
//     //                     calc: VALUE_TYPE.ABSOLUTE,
//     //                 },
//     //             },
//     //             disc: {},
//     //             type: ORDER_ITEM_TYPE.RETORT,
//     //             totalDiscount: 0,
//     //         },
//     //         {
//     //             id: 5,
//     //             product: {
//     //                 id: 3,
//     //                 name: "Non Veg Kit ",
//     //                 MOQ: 1,
//     //                 category: {
//     //                     id: 3,
//     //                     name: "Non Veg Kit",
//     //                     slug: "Non-Veg-Kit",
//     //                     description: "Non-Veg-Kit",
//     //                     status: PRODUCT_STATUS.ACTIVE,
//     //                     type: CATEGORY_TYPE.SAMPLE_KIT,
//     //                 },
//     //                 description:
//     //                     "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
//     //                 images: [
//     //                     "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
//     //                 ],
//     //                 slug: "Non-Veg-Kit",
//     //                 status: PRODUCT_STATUS.ACTIVE,
//     //                 type: PRODUCTS_TYPE.RETORT,
//     //                 tax_rate_id: 1,
//     //                 vendorId: 1,
//     //                 updatedBy: null,
//     //                 deletedBy: null,
//     //                 createdAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 updatedAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 deletedAt: null,
//     //                 createdBy: 1,
//     //                 variations: [
//     //                     {
//     //                         id: 4,
//     //                         option_value: {
//     //                             id: 2,
//     //                             name: "Large",
//     //                             options: {
//     //                                 id: 2,
//     //                                 name: "Size",
//     //                             },
//     //                         },
//     //                         price: 999,
//     //                         stock: 12,
//     //                         status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                         images: "",
//     //                     },
//     //                 ],
//     //             },
//     //             productOption: {
//     //                 id: 2,
//     //                 option_value: undefined,
//     //                 price: 0,
//     //                 stock: 0,
//     //                 status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                 images: "",
//     //             },
//     //             quantity: 1,
//     //             total_price: 999,
//     //             totalTax: 179.82,
//     //             prices: {
//     //                 "base-price": {
//     //                     type: PRICE_COMP_TYPE_CART.BASE_PRICE,
//     //                     percent: 18,
//     //                     value: 999,
//     //                     tax: 179.82,
//     //                     taxPercent: 0,
//     //                     calc: VALUE_TYPE.ABSOLUTE,
//     //                 },
//     //             },
//     //             disc: {},
//     //             type: ORDER_ITEM_TYPE.RETORT,
//     //             totalDiscount: 0,
//     //         },
//     //         {
//     //             id: 5,
//     //             product: {
//     //                 id: 3,
//     //                 name: "Non Veg Kit ",
//     //                 MOQ: 1,
//     //                 category: {
//     //                     id: 3,
//     //                     name: "Non Veg Kit",
//     //                     slug: "Non-Veg-Kit",
//     //                     description: "Non-Veg-Kit",
//     //                     status: PRODUCT_STATUS.ACTIVE,
//     //                     type: CATEGORY_TYPE.SAMPLE_KIT,
//     //                 },
//     //                 description:
//     //                     "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
//     //                 images: [
//     //                     "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
//     //                 ],
//     //                 slug: "Non-Veg-Kit",
//     //                 status: PRODUCT_STATUS.ACTIVE,
//     //                 type: PRODUCTS_TYPE.RETORT,
//     //                 tax_rate_id: 1,
//     //                 vendorId: 1,
//     //                 updatedBy: null,
//     //                 deletedBy: null,
//     //                 createdAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 updatedAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 deletedAt: null,
//     //                 createdBy: 1,
//     //                 variations: [
//     //                     {
//     //                         id: 4,
//     //                         option_value: {
//     //                             id: 2,
//     //                             name: "Large",
//     //                             options: {
//     //                                 id: 2,
//     //                                 name: "Size",
//     //                             },
//     //                         },
//     //                         price: 999,
//     //                         stock: 12,
//     //                         status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                         images: "",
//     //                     },
//     //                 ],
//     //             },
//     //             productOption: {
//     //                 id: 2,
//     //                 option_value: undefined,
//     //                 price: 0,
//     //                 stock: 0,
//     //                 status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                 images: "",
//     //             },
//     //             quantity: 1,
//     //             total_price: 999,
//     //             totalTax: 179.82,
//     //             prices: {
//     //                 "base-price": {
//     //                     type: PRICE_COMP_TYPE_CART.BASE_PRICE,
//     //                     percent: 18,
//     //                     value: 999,
//     //                     tax: 179.82,
//     //                     taxPercent: 0,
//     //                     calc: VALUE_TYPE.ABSOLUTE,
//     //                 },
//     //             },
//     //             disc: {},
//     //             type: ORDER_ITEM_TYPE.RETORT,
//     //             totalDiscount: 0,
//     //         },
//     //         {
//     //             id: 5,
//     //             product: {
//     //                 id: 3,
//     //                 name: "Non Veg Kit ",
//     //                 MOQ: 1,
//     //                 category: {
//     //                     id: 3,
//     //                     name: "Non Veg Kit",
//     //                     slug: "Non-Veg-Kit",
//     //                     description: "Non-Veg-Kit",
//     //                     status: PRODUCT_STATUS.ACTIVE,
//     //                     type: CATEGORY_TYPE.SAMPLE_KIT,
//     //                 },
//     //                 description:
//     //                     "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
//     //                 images: [
//     //                     "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
//     //                 ],
//     //                 slug: "Non-Veg-Kit",
//     //                 status: PRODUCT_STATUS.ACTIVE,
//     //                 type: PRODUCTS_TYPE.RETORT,
//     //                 tax_rate_id: 1,
//     //                 vendorId: 1,
//     //                 updatedBy: null,
//     //                 deletedBy: null,
//     //                 createdAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 updatedAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 deletedAt: null,
//     //                 createdBy: 1,
//     //                 variations: [
//     //                     {
//     //                         id: 4,
//     //                         option_value: {
//     //                             id: 2,
//     //                             name: "Large",
//     //                             options: {
//     //                                 id: 2,
//     //                                 name: "Size",
//     //                             },
//     //                         },
//     //                         price: 999,
//     //                         stock: 12,
//     //                         status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                         images: "",
//     //                     },
//     //                 ],
//     //             },
//     //             productOption: {
//     //                 id: 2,
//     //                 option_value: undefined,
//     //                 price: 0,
//     //                 stock: 0,
//     //                 status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                 images: "",
//     //             },
//     //             quantity: 1,
//     //             total_price: 999,
//     //             totalTax: 179.82,
//     //             prices: {
//     //                 "base-price": {
//     //                     type: PRICE_COMP_TYPE_CART.BASE_PRICE,
//     //                     percent: 18,
//     //                     value: 999,
//     //                     tax: 179.82,
//     //                     taxPercent: 0,
//     //                     calc: VALUE_TYPE.ABSOLUTE,
//     //                 },
//     //             },
//     //             disc: {},
//     //             type: ORDER_ITEM_TYPE.RETORT,
//     //             totalDiscount: 0,
//     //         },
//     //         {
//     //             id: 5,
//     //             product: {
//     //                 id: 3,
//     //                 name: "Non Veg Kit ",
//     //                 MOQ: 1,
//     //                 category: {
//     //                     id: 3,
//     //                     name: "Non Veg Kit",
//     //                     slug: "Non-Veg-Kit",
//     //                     description: "Non-Veg-Kit",
//     //                     status: PRODUCT_STATUS.ACTIVE,
//     //                     type: CATEGORY_TYPE.SAMPLE_KIT,
//     //                 },
//     //                 description:
//     //                     "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
//     //                 images: [
//     //                     "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
//     //                 ],
//     //                 slug: "Non-Veg-Kit",
//     //                 status: PRODUCT_STATUS.ACTIVE,
//     //                 type: PRODUCTS_TYPE.RETORT,
//     //                 tax_rate_id: 1,
//     //                 vendorId: 1,
//     //                 updatedBy: null,
//     //                 deletedBy: null,
//     //                 createdAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 updatedAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 deletedAt: null,
//     //                 createdBy: 1,
//     //                 variations: [
//     //                     {
//     //                         id: 4,
//     //                         option_value: {
//     //                             id: 2,
//     //                             name: "Large",
//     //                             options: {
//     //                                 id: 2,
//     //                                 name: "Size",
//     //                             },
//     //                         },
//     //                         price: 999,
//     //                         stock: 12,
//     //                         status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                         images: "",
//     //                     },
//     //                 ],
//     //             },
//     //             productOption: {
//     //                 id: 2,
//     //                 option_value: undefined,
//     //                 price: 0,
//     //                 stock: 0,
//     //                 status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                 images: "",
//     //             },
//     //             quantity: 1,
//     //             total_price: 999,
//     //             totalTax: 179.82,
//     //             prices: {
//     //                 "base-price": {
//     //                     type: PRICE_COMP_TYPE_CART.BASE_PRICE,
//     //                     percent: 18,
//     //                     value: 999,
//     //                     tax: 179.82,
//     //                     taxPercent: 0,
//     //                     calc: VALUE_TYPE.ABSOLUTE,
//     //                 },
//     //             },
//     //             disc: {},
//     //             type: ORDER_ITEM_TYPE.RETORT,
//     //             totalDiscount: 0,
//     //         },
//     //         {
//     //             id: 5,
//     //             product: {
//     //                 id: 3,
//     //                 name: "Non Veg Kit ",
//     //                 MOQ: 1,
//     //                 category: {
//     //                     id: 3,
//     //                     name: "Non Veg Kit",
//     //                     slug: "Non-Veg-Kit",
//     //                     description: "Non-Veg-Kit",
//     //                     status: PRODUCT_STATUS.ACTIVE,
//     //                     type: CATEGORY_TYPE.SAMPLE_KIT,
//     //                 },
//     //                 description:
//     //                     "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
//     //                 images: [
//     //                     "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
//     //                 ],
//     //                 slug: "Non-Veg-Kit",
//     //                 status: PRODUCT_STATUS.ACTIVE,
//     //                 type: PRODUCTS_TYPE.RETORT,
//     //                 tax_rate_id: 1,
//     //                 vendorId: 1,
//     //                 updatedBy: null,
//     //                 deletedBy: null,
//     //                 createdAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 updatedAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 deletedAt: null,
//     //                 createdBy: 1,
//     //                 variations: [
//     //                     {
//     //                         id: 4,
//     //                         option_value: {
//     //                             id: 2,
//     //                             name: "Large",
//     //                             options: {
//     //                                 id: 2,
//     //                                 name: "Size",
//     //                             },
//     //                         },
//     //                         price: 999,
//     //                         stock: 12,
//     //                         status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                         images: "",
//     //                     },
//     //                 ],
//     //             },
//     //             productOption: {
//     //                 id: 2,
//     //                 option_value: undefined,
//     //                 price: 0,
//     //                 stock: 0,
//     //                 status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                 images: "",
//     //             },
//     //             quantity: 1,
//     //             total_price: 999,
//     //             totalTax: 179.82,
//     //             prices: {
//     //                 "base-price": {
//     //                     type: PRICE_COMP_TYPE_CART.BASE_PRICE,
//     //                     percent: 18,
//     //                     value: 999,
//     //                     tax: 179.82,
//     //                     taxPercent: 0,
//     //                     calc: VALUE_TYPE.ABSOLUTE,
//     //                 },
//     //             },
//     //             disc: {},
//     //             type: ORDER_ITEM_TYPE.RETORT,
//     //             totalDiscount: 0,
//     //         },
//     //         {
//     //             id: 5,
//     //             product: {
//     //                 id: 3,
//     //                 name: "Non Veg Kit ",
//     //                 MOQ: 1,
//     //                 category: {
//     //                     id: 3,
//     //                     name: "Non Veg Kit",
//     //                     slug: "Non-Veg-Kit",
//     //                     description: "Non-Veg-Kit",
//     //                     status: PRODUCT_STATUS.ACTIVE,
//     //                     type: CATEGORY_TYPE.SAMPLE_KIT,
//     //                 },
//     //                 description:
//     //                     "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
//     //                 images: [
//     //                     "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
//     //                 ],
//     //                 slug: "Non-Veg-Kit",
//     //                 status: PRODUCT_STATUS.ACTIVE,
//     //                 type: PRODUCTS_TYPE.RETORT,
//     //                 tax_rate_id: 1,
//     //                 vendorId: 1,
//     //                 updatedBy: null,
//     //                 deletedBy: null,
//     //                 createdAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 updatedAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 deletedAt: null,
//     //                 createdBy: 1,
//     //                 variations: [
//     //                     {
//     //                         id: 4,
//     //                         option_value: {
//     //                             id: 2,
//     //                             name: "Large",
//     //                             options: {
//     //                                 id: 2,
//     //                                 name: "Size",
//     //                             },
//     //                         },
//     //                         price: 999,
//     //                         stock: 12,
//     //                         status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                         images: "",
//     //                     },
//     //                 ],
//     //             },
//     //             productOption: {
//     //                 id: 2,
//     //                 option_value: undefined,
//     //                 price: 0,
//     //                 stock: 0,
//     //                 status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                 images: "",
//     //             },
//     //             quantity: 1,
//     //             total_price: 999,
//     //             totalTax: 179.82,
//     //             prices: {
//     //                 "base-price": {
//     //                     type: PRICE_COMP_TYPE_CART.BASE_PRICE,
//     //                     percent: 18,
//     //                     value: 999,
//     //                     tax: 179.82,
//     //                     taxPercent: 0,
//     //                     calc: VALUE_TYPE.ABSOLUTE,
//     //                 },
//     //             },
//     //             disc: {},
//     //             type: ORDER_ITEM_TYPE.RETORT,
//     //             totalDiscount: 0,
//     //         },
//     //         {
//     //             id: 5,
//     //             product: {
//     //                 id: 3,
//     //                 name: "Non Veg Kit ",
//     //                 MOQ: 1,
//     //                 category: {
//     //                     id: 3,
//     //                     name: "Non Veg Kit",
//     //                     slug: "Non-Veg-Kit",
//     //                     description: "Non-Veg-Kit",
//     //                     status: PRODUCT_STATUS.ACTIVE,
//     //                     type: CATEGORY_TYPE.SAMPLE_KIT,
//     //                 },
//     //                 description:
//     //                     "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
//     //                 images: [
//     //                     "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
//     //                 ],
//     //                 slug: "Non-Veg-Kit",
//     //                 status: PRODUCT_STATUS.ACTIVE,
//     //                 type: PRODUCTS_TYPE.RETORT,
//     //                 tax_rate_id: 1,
//     //                 vendorId: 1,
//     //                 updatedBy: null,
//     //                 deletedBy: null,
//     //                 createdAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 updatedAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 deletedAt: null,
//     //                 createdBy: 1,
//     //                 variations: [
//     //                     {
//     //                         id: 4,
//     //                         option_value: {
//     //                             id: 2,
//     //                             name: "Large",
//     //                             options: {
//     //                                 id: 2,
//     //                                 name: "Size",
//     //                             },
//     //                         },
//     //                         price: 999,
//     //                         stock: 12,
//     //                         status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                         images: "",
//     //                     },
//     //                 ],
//     //             },
//     //             productOption: {
//     //                 id: 2,
//     //                 option_value: undefined,
//     //                 price: 0,
//     //                 stock: 0,
//     //                 status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                 images: "",
//     //             },
//     //             quantity: 1,
//     //             total_price: 999,
//     //             totalTax: 179.82,
//     //             prices: {
//     //                 "base-price": {
//     //                     type: PRICE_COMP_TYPE_CART.BASE_PRICE,
//     //                     percent: 18,
//     //                     value: 999,
//     //                     tax: 179.82,
//     //                     taxPercent: 0,
//     //                     calc: VALUE_TYPE.ABSOLUTE,
//     //                 },
//     //             },
//     //             disc: {},
//     //             type: ORDER_ITEM_TYPE.RETORT,
//     //             totalDiscount: 0,
//     //         },
//     //         {
//     //             id: 5,
//     //             product: {
//     //                 id: 3,
//     //                 name: "Non Veg Kit ",
//     //                 MOQ: 1,
//     //                 category: {
//     //                     id: 3,
//     //                     name: "Non Veg Kit",
//     //                     slug: "Non-Veg-Kit",
//     //                     description: "Non-Veg-Kit",
//     //                     status: PRODUCT_STATUS.ACTIVE,
//     //                     type: CATEGORY_TYPE.SAMPLE_KIT,
//     //                 },
//     //                 description:
//     //                     "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
//     //                 images: [
//     //                     "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
//     //                 ],
//     //                 slug: "Non-Veg-Kit",
//     //                 status: PRODUCT_STATUS.ACTIVE,
//     //                 type: PRODUCTS_TYPE.RETORT,
//     //                 tax_rate_id: 1,
//     //                 vendorId: 1,
//     //                 updatedBy: null,
//     //                 deletedBy: null,
//     //                 createdAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 updatedAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 deletedAt: null,
//     //                 createdBy: 1,
//     //                 variations: [
//     //                     {
//     //                         id: 4,
//     //                         option_value: {
//     //                             id: 2,
//     //                             name: "Large",
//     //                             options: {
//     //                                 id: 2,
//     //                                 name: "Size",
//     //                             },
//     //                         },
//     //                         price: 999,
//     //                         stock: 12,
//     //                         status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                         images: "",
//     //                     },
//     //                 ],
//     //             },
//     //             productOption: {
//     //                 id: 2,
//     //                 option_value: undefined,
//     //                 price: 0,
//     //                 stock: 0,
//     //                 status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                 images: "",
//     //             },
//     //             quantity: 1,
//     //             total_price: 999,
//     //             totalTax: 179.82,
//     //             prices: {
//     //                 "base-price": {
//     //                     type: PRICE_COMP_TYPE_CART.BASE_PRICE,
//     //                     percent: 18,
//     //                     value: 999,
//     //                     tax: 179.82,
//     //                     taxPercent: 0,
//     //                     calc: VALUE_TYPE.ABSOLUTE,
//     //                 },
//     //             },
//     //             disc: {},
//     //             type: ORDER_ITEM_TYPE.RETORT,
//     //             totalDiscount: 0,
//     //         },
//     //         {
//     //             id: 5,
//     //             product: {
//     //                 id: 3,
//     //                 name: "Non Veg Kit ",
//     //                 MOQ: 1,
//     //                 category: {
//     //                     id: 3,
//     //                     name: "Non Veg Kit",
//     //                     slug: "Non-Veg-Kit",
//     //                     description: "Non-Veg-Kit",
//     //                     status: PRODUCT_STATUS.ACTIVE,
//     //                     type: CATEGORY_TYPE.SAMPLE_KIT,
//     //                 },
//     //                 description:
//     //                     "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
//     //                 images: [
//     //                     "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
//     //                 ],
//     //                 slug: "Non-Veg-Kit",
//     //                 status: PRODUCT_STATUS.ACTIVE,
//     //                 type: PRODUCTS_TYPE.RETORT,
//     //                 tax_rate_id: 1,
//     //                 vendorId: 1,
//     //                 updatedBy: null,
//     //                 deletedBy: null,
//     //                 createdAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 updatedAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 deletedAt: null,
//     //                 createdBy: 1,
//     //                 variations: [
//     //                     {
//     //                         id: 4,
//     //                         option_value: {
//     //                             id: 2,
//     //                             name: "Large",
//     //                             options: {
//     //                                 id: 2,
//     //                                 name: "Size",
//     //                             },
//     //                         },
//     //                         price: 999,
//     //                         stock: 12,
//     //                         status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                         images: "",
//     //                     },
//     //                 ],
//     //             },
//     //             productOption: {
//     //                 id: 2,
//     //                 option_value: undefined,
//     //                 price: 0,
//     //                 stock: 0,
//     //                 status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                 images: "",
//     //             },
//     //             quantity: 1,
//     //             total_price: 999,
//     //             totalTax: 179.82,
//     //             prices: {
//     //                 "base-price": {
//     //                     type: PRICE_COMP_TYPE_CART.BASE_PRICE,
//     //                     percent: 18,
//     //                     value: 999,
//     //                     tax: 179.82,
//     //                     taxPercent: 0,
//     //                     calc: VALUE_TYPE.ABSOLUTE,
//     //                 },
//     //             },
//     //             disc: {},
//     //             type: ORDER_ITEM_TYPE.RETORT,
//     //             totalDiscount: 0,
//     //         },
//     //         {
//     //             id: 5,
//     //             product: {
//     //                 id: 3,
//     //                 name: "Non Veg Kit ",
//     //                 MOQ: 1,
//     //                 category: {
//     //                     id: 3,
//     //                     name: "Non Veg Kit",
//     //                     slug: "Non-Veg-Kit",
//     //                     description: "Non-Veg-Kit",
//     //                     status: PRODUCT_STATUS.ACTIVE,
//     //                     type: CATEGORY_TYPE.SAMPLE_KIT,
//     //                 },
//     //                 description:
//     //                     "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
//     //                 images: [
//     //                     "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
//     //                 ],
//     //                 slug: "Non-Veg-Kit",
//     //                 status: PRODUCT_STATUS.ACTIVE,
//     //                 type: PRODUCTS_TYPE.RETORT,
//     //                 tax_rate_id: 1,
//     //                 vendorId: 1,
//     //                 updatedBy: null,
//     //                 deletedBy: null,
//     //                 createdAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 updatedAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 deletedAt: null,
//     //                 createdBy: 1,
//     //                 variations: [
//     //                     {
//     //                         id: 4,
//     //                         option_value: {
//     //                             id: 2,
//     //                             name: "Large",
//     //                             options: {
//     //                                 id: 2,
//     //                                 name: "Size",
//     //                             },
//     //                         },
//     //                         price: 999,
//     //                         stock: 12,
//     //                         status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                         images: "",
//     //                     },
//     //                 ],
//     //             },
//     //             productOption: {
//     //                 id: 2,
//     //                 option_value: undefined,
//     //                 price: 0,
//     //                 stock: 0,
//     //                 status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                 images: "",
//     //             },
//     //             quantity: 1,
//     //             total_price: 999,
//     //             totalTax: 179.82,
//     //             prices: {
//     //                 "base-price": {
//     //                     type: PRICE_COMP_TYPE_CART.BASE_PRICE,
//     //                     percent: 18,
//     //                     value: 999,
//     //                     tax: 179.82,
//     //                     taxPercent: 0,
//     //                     calc: VALUE_TYPE.ABSOLUTE,
//     //                 },
//     //             },
//     //             disc: {},
//     //             type: ORDER_ITEM_TYPE.RETORT,
//     //             totalDiscount: 0,
//     //         },
//     //         {
//     //             id: 5,
//     //             product: {
//     //                 id: 3,
//     //                 name: "Non Veg Kit ",
//     //                 MOQ: 1,
//     //                 category: {
//     //                     id: 3,
//     //                     name: "Non Veg Kit",
//     //                     slug: "Non-Veg-Kit",
//     //                     description: "Non-Veg-Kit",
//     //                     status: PRODUCT_STATUS.ACTIVE,
//     //                     type: CATEGORY_TYPE.SAMPLE_KIT,
//     //                 },
//     //                 description:
//     //                     "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
//     //                 images: [
//     //                     "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
//     //                 ],
//     //                 slug: "Non-Veg-Kit",
//     //                 status: PRODUCT_STATUS.ACTIVE,
//     //                 type: PRODUCTS_TYPE.RETORT,
//     //                 tax_rate_id: 1,
//     //                 vendorId: 1,
//     //                 updatedBy: null,
//     //                 deletedBy: null,
//     //                 createdAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 updatedAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 deletedAt: null,
//     //                 createdBy: 1,
//     //                 variations: [
//     //                     {
//     //                         id: 4,
//     //                         option_value: {
//     //                             id: 2,
//     //                             name: "Large",
//     //                             options: {
//     //                                 id: 2,
//     //                                 name: "Size",
//     //                             },
//     //                         },
//     //                         price: 999,
//     //                         stock: 12,
//     //                         status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                         images: "",
//     //                     },
//     //                 ],
//     //             },
//     //             productOption: {
//     //                 id: 2,
//     //                 option_value: undefined,
//     //                 price: 0,
//     //                 stock: 0,
//     //                 status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                 images: "",
//     //             },
//     //             quantity: 1,
//     //             total_price: 999,
//     //             totalTax: 179.82,
//     //             prices: {
//     //                 "base-price": {
//     //                     type: PRICE_COMP_TYPE_CART.BASE_PRICE,
//     //                     percent: 18,
//     //                     value: 999,
//     //                     tax: 179.82,
//     //                     taxPercent: 0,
//     //                     calc: VALUE_TYPE.ABSOLUTE,
//     //                 },
//     //             },
//     //             disc: {},
//     //             type: ORDER_ITEM_TYPE.RETORT,
//     //             totalDiscount: 0,
//     //         },
//     //         {
//     //             id: 5,
//     //             product: {
//     //                 id: 3,
//     //                 name: "Non Veg Kit ",
//     //                 MOQ: 1,
//     //                 category: {
//     //                     id: 3,
//     //                     name: "Non Veg Kit",
//     //                     slug: "Non-Veg-Kit",
//     //                     description: "Non-Veg-Kit",
//     //                     status: PRODUCT_STATUS.ACTIVE,
//     //                     type: CATEGORY_TYPE.SAMPLE_KIT,
//     //                 },
//     //                 description:
//     //                     "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
//     //                 images: [
//     //                     "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
//     //                 ],
//     //                 slug: "Non-Veg-Kit",
//     //                 status: PRODUCT_STATUS.ACTIVE,
//     //                 type: PRODUCTS_TYPE.RETORT,
//     //                 tax_rate_id: 1,
//     //                 vendorId: 1,
//     //                 updatedBy: null,
//     //                 deletedBy: null,
//     //                 createdAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 updatedAt: new Date("2025-01-18T07:06:05.961Z"),
//     //                 deletedAt: null,
//     //                 createdBy: 1,
//     //                 variations: [
//     //                     {
//     //                         id: 4,
//     //                         option_value: {
//     //                             id: 2,
//     //                             name: "Large",
//     //                             options: {
//     //                                 id: 2,
//     //                                 name: "Size",
//     //                             },
//     //                         },
//     //                         price: 999,
//     //                         stock: 12,
//     //                         status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                         images: "",
//     //                     },
//     //                 ],
//     //             },
//     //             productOption: {
//     //                 id: 2,
//     //                 option_value: undefined,
//     //                 price: 0,
//     //                 stock: 0,
//     //                 status: PRODUCT_OPTIONS_STATUS.ACTIVE,
//     //                 images: "",
//     //             },
//     //             quantity: 1,
//     //             total_price: 999,
//     //             totalTax: 179.82,
//     //             prices: {
//     //                 "base-price": {
//     //                     type: PRICE_COMP_TYPE_CART.BASE_PRICE,
//     //                     percent: 18,
//     //                     value: 999,
//     //                     tax: 179.82,
//     //                     taxPercent: 0,
//     //                     calc: VALUE_TYPE.ABSOLUTE,
//     //                 },
//     //             },
//     //             disc: {},
//     //             type: ORDER_ITEM_TYPE.RETORT,
//     //             totalDiscount: 0,
//     //         },
//     //     ],
//     //     updatedBy: {
//     //         email: "",
//     //         firstName: "",
//     //         id: 0,
//     //         lastName: "",
//     //     },
//     //     deletedBy: {
//     //         email: "",
//     //         firstName: "",
//     //         id: 0,
//     //         lastName: "",
//     //     },
//     //     createdAt: new Date("2025-01-18T07:59:14.439Z"),
//     //     updatedAt: null,
//     //     deletedAt: null,
//     //     notes: [],
//     //     orderItems: [],
//     //     couponCodes: [""],
//     //     discount: {},
//     //     price: {
//     //         "base-price": {
//     //             taxPercent: 0,
//     //             value: 2997,
//     //             tax: 539.46,
//     //             percent: 0,
//     //             type: PRICE_COMP_TYPE_CART.BASE_PRICE,
//     //             calc: VALUE_TYPE.ABSOLUTE,
//     //         },
//     //     },
//     //     createdBy: 0,
//     //     orderType: ORDER_TYPE.RM_ORDER,
//     //     franchise: undefined,
//     // };
//     // const content = await invoice(order!);
//     // let data;
//     // if (content) {
//     //     data = await saveBuffersAsPDF(content);
//     //     res.json("Success");
//     // }
//     // const data = await invoice(order!)
//     let obj = new LeadToProspectMail()
//     const dto = await obj.getPayload(
//         {},
//         "harshdalal.techinject@gmail.com",
//     );
//     const resp = await sendMail(dto);
    
//     res.json(resp);
// });
//
server.get("/", async (_, res) => {
    const resp = await RepoProvider.orderRepo.getAllOrders(100, 100, "", {});
    res.send(resp);
});
server.use("/api", router);

const PORT = CONFIG.PORT;
try {
    server.listen(PORT, () =>
        console.log(`Server is live at localhost:${PORT}`),
    );
    swaggerDocs(server, PORT);
} catch (error) {
    console.log("Cannot connect to the server");
}
