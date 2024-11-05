import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { PRODUCTS_TYPE } from '../../../interfaces/products';

// Validation schema for assigning a category
const assignCategoryBodySchema = Joi.object({
    productId: Joi.number().required().messages({
        'any.required': 'Product ID is required.'
    }),
    categoryId: Joi.number().required().messages({
        'any.required': 'Category ID is required.'
    }),
});

// Validation schema for creating products
const createProductBodySchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Product name is required.',
    }),
    slug: Joi.string().optional().allow("").messages({
        'string.base': 'Slug must be a string.',
    }),
    description: Joi.string().optional().allow("").messages({
        'string.base': 'Description must be a string.',
    }),
    type: Joi.string().valid(...Object.values(PRODUCTS_TYPE)).required().messages({
        'any.required': 'Product type is required.',
        'any.only': `Type must be one of ${Object.values(PRODUCTS_TYPE).join(", ")}.`,
    }),
    price: Joi.number().required().greater(0).messages({
        'any.required': 'Price is required.',
        'number.base': 'Price must be a valid number.',
        'number.greater': 'Price must be greater than 0.',
    }),
    total_ratings: Joi.number().integer().optional().allow(0).messages({
        'number.base': 'Total ratings must be a valid integer.',
    }),
    ratings: Joi.number().integer().optional().allow(0).messages({
        'number.base': 'Ratings must be a valid integer.',
    }),
    discount: Joi.number().optional().min(0).max(100).messages({
        'number.base': 'Discount must be a valid number.',
        'number.min': 'Discount cannot be negative.',
        'number.max': 'Discount cannot exceed 100.',
    }),
    stock: Joi.number().integer().required().greater(-1).messages({
        'any.required': 'Stock is required.',
        'number.base': 'Stock must be a valid integer.',
        'number.greater': 'Stock cannot be negative.',
    }),
    sold: Joi.number().integer().optional().allow(0).messages({
        'number.base': 'Sold quantity must be a valid integer.',
    }),
    active: Joi.boolean().required().messages({
        'any.required': 'Active status is required.',
        'boolean.base': 'Active status must be either true or false.',
    }),
});

// Validation schema for editing products
const editProductBodySchema = createProductBodySchema;

// Validation schema for editing product parameters
const editProductParamsSchema = Joi.object({
    id: Joi.number().required().messages({
        'any.required': 'Product ID is required.',
    }),
});

// Validation schema for listing products
const listProductsQuerySchema = Joi.object({
    size: Joi.number().required().messages({
        'any.required': 'Size is required.',
    }),
    skip: Joi.number().required().messages({
        'any.required': 'Skip is required.',
    }),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

// Validation schema for editing multiple product IDs
const editMultipleIdsBodySchema = Joi.object({
    ids: Joi.array().min(1).required().messages({
        'array.min': 'At least one ID is required.',
        'any.required': 'IDs are required.'
    }),
});

// Middleware for validating assign category body
export const validateAssignCategoryBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, assignCategoryBodySchema, "body");

// Middleware for validating create products body
export const validateCreateProductsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createProductBodySchema, "body");

// Middleware for validating edit products body
export const validateEditProductsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editProductBodySchema, "body");

// Middleware for validating edit products parameters
export const validateEditProductsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editProductParamsSchema, "params");

// Middleware for validating list products query
export const validateListProductsQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listProductsQuerySchema, "query");

// Middleware for validating edit multiple product IDs body
export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBodySchema, "body");
