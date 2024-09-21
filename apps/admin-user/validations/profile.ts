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
    phoneNumber: Joi.string().pattern(/^\+\d{1,3}\d{9,}$/).optional()
        .messages({
            'string.pattern.base': 'Phone number must be in international format (e.g., +1234567890).',
        }),
    profilePhoto: Joi.string().uri().optional()
        .messages({
            'string.uri': 'Profile photo must be a valid URL.',
        }),
});

// Middleware functions for validations
export const validateEditProfileBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editProfileBody, "body");