import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation for editing profile body
const editProfileBody = Joi.object().keys({
    firstName: Joi.string().min(2).max(30).optional()
        .messages({
            'string.min': 'First name must be at least 2 characters long.',
            'string.max': 'First name must be less than 30 characters long.',
        }),
    lastName: Joi.string().min(2).max(30).optional()
        .messages({
            'string.min': 'Last name must be at least 2 characters long.',
            'string.max': 'Last name must be less than 30 characters long.',
        }),
    phoneNumber: Joi.string().min(10).required()
        .messages({
            'string.min': 'Password must be at least 10 characters long.',
            'any.required': 'Phone number is required.'
        }),
    profilePhoto: Joi.string().optional()
});

// Middleware functions for validations
export const validateEditProfileBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editProfileBody, "body");