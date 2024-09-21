import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation schema for editing the profile
const editProfileBody = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
        .messages({
            'string.email': 'Email must be a valid email address.',
            'any.required': 'Email is required.'
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
});

// Middleware for validating edit profile body
export const validateEditProfileBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editProfileBody, "body");
