import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const createProductOptionsSchema = Joi.object({
    product_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Product ID must be a number.',
            'number.positive': 'Product ID must be greater than 0.',
            'any.required': 'Product ID is required.',
        }),
    option_value_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Option Value ID must be a number.',
            'number.positive': 'Option Value ID must be greater than 0.',
            'any.required': 'Option Value ID is required.',
        }),
    price: Joi.number()
        .precision(2)
        .positive()
        .required()
        .messages({
            'number.base': 'Price must be a number.',
            'number.positive': 'Price must be greater than 0.',
            'any.required': 'Price is required.',
        }),
    stock: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Stock must be a number.',
            'number.positive': 'Stock must be greater than 0.',
            'any.required': 'Stock is required.',
        }),
    images: Joi.array()
        .items(Joi.string().uri())
        .required()
        .messages({
            'array.base': 'Images must be an array of valid URLs.',
            'string.uri': 'Each image must be a valid URL.',
        }),
});

const getProductOptionById = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'ID must be a number.',
            'number.positive': 'ID must be greater than 0.',
            'any.required': 'ID is required.',
        }),
})

const updateProductOptionsSchema = Joi.object({
    product_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Product ID must be a number.',
            'number.positive': 'Product ID must be greater than 0.',
            'any.required': 'Product ID is required.',
        }),
    option_value_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Option Value ID must be a number.',
            'number.positive': 'Option Value ID must be greater than 0.',
            'any.required': 'Option Value ID is required.',
        }),
    price: Joi.number()
        .precision(2)
        .positive()
        .required()
        .messages({
            'number.base': 'Price must be a number.',
            'number.positive': 'Price must be greater than 0.',
            'any.required': 'Price is required.',
        }),
    stock: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Stock must be a number.',
            'number.positive': 'Stock must be greater than 0.',
            'any.required': 'Stock is required.',
        }),
    images: Joi.array()
        .items(Joi.string().uri())
        .required()
        .messages({
            'array.base': 'Images must be an array of valid URLs.',
            'string.uri': 'Each image must be a valid URL.',
        }),
});

const updatePrice = Joi.object({
    price: Joi.number()
        .precision(2)
        .positive()
        .required()
        .messages({
            'number.base': 'Price must be a number.',
            'number.positive': 'Price must be greater than 0.',
            'any.required': 'Price is required.',
        }),
});

const updateStock = Joi.object({
    stock: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Stock must be a number.',
            'number.positive': 'Stock must be greater than 0.',
            'any.required': 'Stock is required.',
        }),
});

const updateStatus = Joi.object({
    status: Joi.string()
        .valid('active', 'inactive')
        .required()
        .messages({
            'any.only': 'Status must be one of [active, inactive].',
            'any.required': 'Status is required.',
        }),
});

export const validateCreateProductOptions = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createProductOptionsSchema, 'body');

export const validateGetProductOptionById = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, getProductOptionById, 'params');

export const validateUpdateProductOptions = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, updateProductOptionsSchema, 'body');

export const validateUpdatePrice = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, updatePrice, 'body');

export const validateUpdateStock = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, updateStock, 'body');

export const validateUpdateStatus = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, updateStatus, 'body');