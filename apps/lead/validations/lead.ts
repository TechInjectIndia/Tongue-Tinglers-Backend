import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { LEAD_STATUS } from '../../../interfaces/leads';

const FOLLOWED_DATE_SCHEMA = Joi.object().keys({
    date: Joi.date().iso().required()
        .messages({
            'any.required': 'Followed date is required.',
            'date.iso': 'Followed date must be in ISO format.',
        }),
    isFollowedUp: Joi.boolean().required()
        .messages({
            'any.required': 'Follow-up status is required.',
        }),
});

// Validation for converting lead parameters
const convertLeadParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Lead ID is required.',
        }),
});

// Validation for lead status body
const statusLeadBody = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Lead ID is required.',
        }),
});

// Validation for assigning lead
const assignLeadBody = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Lead ID is required.',
        }),
    assignedTo: Joi.number().required()
        .messages({
            'any.required': 'Assigned To ID is required.',
            'number.base': 'Assigned To ID must be a number.',
        }),
});

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
    zipCode: Joi.string().required()
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
    additionalInfo: Joi.string().required()
        .messages({
            'any.required': 'Additional info is required.',
        }),
    status: Joi.string().valid(...Object.values(LEAD_STATUS)).optional().allow('')
        .messages({
            'any.only': `Status must be one of: ${Object.values(LEAD_STATUS).join(', ')}.`,
        }),
    referby: Joi.string().allow('', null).optional()
});

// Validation for editing a lead body
const editLeadBody = Joi.object().keys({
    firstName: Joi.string().required()
        .messages({
            'any.required': 'First name is required.',
        }),
    lastName: Joi.string().required()
        .messages({
            'any.required': 'Last name is required.',
        }),
    city: Joi.string().required()
        .messages({
            'any.required': 'City is required.',
        }),
    state: Joi.string().required()
        .messages({
            'any.required': 'State is required.',
        }),
    zipCode: Joi.string().required()
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
    additionalInfo: Joi.string().required()
        .messages({
            'any.required': 'Additional info is required.',
        }),
    followedDate: Joi.array().items(FOLLOWED_DATE_SCHEMA).optional(),
    status: Joi.string().valid(...Object.values(LEAD_STATUS)).optional().allow('')
        .messages({
            'any.only': `Status must be one of: ${Object.values(LEAD_STATUS).join(', ')}.`,
        }),
});

// Validation for editing lead parameters
const editLeadParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Lead ID is required.',
        }),
});

// Validation for listing leads
const listLeadQuery = Joi.object().keys({
    size: Joi.number().required()
        .messages({
            'any.required': 'Size is required.',
            'number.base': 'Size must be a number.',
        }),
    skip: Joi.number().required()
        .messages({
            'any.required': 'Skip is required.',
            'number.base': 'Skip must be a number.',
        }),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

// Validation for editing multiple IDs
const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required()
        .messages({
            'array.min': 'At least one ID is required.',
            'any.required': 'IDs are required.',
        }),
});

// Middleware functions for validations
export const validateConvertLeadParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, convertLeadParams, "body");

export const validateLeadStatusBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, statusLeadBody, "body");

export const validateAssignLeadBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, assignLeadBody, "body");

export const validateCreateLeadBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createLeadBody, "body");

export const validateEditLeadBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editLeadBody, "body");

export const validateEditLeadParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editLeadParams, "params");

export const validateListLeadQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listLeadQuery, "query");

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
