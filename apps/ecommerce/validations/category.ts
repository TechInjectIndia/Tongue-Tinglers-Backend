import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { P_CATEGORY_TYPE } from '../../../interfaces/product_category';

// Validation schema for creating a product category
const createProductCategoryBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Name is required.'
        }),
    description: Joi.string().optional(),
    active: Joi.string().valid(...Object.values(P_CATEGORY_TYPE)).optional().allow(''),
});

// Validation schema for editing a product category
const editProductCategoryBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Name is required.'
        }),
    description: Joi.string().optional(),
    active: Joi.string().valid(...Object.values(P_CATEGORY_TYPE)).optional().allow(''),
});

// Validation schema for editing product category parameters
const editProductCategoryParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'ID is required.'
        }),
});

// Validation schema for listing product categories
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

// Validation schema for editing multiple product categories
const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required()
        .messages({
            'array.min': 'At least one ID is required.',
            'any.required': 'IDs are required.'
        }),
});

// Middleware for validating create product category body
export const validateCreateProductCategoryBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createProductCategoryBody, "body");

// Middleware for validating edit product category body
export const validateEditProductCategoryBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editProductCategoryBody, "body");

// Middleware for validating edit product category parameters
export const validateEditProductCategoryParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editProductCategoryParams, "params");

// Middleware for validating list product categories query
export const validateListProductCategoryQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listProductCategoryQuery, "query");

// Middleware for validating edit multiple product categories body
export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
