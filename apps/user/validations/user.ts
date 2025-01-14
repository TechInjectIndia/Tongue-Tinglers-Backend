import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import {USER_STATUS, USER_TYPE} from "../interface/user";

// Validation for listing admins
const listAdminQuery = Joi.object().keys({
    size: Joi.number().integer().min(1).required()
        .messages({
            'number.base': 'Size must be a number.',
            'number.min': 'Size must be at least 1.',
            'any.required': 'Size is required.',
        }),
    skip: Joi.number().integer().min(0).required()
        .messages({
            'number.base': 'Skip must be a number.',
            'number.min': 'Skip must be 0 or greater.',
            'any.required': 'Skip is required.',
        }),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
    trashOnly: Joi.string().optional().allow("").valid("true", "")
        .messages({
            'any.only': 'trashOnly must be either "true" or empty.'
        }),
});

// Validation for creating an admin
const createAdminBody = Joi.object().keys({
    firstName: Joi.string().required()
        .messages({
            'any.required': 'First name is required.'
        }),
    lastName: Joi.string().required()
        .messages({
            'any.required': 'Last name is required.'
        }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
        .messages({
            'string.email': 'Please provide a valid email address.',
            'any.required': 'Email is required.'
        }),
    password: Joi.string().min(6).required()
        .messages({
            'string.min': 'Password must be at least 8 characters long.',
            'any.required': 'Password is required.'
        }),
    phoneNumber: Joi.string().pattern(/^\+\d{1,3}\d{9,}$/).required()
        .messages({
            'string.pattern.base': 'Phone number must be in international format (e.g., +1234567890).',
            'any.required': 'Phone number is required.'
        }),
    status: Joi.string().valid(...Object.values(USER_STATUS)).required()
        .messages({
            'any.only': `Status must be one of: ${Object.values(USER_STATUS).join(', ')}.`,
            'any.required': 'Status is required.'
        }),
    role: Joi.number().integer().required()
        .messages({
            'number.base': 'Role must be a number.',
            'any.required': 'Role is required.'
        }),
    type: Joi.string().required()
    .messages({
        'number.base': 'Type must be a string.',
        'any.required': 'Type is required.'
    }),
});

const createGuestBody = Joi.object().keys({
    firstName: Joi.string().required()
        .messages({
            'any.required': 'First name is required.'
        }),
    lastName: Joi.string().required()
        .messages({
            'any.required': 'Last name is required.'
        }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
        .messages({
            'string.email': 'Please provide a valid email address.',
            'any.required': 'Email is required.'
        }),
    password: Joi.string().min(6).required()
        .messages({
            'string.min': 'Password must be at least 8 characters long.',
            'any.required': 'Password is required.'
        }),
    phoneNumber: Joi.string().pattern(/^\+\d{1,3}\d{9,}$/).required()
        .messages({
            'string.pattern.base': 'Phone number must be in international format (e.g., +1234567890).',
            'any.required': 'Phone number is required.'
        }),
    status: Joi.string().valid(...Object.values(USER_STATUS)).required()
        .messages({
            'any.only': `Status must be one of: ${Object.values(USER_STATUS).join(', ')}.`,
            'any.required': 'Status is required.'
        }),
    role: Joi.number().integer().required()
        .messages({
            'number.base': 'Role must be a number.',
            'any.required': 'Role is required.'
        }),
    type: Joi.any()
});


// Validation for editing admin params
const editAdminParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Admin ID is required.'
        }),
});

// Validation for editing admin body
const editAdminBody = Joi.object().keys({
    firstName: Joi.string().required()
        .messages({
            'any.required': 'First name is required.'
        }),
    lastName: Joi.string().required()
        .messages({
            'any.required': 'Last name is required.'
        }),
    phoneNumber: Joi.string().pattern(/^\+\d{1,3}\d{9,}$/).required()
        .messages({
            'string.pattern.base': 'Phone number must be in international format (e.g., +1234567890).',
            'any.required': 'Phone number is required.'
        }),
    status: Joi.string().valid(...Object.values(USER_STATUS)).required()
        .messages({
            'any.only': `Status must be one of: ${Object.values(USER_STATUS).join(', ')}.`,
            'any.required': 'Status is required.'
        }),
    role: Joi.number().integer().required()
        .messages({
            'number.base': 'Role must be a number.',
            'any.required': 'Role is required.'
        }),
    type: Joi.string().required()
    .messages({
        'number.base': 'Type must be a string.',
        'any.required': 'Type is required.'
    }),
});

const updateType = Joi.object().keys({
    type: Joi.string().required()
    .messages({
        'number.base': 'Type must be a string.',
        'any.required': 'Type is required.'
    })
})

// Validation for editing admin profile
const editAdminProfileBody = Joi.object().keys({
    full_name: Joi.string().required()
        .messages({
            'any.required': 'Full name is required.'
        }),
    contact_number: Joi.string().required()
        .messages({
            'any.required': 'Contact number is required.'
        }),
    phone_code: Joi.string().required()
        .messages({
            'any.required': 'Phone code is required.'
        }),
    address: Joi.string().required()
        .messages({
            'any.required': 'Address is required.'
        }),
});

// Validation for editing multiple IDs
const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required()
        .messages({
            'array.min': 'At least one ID is required.',
            'any.required': 'IDs are required.'
        }),
});

// Middleware functions for validations
export const validateListAdminQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listAdminQuery, "query");

export const validateCreateAdminBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createAdminBody, "body");

export const validateGuestBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createGuestBody, "body");

export const validateEditAdminParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editAdminParams, "params");

export const validateEditAdminBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editAdminBody, "body");

export const validateUpdateType = async (
    req:Request,
    res:Response,
    next: NextFunction
) => validateReq(req, res, next, updateType, "body")

export const validateEditAdminProfileBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editAdminProfileBody, "body");

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
