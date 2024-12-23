import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { NextFunction, Request, Response } from "express";

const listLogsQuery = Joi.object({
    page: Joi.number().integer().min(1).required().messages({
        "number.base": "Page must be a number",
        "number.integer": "Page must be an integer",
        "number.min": "Page must be greater than or equal to 1",
    }),
    limit: Joi.number().integer().min(1).required().messages({
        "number.base": "Limit must be a number",
        "number.integer": "Limit must be an integer",
        "number.min": "Limit must be greater than or equal to 1",
    }),
    search: Joi.string().optional().allow("").messages({
        "string.base": "Search query must be a string.",
    }),
    filters: Joi.string().optional().allow("").messages({
        "string.base": "Filters query must be a string.",
    }),
});

export const validateListLogsParams = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => validateReq(req, res, next, listLogsQuery, "query");


