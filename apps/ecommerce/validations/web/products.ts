import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../../libraries";

// Validation schema for search products parameters
const searchProductsParams = Joi.object().keys({
    search: Joi.string().required()
        .messages({
            'any.required': 'Search query is required.'
        }),
});

// Validation schema for type products parameters
const typeProductsParams = Joi.object().keys({
    limit: Joi.number().required()
        .messages({
            'any.required': 'Limit is required.'
        }),
    type: Joi.string().required()
        .messages({
            'any.required': 'Product type is required.'
        }),
});

// Validation schema for single product parameters
const singleProductsParams = Joi.object().keys({
    slug: Joi.string().required()
        .messages({
            'any.required': 'Product slug is required.'
        }),
});

// Validation schema for listing products query
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

// Middleware function for validating search products parameters
export const validateSearchProductsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, searchProductsParams, "query");

// Middleware function for validating type products parameters
export const validateTypeProductsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, typeProductsParams, "query");

// Middleware function for validating single product parameters
export const validateSingleProductsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, singleProductsParams, "params");

// Middleware function for validating list products query
export const validateListProductsQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listProductsQuery, "query");
