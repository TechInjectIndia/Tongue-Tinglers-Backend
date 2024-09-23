import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation schema for creating a tag
const createTagBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Tag name is required.'
        }),
    description: Joi.string(),
    active: Joi.number().required()
        .messages({
            'any.required': 'Active status is required.'
        }),
});

// Validation schema for editing a tag
const editTagBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Tag name is required.'
        }),
    description: Joi.string(),
    active: Joi.number().required()
        .messages({
            'any.required': 'Active status is required.'
        }),
});

// Validation schema for editing tag parameters
const editTagParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Tag ID is required.'
        }),
});

// Validation schema for listing tags
const listTagQuery = Joi.object().keys({
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

// Validation schema for editing multiple IDs
const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required()
        .messages({
            'array.min': 'At least one ID is required.',
            'any.required': 'IDs are required.'
        }),
});

// Middleware for validating create tag body
export const validateCreateTagBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createTagBody, "body");

// Middleware for validating edit tag body
export const validateEditTagBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editTagBody, "body");

// Middleware for validating edit tag parameters
export const validateEditTagParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editTagParams, "params");

// Middleware for validating list tag query
export const validateListTagQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listTagQuery, "query");

// Middleware for validating edit multiple IDs body
export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
