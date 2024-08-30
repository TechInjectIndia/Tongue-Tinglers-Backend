import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const listFranchiseeQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
    trashOnly: Joi.string().optional().allow("").valid("true", ""),
});
export const validateListFranchiseeQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listFranchiseeQuery, "query");

const createFranchiseeBody = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required(),
    full_name: Joi.string().required(),
    contact_number: Joi.string().required(),
    phone_code: Joi.string().required(),
    address: Joi.string().required(),
    active: Joi.number().required(),
});

export const validateCreateFranchiseeBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createFranchiseeBody, "body");

const editFranchiseeParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditFranchiseeParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editFranchiseeParams, "params");

const editFranchiseeBody = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    full_name: Joi.string().required(),
    contact_number: Joi.string().required(),
    phone_code: Joi.string().required(),
    address: Joi.string().required(),
    active: Joi.number().required(),
});

export const validateEditFranchiseeBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editFranchiseeBody, "body");

const editFranchiseeProfileBody = Joi.object().keys({
    full_name: Joi.string().required(),
    contact_number: Joi.string().required(),
    phone_code: Joi.string().required(),
    address: Joi.string().required(),
});

export const validateEditFranchiseeProfileBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editFranchiseeProfileBody, "body");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");