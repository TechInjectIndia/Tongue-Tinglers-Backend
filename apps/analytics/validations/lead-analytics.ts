import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation schema for metrics query
const getMetricsQuery = Joi.object().keys({
    filter: Joi.string().optional()
        .valid("this_week", "last_week", "this_month", "last_month", "this_year", "last_year", "custom")
        .messages({
            'any.only': 'Invalid filter type.',
        }),
    startDate: Joi.string().optional().isoDate()
        .messages({
            'string.isoDate': 'Start date must be a valid ISO date.',
        }),
    endDate: Joi.string().optional().isoDate()
        .messages({
            'string.isoDate': 'End date must be a valid ISO date.',
        }),
});

// Middleware function for validating analytics query
export const validateListAnalyticsQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, getMetricsQuery, "query");
