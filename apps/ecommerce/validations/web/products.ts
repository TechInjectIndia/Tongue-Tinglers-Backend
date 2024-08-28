import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../../libraries";

const searchProductsParams = Joi.object().keys({
    search: Joi.string().required(),
});

export const validateSearchProductsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, searchProductsParams, "query");

const typeProductsParams = Joi.object().keys({
    limit: Joi.number().required(),
    type: Joi.string().required(),
});

export const validatTypeProductsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, typeProductsParams, "query");

const singleProductsParams = Joi.object().keys({
    slug: Joi.string().required(),
});

export const validateSingleProductsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, singleProductsParams, "params");

const listProductsQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListProductsQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listProductsQuery, "query");