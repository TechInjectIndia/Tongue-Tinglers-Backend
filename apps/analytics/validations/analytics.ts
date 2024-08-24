import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const createAnalyticsBody = Joi.object().keys({
    name: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip_code: Joi.string().required(),
    country: Joi.string().required(),
    phone_number: Joi.string().required(),
    email: Joi.string().required(),
    address: Joi.string().required(),
    additional_info: Joi.string().required(),
    status: Joi.number().required(),
});

export const validateCreateAnalyticsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createAnalyticsBody, "body");

const editAnalyticsBody = Joi.object().keys({
    name: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip_code: Joi.string().required(),
    country: Joi.string().required(),
    phone_number: Joi.string().required(),
    email: Joi.string().required(),
    address: Joi.string().required(),
    additional_info: Joi.string().required(),
    status: Joi.number().required(),
});

export const validateEditAnalyticsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editAnalyticsBody, "body");

const editAnalyticsParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditAnalyticsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editAnalyticsParams, "params");

const listAnalyticsQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListAnalyticsQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listAnalyticsQuery, "query");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

