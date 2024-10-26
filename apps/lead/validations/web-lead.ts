import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation for creating a lead
const createLeadBody = Joi.object().keys({
    firstName: Joi.string().required()
        .messages({
            'any.required': 'First name is required.',
        }),
    lastName: Joi.string().required()
        .messages({
            'any.required': 'Last name is required.',
        }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
        .messages({
            'string.email': 'Please provide a valid email address.',
            'any.required': 'Email is required.',
        }),
    city: Joi.string().required()
        .messages({
            'any.required': 'City is required.',
        }),
    state: Joi.string().required()
        .messages({
            'any.required': 'State is required.',
        }),
    zip_code: Joi.string().required()
        .messages({
            'any.required': 'Zip code is required.',
        }),
    country: Joi.string().required()
        .messages({
            'any.required': 'Country is required.',
        }),
    phoneNumber: Joi.string().required()
        .messages({
            'any.required': 'Phone number is required.',
        }),
    address: Joi.string().required()
        .messages({
            'any.required': 'Address is required.',
        }),
    additional_info: Joi.string().required()
        .messages({
            'any.required': 'Additional information is required.',
        }),
});

const listLeadsQuery = Joi.object().keys({
    size: Joi.number().integer().optional()
        .messages({
            'number.base': 'Size must be a number.',
            'number.integer': 'Size must be an integer.',
            'number.min': 'Size must be at least 1.',
            'number.max': 'Size must not exceed 100.',
        }),
    skip: Joi.number().integer().optional()
        .messages({
            'number.base': 'Skip must be a number.',
            'number.integer': 'Skip must be an integer.',
            'number.min': 'Skip must be at least 0.',
        }),
    offset: Joi.number().integer().optional()
        .messages({
            'number.base': 'Offset must be a number.',
            'number.integer': 'Offset must be an integer.',
            'number.min': 'Offset must be at least 0.',
        }),
    search: Joi.string().optional()
        .messages({
            'string.empty': 'Search query cannot be empty.',
        }),
    sorting: Joi.string().optional()
        .valid('firstName DESC', 'lastName ASC', 'lastName DESC', 'createdAt ASC', 'createdAt DESC')
        .messages({
            'any.only': 'Invalid sorting criteria.',
        }),
    filter: Joi.string().optional()
        .valid("this_week", "last_week", "this_month", "last_month", "this_year", "last_year", "custom")
        .messages({
            'any.only': 'Invalid filter type.',
        }),
    startDate: Joi.string().optional().isoDate()
        .messages({
            'string.isoDate': 'Start date must be a valid ISO date.',
        }),
    endDate: Joi.string().optional().isoDate()
        .messages({
            'string.isoDate': 'End date must be a valid ISO date.',
        }),
});

// Middleware function for lead creation validation
export const validateListLeadsQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listLeadsQuery, "query");


// Middleware function for lead creation validation
export const validateCreateLeadBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createLeadBody, "body");
