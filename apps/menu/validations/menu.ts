import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { MENU_STATUS } from '../../../interfaces';

const createMenuBody = Joi.object().keys({
    name: Joi.string().required(),
    images: Joi.string().required(),
    status: Joi.string().valid(...Object.values(MENU_STATUS)).optional().allow(''),
});

export const validateCreateMenuBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createMenuBody, "body");

const editMenuBody = Joi.object().keys({
    name: Joi.string().required(),
    images: Joi.string().required(),
    status: Joi.string().valid(...Object.values(MENU_STATUS)).optional().allow(''),
});

export const validateEditMenuBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMenuBody, "body");

const editMenuParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditMenuParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMenuParams, "params");

const listMenuQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListMenuQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listMenuQuery, "query");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

