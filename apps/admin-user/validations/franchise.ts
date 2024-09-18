import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const listFranchiseQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
    trashOnly: Joi.string().optional().allow("").valid("true", ""),
});

export const validateListFranchiseQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listFranchiseQuery, "query");

const createFranchiseBody = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required(),
    userName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    status: Joi.string().required(),
    role: Joi.number().required(),
    referralBy: Joi.string(),
});

export const validateCreateFranchiseBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createFranchiseBody, "body");

const editFranchiseParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditFranchiseParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editFranchiseParams, "params");

const editFranchiseBody = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    status: Joi.string().required(),
    role: Joi.number().required(),
});

export const validateEditFranchiseBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editFranchiseBody, "body");

const editFranchiseProfileBody = Joi.object().keys({
    full_name: Joi.string().required(),
    contact_number: Joi.string().required(),
    phone_code: Joi.string().required(),
    address: Joi.string().required(),
});

export const validateEditFranchiseProfileBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editFranchiseProfileBody, "body");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");