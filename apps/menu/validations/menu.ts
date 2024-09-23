import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { MENU_STATUS } from '../../../interfaces';

// Validation for creating a menu
const createMenuBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Menu name is required.'
        }),
    images: Joi.string().required()
        .messages({
            'any.required': 'Menu images are required.'
        }),
    status: Joi.string().valid(...Object.values(MENU_STATUS)).optional().allow(''),
});

// Validation for editing a menu
const editMenuBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Menu name is required.'
        }),
    images: Joi.string().required()
        .messages({
            'any.required': 'Menu images are required.'
        }),
    status: Joi.string().valid(...Object.values(MENU_STATUS)).optional().allow(''),
});

// Validation for editing menu parameters
const editMenuParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Menu ID is required.'
        }),
});

// Validation for listing menus
const listMenuQuery = Joi.object().keys({
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

// Validation for editing multiple menus
const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required()
        .messages({
            'array.min': 'At least one ID is required.',
            'any.required': 'IDs are required.'
        }),
});

// Middleware functions
export const validateCreateMenuBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createMenuBody, "body");

export const validateEditMenuBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMenuBody, "body");

export const validateEditMenuParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMenuParams, "params");

export const validateListMenuQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listMenuQuery, "query");

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
