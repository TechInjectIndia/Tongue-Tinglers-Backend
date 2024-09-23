import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries"; // Assuming this is a function that handles validation responses

// Joi schemas for validation
const referralCodeSchema = Joi.object({
    referral_code: Joi.string().alphanum().required().messages({
        'string.empty': 'Referral code is required',
        'string.alphanum': 'Referral code must be alphanumeric',
    }),
});

const validateSchema = Joi.object({
    referralCode: Joi.string().required().messages({
        'string.empty': 'Referral code is required',
    }),
});

// Middleware to validate getting referral by code
export const validateGetReferralByCode = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, referralCodeSchema, "params");

// Middleware to validate referral code
export const validateReferralCode = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, validateSchema, "body");
