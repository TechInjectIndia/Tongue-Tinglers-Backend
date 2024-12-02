import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation schema for editing the profile
const editProfileBody = Joi.object().keys({
    firstName: Joi.string().required()
        .messages({
            'any.required': 'First name is required.'
        }),
    lastName: Joi.string().required()
        .messages({
            'any.required': 'Last name is required.'
        }),
    phoneNumber: Joi.string().required()
        .messages({
            'any.required': 'Phone number is required.'
        }),
    profilePhoto: Joi.string().optional()
});

// Middleware function for validating profile edit requests
export const validateEditProfileBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editProfileBody, "body");
