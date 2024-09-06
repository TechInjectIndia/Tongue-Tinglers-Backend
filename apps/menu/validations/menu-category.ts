import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { MENU_CATEGORY_STATUS } from '../../../interfaces';

const createMenuCategoryBody = Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.string().required(),
    status: Joi.string().valid(...Object.values(MENU_CATEGORY_STATUS)).optional().allow(''),
});

export const validateCreateMenuCategoryBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createMenuCategoryBody, "body");

const editMenuCategoryBody = Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.string().required(),
    status: Joi.string().valid(...Object.values(MENU_CATEGORY_STATUS)).optional().allow(''),
});

export const validateEditMenuCategoryBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMenuCategoryBody, "body");

const editMenuCategoryParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditMenuCategoryParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMenuCategoryParams, "params");

const listMenuCategoryQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListMenuCategoryQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listMenuCategoryQuery, "query");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

