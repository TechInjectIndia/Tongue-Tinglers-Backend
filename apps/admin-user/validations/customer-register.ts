import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation for creating an Customer
const createCustomerBody = Joi.object().keys({
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
    password: Joi.string().min(8).required()
        .messages({
            'string.min': 'Password must be at least 8 characters long.',
            'any.required': 'Password is required.'
        }),
    userName: Joi.string().required()
        .messages({
            'any.required': 'Username is required.'
        }),
    phoneNumber: Joi.string().pattern(/^\+\d{1,3}\d{9,}$/).required()
        .messages({
            'string.pattern.base': 'Phone number must be in international format (e.g., +1234567890).',
            'any.required': 'Phone number is required.'
        }),
});

export const validateCreateCustomerBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createCustomerBody, "body");