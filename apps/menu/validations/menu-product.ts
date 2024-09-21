import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { MENU_PRODUCT_STATUS } from '../../../interfaces';

// Validation for creating menu products
const createMenuProductBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Product name is required.'
        }),
    slug: Joi.string().required()
        .messages({
            'any.required': 'Product slug is required.'
        }),
    description: Joi.string().required()
        .messages({
            'any.required': 'Product description is required.'
        }),
    price: Joi.number().required()
        .messages({
            'any.required': 'Product price is required.'
        }),
    images: Joi.string().required()
        .messages({
            'any.required': 'Product images are required.'
        }),
    active: Joi.string().valid(...Object.values(MENU_PRODUCT_STATUS)).optional().allow(''),
});

// Validation for editing menu products
const editMenuProductBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Product name is required.'
        }),
    slug: Joi.string().required()
        .messages({
            'any.required': 'Product slug is required.'
        }),
    description: Joi.string().required()
        .messages({
            'any.required': 'Product description is required.'
        }),
    price: Joi.number().required()
        .messages({
            'any.required': 'Product price is required.'
        }),
    images: Joi.string().required()
        .messages({
            'any.required': 'Product images are required.'
        }),
    active: Joi.string().valid(...Object.values(MENU_PRODUCT_STATUS)).optional().allow(''),
});

// Validation for editing menu product parameters
const editMenuProductParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Product ID is required.'
        }),
});

// Validation for listing menu products
const listMenuProductQuery = Joi.object().keys({
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

// Validation for editing multiple menu products
const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required()
        .messages({
            'array.min': 'At least one ID is required.',
            'any.required': 'IDs are required.'
        }),
});

// Middleware functions
export const validateCreateMenuProductBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createMenuProductBody, "body");

export const validateEditMenuProductBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMenuProductBody, "body");

export const validateEditMenuProductParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMenuProductParams, "params");

export const validateListMenuProductQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listMenuProductQuery, "query");

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
