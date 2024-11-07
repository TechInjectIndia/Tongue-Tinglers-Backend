import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

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

export const validateListCartQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listCartQuery, "query");


// Validation schema for adding a product to the cart
const addProductSchema = Joi.object({
    product_id: Joi.number().required().messages({
        'string.empty': 'Product ID is required',
        'any.required': 'Product ID is required',
    }),
    productType: Joi.string()
        .valid('retort', 'packaging')
        .required()
        .messages({
            'string.base': 'Product type must be a string.',
            'any.required': 'Product type is required.',
            'any.only': 'Product type must be either "retort" or "packaging".',
        }),
    quantity: Joi.number().integer().min(1).required().messages({
        'number.base': 'Quantity must be a number',
        'number.min': 'Quantity must be at least 1',
        'any.required': 'Quantity is required',
    }),
});

// Validation schema for removing a product from the cart
const removeProductSchema = Joi.object({
    product_id: Joi.number().required().messages({
        'string.empty': 'Product ID is required',
        'any.required': 'Product ID is required',
    }),
    productType: Joi.string()
        .valid('retort', 'packaging')
        .required()
        .messages({
            'string.base': 'Product type must be a string.',
            'any.required': 'Product type is required.',
            'any.only': 'Product type must be either "retort" or "packaging".',
        }),
});

// Validation schema for updating a product in the cart
const updateProductSchema = Joi.object({
    product_id: Joi.number().required().messages({
        'string.empty': 'Product ID is required',
        'any.required': 'Product ID is required',
    }),
    productType: Joi.string()
        .valid('retort', 'packaging')
        .required()
        .messages({
            'string.base': 'Product type must be a string.',
            'any.required': 'Product type is required.',
            'any.only': 'Product type must be either "retort" or "packaging".',
        }),
    quantity: Joi.number().integer().min(1).required().messages({
        'number.base': 'Quantity must be a number',
        'number.min': 'Quantity must be at least 1',
        'any.required': 'Quantity is required',
    }),
});

// Middleware to validate request body using Joi
const validateAddProduct = (req, res, next) => {
    const { error } = addProductSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const validateRemoveProduct = (req, res, next) => {
    const { error } = removeProductSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const validateUpdateProduct = (req, res, next) => {
    const { error } = updateProductSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

export { validateAddProduct, validateRemoveProduct, validateUpdateProduct };
