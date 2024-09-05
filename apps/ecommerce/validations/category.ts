import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { P_CATEGORY_TYPE } from '../../../interfaces/product_category';

const createProductCategoryBody = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    active: Joi.string().valid(...Object.values(P_CATEGORY_TYPE)).optional().allow(''),
});

export const validateCreateProductCategoryBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createProductCategoryBody, "body");

const editProductCategoryBody = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    active: Joi.string().valid(...Object.values(P_CATEGORY_TYPE)).optional().allow(''),
});

export const validateEditProductCategoryBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editProductCategoryBody, "body");

const editProductCategoryParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditProductCategoryParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editProductCategoryParams, "params");

const listProductCategoryQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListProductCategoryQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listProductCategoryQuery, "query");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

