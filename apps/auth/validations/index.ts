import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const loginBody = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required(),
});

export const validateLoginBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, loginBody, "body");

const changePasswordBody = Joi.object().keys({
    old_password: Joi.string().required(),
    new_password: Joi.string().required(),
});

export const validateChangePasswordBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, changePasswordBody, "body");

const tokenBody = Joi.object().keys({
    token: Joi.string().required(),
});

export const validateTokenBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, tokenBody, "body");

const createPasswordBody = Joi.object().keys({
    token: Joi.string().required(),
    new_password: Joi.string()
        .min(6) // Minimum length
        .max(30) // Maximum length
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+={}:;"\'<>,.?/`~ -]*$')) // Allowed characters
        .messages({
            "string.min": "Password must be at least 6 characters long.",
            "string.max": "Password must be at most 30 characters long.",
            "string.pattern.base": "Password must contain only alphanumeric and special characters."
        }),
});

export const validateCreatePasswordBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createPasswordBody, "body");




const changeFirebasePasswordBody = Joi.object().keys({
    new_password: Joi.string().required(),
});

export const validateChangeFirebasePasswordBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, changeFirebasePasswordBody, "body");