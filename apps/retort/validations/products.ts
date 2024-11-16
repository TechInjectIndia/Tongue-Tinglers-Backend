import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { PRODUCTS_TYPE } from '../../../interfaces/products';

// Validation for creating products
const createProductsBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Product name is required.'
        }),
    categories: Joi.array().items(Joi.number().required()).min(1).required().messages({
        'array.base': 'Categories must be an array of category IDs.',
        'array.min': 'At least one category is required.',
        'any.required': 'Categories are required.',
        'number.base': 'Each category ID must be a number.',
    }),
    description: Joi.string().required()
        .messages({
            'any.required': 'Product description is required.'
        }),
    type: Joi.string().valid(...Object.values(PRODUCTS_TYPE)).optional().allow(''),
    price: Joi.number().required()
        .messages({
            'any.required': 'Product price is required.'
        }),
    stock: Joi.number().required()
        .messages({
            'any.required': 'Product stock is required.'
        }),
    active: Joi.number().required()
        .messages({
            'any.required': 'Product active status is required.'
        }),
});

// Validation for editing products
const editProductsBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Product name is required.'
        }),
    categories: Joi.array().items(Joi.number().required()).min(1).required().messages({
        'array.base': 'Categories must be an array of category IDs.',
        'array.min': 'At least one category is required.',
        'any.required': 'Categories are required.',
        'number.base': 'Each category ID must be a number.',
    }),
    description: Joi.string().required()
        .messages({
            'any.required': 'Product description is required.'
        }),
    type: Joi.string().valid(...Object.values(PRODUCTS_TYPE)).optional().allow(''),
    price: Joi.number().required()
        .messages({
            'any.required': 'Product price is required.'
        }),
    stock: Joi.number().required()
        .messages({
            'any.required': 'Product stock is required.'
        }),
    active: Joi.number().required()
        .messages({
            'any.required': 'Product active status is required.'
        }),
});

// Validation for editing product parameters
const editProductsParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Product ID is required.'
        }),
});

// Validation for listing products
const listProductsQuery = Joi.object().keys({
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

// Validation for editing multiple products
const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required()
        .messages({
            'array.min': 'At least one ID is required.',
            'any.required': 'IDs are required.'
        }),
});

// Validation schema for assigning a category
const assignCategoryBodySchema = Joi.object({
    productId: Joi.number().required().messages({
        'any.required': 'Product ID is required.'
    }),
    categoryId: Joi.number().required().messages({
        'any.required': 'Category ID is required.'
    }),
});

// Middleware for validating assign category body
export const validateAssignCategoryBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, assignCategoryBodySchema, "body");

// Middleware for creating product validation
export const validateCreateProductsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createProductsBody, "body");

// Middleware for editing product validation
export const validateEditProductsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editProductsBody, "body");

// Middleware for editing product parameters validation
export const validateEditProductsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editProductsParams, "params");

// Middleware for listing products validation
export const validateListProductsQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listProductsQuery, "query");

// Middleware for editing multiple products validation
export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
