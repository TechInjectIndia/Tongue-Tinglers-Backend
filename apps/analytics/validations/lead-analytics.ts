import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

export const DATEFILTERS = {
    LastMonth: 'Last Month',
    ThisMonth: 'This Month',
    LastWeek: 'Last Week',
    ThisWeek: 'This Week'
}

const getMetricsQuery = Joi.object().keys({
    range: Joi.string()
        .valid(...Object.values(DATEFILTERS))
        .optional().allow(''),
});

export const validateGetMetricsQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, getMetricsQuery, "query");

