import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation for today follow-ups parameters
const todayFollowUpsParams = Joi.object().keys({
    start_date: Joi.date().iso().required()
        .messages({
            'date.iso': 'Start date must be a valid ISO date.',
            'any.required': 'Start date is required.',
        }),
    end_date: Joi.date().iso().min(Joi.ref('start_date')).required()
        .messages({
            'date.iso': 'End date must be a valid ISO date.',
            'date.min': 'End date must be greater than or equal to start date.',
            'any.required': 'End date is required.',
        }),
});

// Middleware function for today follow-ups validation
export const validateTodayFollowUpsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, todayFollowUpsParams, "query");
