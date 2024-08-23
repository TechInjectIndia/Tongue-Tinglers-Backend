import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

const createPermissionBody = Joi.object().keys({
    name: Joi.string().required(),
    active: Joi.number().required(),
});

export const validateCreatePermissionBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createPermissionBody, "body");

const editPermissionBody = Joi.object().keys({
    name: Joi.string().required(),
    active: Joi.number().required(),
});

export const validateEditPermissionBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editPermissionBody, "body");

const editPermissionParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditPermissionParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editPermissionParams, "params");

const listPermissionQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListPermissionQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listPermissionQuery, "query");