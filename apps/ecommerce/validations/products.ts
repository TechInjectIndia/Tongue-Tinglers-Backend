import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { PRODUCTS_TYPE } from '../../../interfaces/products';

// Validation schema for assigning a category
const AssignCategoryBody = Joi.object({
    productId: Joi.number().required().messages({
        'any.required': 'Product ID is required.'
    }),
    categoryId: Joi.number().required().messages({
        'any.required': 'Category ID is required.'
    }),
});

// Validation schema for creating products with all fields from the interface
const createProductsBody = Joi.object({
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
    price: Joi.string().pattern(/^\d+(\.\d{1,2})?$/).required().messages({
        'any.required': 'Price is required.',
        'string.pattern.base': 'Price must be a valid number in string format.',
    }),
    stock: Joi.string().pattern(/^\d+$/).required().messages({
        'any.required': 'Stock is required.',
        'string.pattern.base': 'Stock must be a valid integer in string format.',
    }),
    discount: Joi.string().pattern(/^\d+(\.\d{1,2})?$/).required().messages({
        'any.required': 'Discount is required.',
        'string.pattern.base': 'Discount must be a valid number in string format.',
    }),
    sold: Joi.string().pattern(/^\d+$/).required().messages({
        'any.required': 'Sold quantity is required.',
        'string.pattern.base': 'Sold quantity must be a valid integer in string format.',
    }),
    active: Joi.number().integer().valid(0, 1).required().messages({
        'any.required': 'Active status is required.',
        'number.base': 'Active status must be a number.',
        'any.only': 'Active status must be either 0 (inactive) or 1 (active).',
    }),
});

// Validation schema for editing products
const editProductsBody = createProductsBody;

// Validation schema for editing product parameters
const editProductsParams = Joi.object({
    id: Joi.number().required().messages({
        'any.required': 'Product ID is required.',
    }),
});

// Validation schema for listing products
const listProductsQuery = Joi.object({
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
const editMultipleIdsBody = Joi.object({
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
) => validateReq(req, res, next, AssignCategoryBody, "body");

// Middleware for validating create products body
export const validateCreateProductsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createProductsBody, "body");

// Middleware for validating edit products body
export const validateEditProductsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editProductsBody, "body");

// Middleware for validating edit products parameters
export const validateEditProductsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editProductsParams, "params");

// Middleware for validating list products query
export const validateListProductsQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listProductsQuery, "query");

// Middleware for validating edit multiple product IDs body
export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
