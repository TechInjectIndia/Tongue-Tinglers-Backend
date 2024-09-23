import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation schema for creating a subscriber
const createSubscriberBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Name is required.'
        }),
    email: Joi.string().email().required()
        .messages({
            'string.email': 'Email must be a valid email address.',
            'any.required': 'Email is required.'
        }),
    subscribedAt: Joi.string().required()
        .messages({
            'any.required': 'Subscribed date is required.'
        }),
});

// Validation schema for editing a subscriber
const editSubscriberBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Name is required.'
        }),
    email: Joi.string().email().required()
        .messages({
            'string.email': 'Email must be a valid email address.',
            'any.required': 'Email is required.'
        }),
    subscribedAt: Joi.string().required()
        .messages({
            'any.required': 'Subscribed date is required.'
        }),
});

// Validation schema for editing subscriber parameters
const editSubscriberParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Subscriber ID is required.'
        }),
});

// Validation schema for listing subscribers
const listSubscriberQuery = Joi.object().keys({
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

// Middleware for validating create subscriber body
export const validateCreateSubscriberBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createSubscriberBody, "body");

// Middleware for validating edit subscriber body
export const validateEditSubscriberBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editSubscriberBody, "body");

// Middleware for validating edit subscriber parameters
export const validateEditSubscriberParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editSubscriberParams, "params");

// Middleware for validating list subscriber query
export const validateListSubscriberQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listSubscriberQuery, "query");

// Middleware for validating edit multiple IDs body
export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
