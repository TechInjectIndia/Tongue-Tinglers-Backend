import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { MENU_CATEGORY_STATUS } from '../../../interfaces';

const createMenuCategoryImageBody = Joi.object().keys({
    menuId: Joi.number().required(),
    fileName: Joi.string().required(),
    filePath: Joi.string().required(),
    originalName: Joi.string().required(),
    fileSize: Joi.string().required(),
});

export const validateCreateMenuCategoryImageBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createMenuCategoryImageBody, "body");

const editMenuCategoryImageBody = Joi.object().keys({
    menuId: Joi.number().required(),
    fileName: Joi.string().required(),
    filePath: Joi.string().required(),
    originalName: Joi.string().required(),
    fileSize: Joi.string().required(),
});

export const validateEditMenuCategoryImageBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMenuCategoryImageBody, "body");

const editMenuCategoryImageParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditMenuCategoryImageParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMenuCategoryImageParams, "params");

const listMenuCategoryImageQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListMenuCategoryImageQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listMenuCategoryImageQuery, "query");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

