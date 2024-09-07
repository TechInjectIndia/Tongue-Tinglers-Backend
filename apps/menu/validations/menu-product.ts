import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { MENU_PRODUCT_STATUS } from '../../../interfaces';

const createMenuProductBody = Joi.object().keys({
    name: Joi.string().required(),
    slug: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    images: Joi.string().required(),
    active: Joi.string().valid(...Object.values(MENU_PRODUCT_STATUS)).optional().allow(''),
});

export const validateCreateMenuProductBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createMenuProductBody, "body");

const editMenuProductBody = Joi.object().keys({
    name: Joi.string().required(),
    slug: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    images: Joi.string().required(),
    active: Joi.string().valid(...Object.values(MENU_PRODUCT_STATUS)).optional().allow(''),
});

export const validateEditMenuProductBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMenuProductBody, "body");

const editMenuProductParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditMenuProductParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMenuProductParams, "params");

const listMenuProductQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListMenuProductQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listMenuProductQuery, "query");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

