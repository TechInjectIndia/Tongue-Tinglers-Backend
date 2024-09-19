import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const createPaymentsBody = Joi.object().keys({
    name: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip_code: Joi.string().required(),
    country: Joi.string().required(),
    phone_number: Joi.string().required(),
    email: Joi.string().required(),
    address: Joi.string().required(),
    additional_info: Joi.string().required(),
    status: Joi.number().required(),
});

export const validateCreatePaymentsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createPaymentsBody, "body");

const editPaymentsBody = Joi.object().keys({
    name: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip_code: Joi.string().required(),
    country: Joi.string().required(),
    phone_number: Joi.string().required(),
    email: Joi.string().required(),
    address: Joi.string().required(),
    additional_info: Joi.string().required(),
    status: Joi.number().required(),
});

export const validateEditPaymentsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editPaymentsBody, "body");

const editPaymentsParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditPaymentsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editPaymentsParams, "params");

const listPaymentsQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListPaymentsQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listPaymentsQuery, "query");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

const generateLinkBody = Joi.object().keys({
    contract_id: Joi.string().required()
});

export const validateGenerateLinkBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, generateLinkBody, "body");
