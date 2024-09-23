import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation schema for creating an order
const createOrderBody = Joi.object().keys({
    trackingNumber: Joi.string().required()
        .messages({
            'any.required': 'Tracking number is required.'
        }),
    shippingAddress: Joi.string().required()
        .messages({
            'any.required': 'Shipping address is required.'
        }),
    totalPrice: Joi.number().required()
        .messages({
            'any.required': 'Total price is required.'
        }),
    cart_items: Joi.string().required()
        .messages({
            'any.required': 'Cart items are required.'
        }),
});

// Validation schema for editing an order
const editOrderBody = Joi.object().keys({
    user_id: Joi.string().required()
        .messages({
            'any.required': 'User ID is required.'
        }),
});

// Validation schema for editing order parameters
const editOrderParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Order ID is required.'
        }),
});

// Validation schema for listing orders
const listOrderQuery = Joi.object().keys({
    size: Joi.number().required()
        .messages({
            'any.required': 'Size is required.'
        }),
    skip: Joi.number().required()
        .messages({
            'any.required': 'Skip is required.'
        }),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

// Validation schema for editing multiple orders
const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required()
        .messages({
            'array.min': 'At least one ID is required.',
            'any.required': 'IDs are required.'
        }),
});

// Middleware for validating create order body
export const validateCreateOrderBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createOrderBody, "body");

// Middleware for validating edit order body
export const validateEditOrderBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editOrderBody, "body");

// Middleware for validating edit order parameters
export const validateEditOrderParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editOrderParams, "params");

// Middleware for validating list order query
export const validateListOrderQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listOrderQuery, "query");

// Middleware for validating edit multiple orders body
export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
