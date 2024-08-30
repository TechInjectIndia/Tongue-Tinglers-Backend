import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

export const DATEFILTERS = {
    Week: 'Week',
    Month: 'Month',
    Year: 'Year',
}

const getMetricsQuery = Joi.object().keys({
    range: Joi.string()
        .valid(...Object.values(DATEFILTERS))
        .optional().allow(''),
});

export const validateListAnalyticsQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, getMetricsQuery, "query");

