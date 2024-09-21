import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { MENU_CATEGORY_STATUS } from '../../../interfaces';

// Validation for creating menu category mapping
const createMenuCategoryMapBody = Joi.object().keys({
    menuId: Joi.number().required()
        .messages({
            'any.required': 'Menu ID is required.'
        }),
    categoryId: Joi.number().required()
        .messages({
            'any.required': 'Category ID is required.'
        }),
});

// Validation for editing menu category mapping
const editMenuCategoryMapBody = Joi.object().keys({
    menuId: Joi.number().required()
        .messages({
            'any.required': 'Menu ID is required.'
        }),
    categoryId: Joi.number().required()
        .messages({
            'any.required': 'Category ID is required.'
        }),
});

// Validation for editing menu category mapping parameters
const editMenuCategoryMapParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Menu Category Map ID is required.'
        }),
});

// Validation for listing menu category mappings
const listMenuCategoryMapQuery = Joi.object().keys({
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

// Validation for editing multiple menu category mappings
const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required()
        .messages({
            'array.min': 'At least one ID is required.',
            'any.required': 'IDs are required.'
        }),
});

// Middleware functions
export const validateCreateMenuCategoryMapBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createMenuCategoryMapBody, "body");

export const validateEditMenuCategoryMapBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMenuCategoryMapBody, "body");

export const validateEditMenuCategoryMapParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMenuCategoryMapParams, "params");

export const validateListMenuCategoryMapQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listMenuCategoryMapQuery, "query");

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
