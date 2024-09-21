import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { PRODUCTS_TYPE } from '../../../interfaces/products';

// Validation schema for assigning a category
const AssignCategoryBody = Joi.object().keys({
    productId: Joi.number().required()
        .messages({
            'any.required': 'Product ID is required.'
        }),
    categoryId: Joi.number().required()
        .messages({
            'any.required': 'Category ID is required.'
        }),
});

// Validation schema for creating products
const createProductsBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Product name is required.'
        }),
    description: Joi.string().required()
        .messages({
            'any.required': 'Description is required.'
        }),
    type: Joi.string().valid(...Object.values(PRODUCTS_TYPE)).optional().allow(''),
    price: Joi.number().required()
        .messages({
            'any.required': 'Price is required.'
        }),
    stock: Joi.number().required()
        .messages({
            'any.required': 'Stock is required.'
        }),
    active: Joi.number().required()
        .messages({
            'any.required': 'Active status is required.'
        }),
});

// Validation schema for editing products
const editProductsBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Product name is required.'
        }),
    description: Joi.string().required()
        .messages({
            'any.required': 'Description is required.'
        }),
    type: Joi.string().valid(...Object.values(PRODUCTS_TYPE)).optional().allow(''),
    price: Joi.number().required()
        .messages({
            'any.required': 'Price is required.'
        }),
    stock: Joi.number().required()
        .messages({
            'any.required': 'Stock is required.'
        }),
    active: Joi.number().required()
        .messages({
            'any.required': 'Active status is required.'
        }),
});

// Validation schema for editing product parameters
const editProductsParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Product ID is required.'
        }),
});

// Validation schema for listing products
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

// Validation schema for editing multiple product IDs
const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required()
        .messages({
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
