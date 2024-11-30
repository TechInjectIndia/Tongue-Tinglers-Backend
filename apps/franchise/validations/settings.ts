import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation schema for editing settings parameters
const editSettingsParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Settings ID is required.'
        }),
});

// Middleware function for validating edit settings parameters
export const validateEditSettingsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editSettingsParams, "params");

// Validation schema for editing settings body
const editSettingsBody = Joi.object().keys({
    email: Joi.string().email().required()
        .messages({
            'any.required': 'Email is required.',
            'string.email': 'Email must be a valid email address.'
        }),
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
    active: Joi.number().required()
        .messages({
            'any.required': 'Active status is required.'
        }),
});

// Middleware function for validating edit settings body
export const validateEditSettingsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editSettingsBody, "body");

// Validation schema for editing settings (minimal version)
const editSettingsSettingsBody = Joi.object().keys({
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
