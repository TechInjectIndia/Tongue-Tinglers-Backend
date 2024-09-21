import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { MENU_CATEGORY_STATUS } from '../../../interfaces';

// Validation for creating menu categories
const createMenuCategoryBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Category name is required.'
        }),
    image: Joi.string().required()
        .messages({
            'any.required': 'Category image is required.'
        }),
    status: Joi.string().valid(...Object.values(MENU_CATEGORY_STATUS)).optional().allow(''),
});

// Validation for editing menu categories
const editMenuCategoryBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Category name is required.'
        }),
    image: Joi.string().required()
        .messages({
            'any.required': 'Category image is required.'
        }),
    status: Joi.string().valid(...Object.values(MENU_CATEGORY_STATUS)).optional().allow(''),
});

// Validation for editing menu category parameters
const editMenuCategoryParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Menu category ID is required.'
        }),
});

// Validation for listing menu categories
const listMenuCategoryQuery = Joi.object().keys({
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

// Validation for editing multiple menu categories
const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required()
        .messages({
            'array.min': 'At least one ID is required.',
            'any.required': 'IDs are required.'
        }),
});

// Middleware functions
export const validateCreateMenuCategoryBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createMenuCategoryBody, "body");

export const validateEditMenuCategoryBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMenuCategoryBody, "body");

export const validateEditMenuCategoryParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMenuCategoryParams, "params");

export const validateListMenuCategoryQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listMenuCategoryQuery, "query");

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
