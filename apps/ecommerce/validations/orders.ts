import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const editOrderBody = Joi.object().keys({
    userId: Joi.string().required(),
});

export const validateEditOrderBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editOrderBody, "body");

const editOrderParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditOrderParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editOrderParams, "params");

const listOrderQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListOrderQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listOrderQuery, "query");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

