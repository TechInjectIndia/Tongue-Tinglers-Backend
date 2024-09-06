import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { MENU_CATEGORY_STATUS } from '../../../interfaces';

const createMenuCategoryMapBody = Joi.object().keys({
    menuId: Joi.number().required(),
    fileName: Joi.string().required(),
    filePath: Joi.string().required(),
    originalName: Joi.string().required(),
    fileSize: Joi.string().required(),
});

export const validateCreateMenuCategoryMapBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createMenuCategoryMapBody, "body");

const editMenuCategoryMapBody = Joi.object().keys({
    menuId: Joi.number().required(),
    fileName: Joi.string().required(),
    filePath: Joi.string().required(),
    originalName: Joi.string().required(),
    fileSize: Joi.string().required(),
});

export const validateEditMenuCategoryMapBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMenuCategoryMapBody, "body");

const editMenuCategoryMapParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditMenuCategoryMapParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMenuCategoryMapParams, "params");

const listMenuCategoryMapQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListMenuCategoryMapQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listMenuCategoryMapQuery, "query");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

