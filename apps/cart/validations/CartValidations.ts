import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation for creating a cart
const createCartBody = Joi.object().keys({
    franchiseId: Joi.string().required()
        .messages({
            'any.required': 'Franchise ID is required.'
        }),
});

// Validation for updating cart items
const updateCartBody = Joi.object().keys({
    product_id: Joi.string().required()
        .messages({
            'any.required': 'Product ID is required.'
        }),
    quantity: Joi.number().integer().min(1).required()
        .messages({
            'number.base': 'Quantity must be a number.',
            'number.min': 'Quantity must be greater than 0.',
            'any.required': 'Quantity is required.'
        }),
    price: Joi.number().required()
        .messages({
            'number.base': 'Price must be a number.',
            'any.required': 'Price is required.'
        }),
});

// Validation for cart parameters
const cartParams = Joi.object().keys({
    cartId: Joi.string().required()
        .messages({
            'any.required': 'Cart ID is required.'
        }),
});

// Validation for listing carts
const listCartQuery = Joi.object().keys({
    size: Joi.number().integer().min(1).default(10)
        .messages({
            'number.base': 'Size must be a number.',
            'number.min': 'Size must be at least 1.',
            'any.required': 'Size is required.',
        }),
    skip: Joi.number().integer().min(0).default(0)
        .messages({
            'number.base': 'Skip must be a number.',
            'number.min': 'Skip must be 0 or greater.',
            'any.required': 'Skip is required.',
        }),
});

// Middleware functions for validations
export const validateCreateCartBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createCartBody, "body");

export const validateUpdateCartBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, updateCartBody, "body");

export const validateCartParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, cartParams, "params");

export const validateListCartQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listCartQuery, "query");
