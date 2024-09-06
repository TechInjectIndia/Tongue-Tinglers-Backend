import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { MENU_CATEGORY_STATUS } from '../../../interfaces';

const createMenuImageBody = Joi.object().keys({
    menuId: Joi.number().required(),
    fileName: Joi.string().required(),
    filePath: Joi.string().required(),
    originalName: Joi.string().required(),
    fileSize: Joi.string().required(),
});

export const validateCreateMenuImageBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createMenuImageBody, "body");

const editMenuImageBody = Joi.object().keys({
    menuId: Joi.number().required(),
    fileName: Joi.string().required(),
    filePath: Joi.string().required(),
    originalName: Joi.string().required(),
    fileSize: Joi.string().required(),
});

export const validateEditMenuImageBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMenuImageBody, "body");

const editMenuImageParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditMenuImageParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMenuImageParams, "params");

const listMenuImageQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListMenuImageQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listMenuImageQuery, "query");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

