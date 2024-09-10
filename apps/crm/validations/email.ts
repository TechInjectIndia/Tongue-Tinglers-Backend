import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { EMAIL_STATUS } from '../../../interfaces';

const createEmailBody = Joi.object().keys({
    campaignId: Joi.number().required(),
    subscriberId: Joi.number().required(),
});

export const validateCreateEmailBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createEmailBody, "body");

const editEmailBody = Joi.object().keys({
    campaignId: Joi.number().required(),
    subscriberId: Joi.number().required(),
    status: Joi.string().valid(...Object.values(EMAIL_STATUS)).optional().allow(''),
});

export const validateEditEmailBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editEmailBody, "body");

const editEmailParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditEmailParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editEmailParams, "params");

const listEmailQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListEmailQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listEmailQuery, "query");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

