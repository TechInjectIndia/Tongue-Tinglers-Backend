import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation for editing multiple IDs
const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required()
        .messages({
            'array.min': 'At least one ID is required.',
            'any.required': 'IDs are required.'
        }),
});

// Validation for creating a permission
const createPermissionBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Permission name is required.',
        }),
    description: Joi.string().required()
        .messages({
            'any.required': 'Description is required.',
        }),
    active: Joi.number().required()
        .messages({
            'number.base': 'Active must be a number.',
            'any.required': 'Active status is required.',
        }),
});

// Validation for editing a permission
const editPermissionBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Permission name is required.',
        }),
    description: Joi.string().required()
        .messages({
            'any.required': 'Description is required.',
        }),
    active: Joi.number().required()
        .messages({
            'number.base': 'Active must be a number.',
            'any.required': 'Active status is required.',
        }),
});

// Validation for editing permission parameters
const editPermissionParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Permission ID is required.',
        }),
});

// Validation for listing permissions
const listPermissionQuery = Joi.object().keys({
    size: Joi.number().required()
        .messages({
            'number.base': 'Size must be a number.',
            'any.required': 'Size is required.',
        }),
    skip: Joi.number().required()
        .messages({
            'number.base': 'Skip must be a number.',
            'any.required': 'Skip is required.',
        }),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

// Middleware functions for validations
export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

export const validateCreatePermissionBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createPermissionBody, "body");

export const validateEditPermissionBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editPermissionBody, "body");

export const validateEditPermissionParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editPermissionParams, "params");

export const validateListPermissionQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listPermissionQuery, "query");
