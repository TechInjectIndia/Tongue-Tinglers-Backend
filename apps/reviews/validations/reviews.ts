import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const createReviewsBody = Joi.object().keys({
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

export const validateCreateReviewsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createReviewsBody, "body");

const editReviewsBody = Joi.object().keys({
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

export const validateEditReviewsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editReviewsBody, "body");

const editReviewsParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditReviewsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editReviewsParams, "params");

const listReviewsQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListReviewsQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listReviewsQuery, "query");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

