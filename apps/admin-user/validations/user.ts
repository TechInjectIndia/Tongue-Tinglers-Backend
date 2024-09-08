import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const listAdminQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
    trashOnly: Joi.string().optional().allow("").valid("true", ""),
});

export const validateListAdminQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listAdminQuery, "query");

const createAdminBody = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required(),
    userName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    status: Joi.string().required(),
    role: Joi.number().required(),
});

export const validateCreateAdminBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createAdminBody, "body");

const editAdminParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditAdminParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editAdminParams, "params");

const editAdminBody = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    status: Joi.string().required(),
    role: Joi.number().required(),
});

export const validateEditAdminBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editAdminBody, "body");

const editAdminProfileBody = Joi.object().keys({
    full_name: Joi.string().required(),
    contact_number: Joi.string().required(),
    phone_code: Joi.string().required(),
    address: Joi.string().required(),
});

export const validateEditAdminProfileBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editAdminProfileBody, "body");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");