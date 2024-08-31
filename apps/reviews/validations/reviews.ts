import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const ITEMTYPEFILTERS = {
    product: 'product',
    franchise: 'franchise'
}

const APPROVEDFILTERS = {
    0: 0,
    1: 1
}

const createReviewsBody = Joi.object().keys({
    review_text: Joi.string().required(),
    rating: Joi.number().integer().min(0).max(5).required(),
    approved: Joi.number().required(),
    item_id: Joi.number().required(),
    item_type: Joi.string().valid(...Object.values(ITEMTYPEFILTERS)).optional().allow(''),
});

export const validateCreateReviewsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createReviewsBody, "body");

const editReviewsBody = Joi.object().keys({
    review_text: Joi.string().required(),
    rating: Joi.number().integer().min(0).max(5).required(),
    approved: Joi.number().valid(...Object.values(APPROVEDFILTERS)).optional().allow(''),
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

