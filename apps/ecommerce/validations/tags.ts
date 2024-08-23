import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const createTagBody = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    active: Joi.number().required(),
});

export const validateCreateTagBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createTagBody, "body");

const editTagBody = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    active: Joi.number().required(),
});

export const validateEditTagBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editTagBody, "body");

const editTagParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditTagParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editTagParams, "params");

const listTagQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListTagQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listTagQuery, "query");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

