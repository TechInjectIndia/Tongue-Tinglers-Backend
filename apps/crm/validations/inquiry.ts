import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { INQUIRY_TYPE } from '../../../interfaces/';

// Validation schema for creating an inquiry
const createInquiryBody = Joi.object().keys({
    email: Joi.string().required()
        .messages({
            'any.required': 'Email is required.'
        }),
    subject: Joi.string().required()
        .messages({
            'any.required': 'Subject is required.'
        }),
    message: Joi.string().required()
        .messages({
            'any.required': 'Message is required.'
        }),
    type: Joi.string().valid(...Object.values(INQUIRY_TYPE)).optional().allow('')
        .messages({
            'any.only': 'Type must be one of the predefined values.'
        }),
});

// Validation schema for editing an inquiry
const editInquiryBody = Joi.object().keys({
    email: Joi.string().required()
        .messages({
            'any.required': 'Email is required.'
        }),
    subject: Joi.string().required()
        .messages({
            'any.required': 'Subject is required.'
        }),
    message: Joi.string().required()
        .messages({
            'any.required': 'Message is required.'
        }),
    type: Joi.string().valid(...Object.values(INQUIRY_TYPE)).optional().allow('')
        .messages({
            'any.only': 'Type must be one of the predefined values.'
        }),
});

// Validation schema for editing inquiry parameters
const editInquiryParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Inquiry ID is required.'
        }),
});

// Validation schema for listing inquiries
const listInquiryQuery = Joi.object().keys({
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

// Middleware for validating create inquiry body
export const validateCreateInquiryBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createInquiryBody, "body");

// Middleware for validating edit inquiry body
export const validateEditInquiryBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editInquiryBody, "body");

// Middleware for validating edit inquiry parameters
export const validateEditInquiryParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editInquiryParams, "params");

// Middleware for validating list inquiry query
export const validateListInquiryQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listInquiryQuery, "query");

// Middleware for validating edit multiple IDs body
export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
