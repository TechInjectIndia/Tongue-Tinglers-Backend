import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { INQUIRY_TYPE } from '../../../interfaces';

const createInquiryBody = Joi.object().keys({
    email: Joi.string().required(),
    subject: Joi.string().required(),
    message: Joi.string().required(),
    type: Joi.string().valid(...Object.values(INQUIRY_TYPE)).optional().allow(''),
});

export const validateCreateInquiryBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createInquiryBody, "body");

const editInquiryBody = Joi.object().keys({
    email: Joi.string().required(),
    subject: Joi.string().required(),
    message: Joi.string().required(),
    type: Joi.string().valid(...Object.values(INQUIRY_TYPE)).optional().allow(''),
});

export const validateEditInquiryBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editInquiryBody, "body");

const editInquiryParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditInquiryParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editInquiryParams, "params");

const listInquiryQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListInquiryQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listInquiryQuery, "query");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

