import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const createRoleBody = Joi.object().keys({
    name: Joi.string().required(),
    role_permissions: Joi.string(),
    active: Joi.number().required(),
});

export const validateCreateRoleBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createRoleBody, "body");

const editRoleBody = Joi.object().keys({
    name: Joi.string().required(),
    role_permissions: Joi.string(),
    active: Joi.number().required(),
});

export const validateEditRoleBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editRoleBody, "body");

const editRoleParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditRoleParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editRoleParams, "params");

const listRoleQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListRoleQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listRoleQuery, "query");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");