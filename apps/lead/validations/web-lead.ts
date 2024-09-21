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

// Middleware function for lead creation validation
export const validateCreateLeadBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createLeadBody, "body");
