import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const orderValidationSchema = Joi.object({
    order_items: Joi.array()
        .items(Joi.number().required())
        .required()
        .messages({
            "array.base": "Order items must be an array of numbers.",
            "array.includesRequiredUnknowns": "Each item in the order items must be a number.",
            "any.required": "Order items are required.",
        }),
    status: Joi.string()
        .required()
        .messages({
            "string.base": "Status must be a string.",
            "any.required": "Status is required.",
        }),
    item_count: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "Item count must be a number.",
            "any.required": "Item count is required.",
        }),
    total: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "Total must be a number.",
            "any.required": "Total is required.",
        }),
    total_tax: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "Total tax must be a number.",
            "any.required": "Total tax is required.",
        }),
    delivery_status: Joi.string()
        .required()
        .messages({
            "string.base": "Delivery status must be a string.",
            "any.required": "Delivery status is required.",
        }),
    customer_details: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "Customer details must be a number.",
            "any.required": "Customer details are required.",
        }),
    payment_type: Joi.string()
        .required()
        .messages({
            "string.base": "Payment type must be a string.",
            "any.required": "Payment type is required.",
        }),
    payment_id: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "Payment ID must be a number.",
            "any.required": "Payment ID is required.",
        }),
    cancelled_items: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "Cancelled items must be a number.",
            "any.required": "Cancelled items are required.",
        }),
    total_discount: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "Total discount must be a number.",
            "any.required": "Total discount is required.",
        }),
    delivery_details: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "Delivery details must be a number.",
            "any.required": "Delivery details are required.",
        }),
    total_shipping: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "Total shipping must be a number.",
            "any.required": "Total shipping is required.",
        }),
    anomalyArr: Joi.array()
        .items(Joi.number())
        .required()
        .messages({
            "array.base": "Anomaly array must be an array of numbers.",
            "any.required": "Anomaly array is required.",
        }),
    prices: Joi.string()
        .required()
        .messages({
            "string.base": "Prices must be a string.",
            "any.required": "Prices are required.",
        }),
    discount_prices: Joi.string()
        .required()
        .messages({
            "string.base": "Discount prices must be a string.",
            "any.required": "Discount prices are required.",
        }),
});

const getOrderByIdValidationSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Order ID must be a number.",
            "number.integer": "Order ID must be an integer.",
            "number.positive": "Order ID must be a positive number.",
            "any.required": "Order ID is required.",
        }),
});

const getAllOrdersValidationSchema = Joi.object({
    page: Joi.number()
        .integer()
        .positive()
        .default(1)
        .messages({
            "number.base": "Page must be a number.",
            "number.integer": "Page must be an integer.",
            "number.positive": "Page must be a positive number.",
        }),
    limit: Joi.number()
        .integer()
        .positive()
        .default(10)
        .messages({
            "number.base": "Limit must be a number.",
            "number.integer": "Limit must be an integer.",
            "number.positive": "Limit must be a positive number.",
        }),
    search: Joi.string()
        .optional()
        .allow("")
        .messages({
            "string.base": "Search must be a string.",
        }),
    filters: Joi.object()
        .optional()
        .messages({
            "object.base": "Filters must be an object.",
        }),
});

export const validateCreateOrder = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, orderValidationSchema, "body");

export const validateGetOrderById = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, getOrderByIdValidationSchema, "params");

export const validateGetAllOrder = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, getAllOrdersValidationSchema, "query");


  