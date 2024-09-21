import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { P_CATEGORY_TYPE } from '../../../interfaces/product_category';

// Validation for creating a product category
const createProductCategoryBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Name is required.'
        }),
    description: Joi.string().optional(),
    active: Joi.string().valid(...Object.values(P_CATEGORY_TYPE)).optional().allow('')
        .messages({
            'any.only': `Active status must be one of: ${Object.values(P_CATEGORY_TYPE).join(', ')}.`
        }),
});

// Validation for editing a product category
const editProductCategoryBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Name is required.'
        }),
    description: Joi.string().optional(),
    active: Joi.string().valid(...Object.values(P_CATEGORY_TYPE)).optional().allow('')
        .messages({
            'any.only': `Active status must be one of: ${Object.values(P_CATEGORY_TYPE).join(', ')}.`
        }),
});

// Validation for editing product category parameters
const editProductCategoryParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Product category ID is required.'
        }),
});

// Validation for listing product categories
const listProductCategoryQuery = Joi.object().keys({
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

// Validation for editing multiple product categories
const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required()
        .messages({
            'array.min': 'At least one ID is required.',
            'any.required': 'IDs are required.'
        }),
});

// Middleware for creating product category validation
export const validateCreateProductCategoryBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createProductCategoryBody, "body");

// Middleware for editing product category validation
export const validateEditProductCategoryBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editProductCategoryBody, "body");

// Middleware for editing product category parameters validation
export const validateEditProductCategoryParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editProductCategoryParams, "params");

// Middleware for listing product categories validation
export const validateListProductCategoryQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listProductCategoryQuery, "query");

// Middleware for editing multiple product categories validation
export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
