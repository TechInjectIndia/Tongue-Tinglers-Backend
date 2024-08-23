import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const createFollowUpsBody = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().required(),
    datetime: Joi.date().required(),
    status: Joi.number().required(),
});

export const validateCreateFollowUpsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createFollowUpsBody, "body");

const editFollowUpsBody = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().required(),
    datetime: Joi.date().required(),
    status: Joi.number().required(),
});

export const validateEditFollowUpsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editFollowUpsBody, "body");

const editFollowUpsParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditFollowUpsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editFollowUpsParams, "params");

const listFollowUpsQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListFollowUpsQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listFollowUpsQuery, "query");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

