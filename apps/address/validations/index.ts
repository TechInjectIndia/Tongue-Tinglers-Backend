import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const createAddressBody = Joi.object().keys({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
});

export const validateCreateAddressBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createAddressBody, "body");

const editAddressBody = Joi.object().keys({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
});

export const validateEditAddressBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editAddressBody, "body");

const editAddressParams = Joi.object().keys({
    id: Joi.number().required(),
});

export const validateEditAddressParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editAddressParams, "params");

const listAddressQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListAddressQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listAddressQuery, "query");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

