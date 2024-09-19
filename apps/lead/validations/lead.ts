import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { LEAD_STATUS } from '../../../interfaces/leads';

const convertLeadParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateConvertLeadParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, convertLeadParams, "body");

const statusLeadBody = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateLeadStatusBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, statusLeadBody, "params");

const assignLeadBody = Joi.object().keys({
    id: Joi.string().required(),
    assignedTo: Joi.number().required(),
});

export const validateAssignLeadBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, assignLeadBody, "body");

const createLeadBody = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required(),
    country: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    address: Joi.string().required(),
    additionalInfo: Joi.string().required(),
    status: Joi.string().valid(...Object.values(LEAD_STATUS)).optional().allow(''),
    referby: Joi.string().allow('', null).optional(),
});

export const validateCreateLeadBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createLeadBody, "body");

const editLeadBody = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required(),
    country: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    address: Joi.string().required(),
    additionalInfo: Joi.string().required(),
    followedDate: Joi.date().iso().required(),
    status: Joi.string().valid(...Object.values(LEAD_STATUS)).optional().allow(''),
});

export const validateEditLeadBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editLeadBody, "body");

const editLeadParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditLeadParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editLeadParams, "params");

const listLeadQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListLeadQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listLeadQuery, "query");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

