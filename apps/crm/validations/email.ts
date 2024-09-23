import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { EMAIL_STATUS } from '../../../interfaces/';

// Validation schema for creating an email
const createEmailBody = Joi.object().keys({
    campaignId: Joi.number().required()
        .messages({
            'any.required': 'Campaign ID is required.'
        }),
    subscriberId: Joi.number().required()
        .messages({
            'any.required': 'Subscriber ID is required.'
        }),
});

// Validation schema for editing an email
const editEmailBody = Joi.object().keys({
    campaignId: Joi.number().required()
        .messages({
            'any.required': 'Campaign ID is required.'
        }),
    subscriberId: Joi.number().required()
        .messages({
            'any.required': 'Subscriber ID is required.'
        }),
    status: Joi.string().valid(...Object.values(EMAIL_STATUS)).optional().allow('')
        .messages({
            'any.only': 'Status must be one of the predefined values.'
        }),
});

// Validation schema for editing email parameters
const editEmailParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Email ID is required.'
        }),
});

// Validation schema for listing emails
const listEmailQuery = Joi.object().keys({
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
            'array.min': 'At least one ID is required.'
        }),
});

// Middleware for validating create email body
export const validateCreateEmailBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createEmailBody, "body");

// Middleware for validating edit email body
export const validateEditEmailBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editEmailBody, "body");

// Middleware for validating edit email parameters
export const validateEditEmailParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editEmailParams, "params");

// Middleware for validating list email query
export const validateListEmailQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listEmailQuery, "query");

// Middleware for validating edit multiple IDs body
export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
