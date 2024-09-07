import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { PRODUCTS_TYPE } from '../../../interfaces/products';

const createProductsBody = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().valid(...Object.values(PRODUCTS_TYPE)).optional().allow(''),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    active: Joi.number().required(),
});

export const validateCreateProductsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createProductsBody, "body");

const editProductsBody = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().valid(...Object.values(PRODUCTS_TYPE)).optional().allow(''),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    active: Joi.number().required(),
});

export const validateEditProductsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editProductsBody, "body");

const editProductsParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditProductsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editProductsParams, "params");

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

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

