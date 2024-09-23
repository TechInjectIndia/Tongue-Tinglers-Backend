import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

export const DATEFILTERS = {
    Week: 'Week',
    Month: 'Month',
    Year: 'Year',
};

// Validation schema for metrics query
const getMetricsQuery = Joi.object().keys({
    range: Joi.string()
        .valid(...Object.values(DATEFILTERS))
        .optional()
        .allow('')
        .messages({
            'any.only': `Range must be one of: ${Object.values(DATEFILTERS).join(', ')}.`,
        }),
});

// Middleware function for validating analytics query
export const validateListAnalyticsQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, getMetricsQuery, "query");
