import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const cartProductSchema = Joi.object({
    product_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Product ID must be a number.',
            'number.integer': 'Product ID must be an integer.',
            'number.positive': 'Product ID must be a positive number.',
            'any.required': 'Product ID is required.',
        }),
    product_option_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Product Option ID must be a number.',
            'number.integer': 'Product Option ID must be an integer.',
            'number.positive': 'Product Option ID must be a positive number.',
            'any.required': 'Product Option ID is required.',
        }),
    quantity: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Quantity must be a number.',
            'number.integer': 'Quantity must be an integer.',
            'number.positive': 'Quantity must be a positive number.',
            'any.required': 'Quantity is required.',
        }),
});

const createCartProductSchema = Joi.object({
    carts: Joi.array()
        .items(cartProductSchema)
        .required()
        .messages({
            'array.base': 'Cart products must be an array.',
            'any.required': 'Cart products are required.',
        }),
});

const updateCartProductQuantitySchema = Joi.object({
    id:Joi.number().allow(null),
    product_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Product ID must be a number.',
            'number.integer': 'Product ID must be an integer.',
            'number.positive': 'Product ID must be a positive number.',
            'any.required': 'Product ID is required.',
        }),
        product_option_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Product Option ID must be a number.',
            'number.integer': 'Product Option ID must be an integer.',
            'number.positive': 'Product Option ID must be a positive number.',
            'any.required': 'Product Option ID is required.',
        }),

    quantity: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Quantity must be a number.',
            'number.integer': 'Quantity must be an integer.',
            'number.positive': 'Quantity must be a positive number.',
            'any.required': 'Quantity is required.',
        }),
});

const deleteCartProductSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .messages({
            'number.base': 'ID must be a number.',
            'number.integer': 'ID must be an integer.',
            'number.positive': 'ID must be a positive number.',
        }),
});

export const validateCreateCartProduct = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createCartProductSchema, 'body');

export const validateUpdateQuantity = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, updateCartProductQuantitySchema, 'body');

export const validateDeleteCartProduct = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, deleteCartProductSchema, 'body');

