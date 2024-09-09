import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const createSubscriberBody = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    subscribedAt: Joi.string().required(),
});

export const validateCreateSubscriberBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createSubscriberBody, "body");

const editSubscriberBody = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    subscribedAt: Joi.string().required(),
});

export const validateEditSubscriberBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editSubscriberBody, "body");

const editSubscriberParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditSubscriberParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editSubscriberParams, "params");

const listSubscriberQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListSubscriberQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listSubscriberQuery, "query");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

