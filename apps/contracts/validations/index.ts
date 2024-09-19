import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { CONTRACT_STATUS } from '../../../interfaces';

const createContractBody = Joi.object().keys({
    status: Joi.string().valid(...Object.values(CONTRACT_STATUS)).required(),
    terminationDetails: Joi.object().keys({
        id: Joi.string().required(),
        reason: Joi.string().required(),
        date: Joi.date().required(),
    }).optional(),
    doc: Joi.object().optional(),
    payment: Joi.object().optional(),
    leadId: Joi.string().required(),
    templateId: Joi.string().required(),
    amount: Joi.number().required(),
    signedDate: Joi.date().optional(),
    dueDate: Joi.date().required(),
    validity: Joi.object().keys({
        from: Joi.date().required(),
        to: Joi.date().required(),
    }).required(),
    additionalInfo: Joi.string().optional(),
    createdBy: Joi.string().required(),
    updatedBy: Joi.string().optional(),
    deletedBy: Joi.string().optional(),
});

export const validateCreateContractBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createContractBody, "body");

const editContractBody = Joi.object().keys({
    status: Joi.string().valid(...Object.values(CONTRACT_STATUS)).optional(),
    terminationDetails: Joi.object().optional(),
    doc: Joi.object().optional(),
    payment: Joi.object().optional(),
    amount: Joi.number().optional(),
    signedDate: Joi.date().optional(),
    dueDate: Joi.date().optional(),
    validity: Joi.object().optional(),
    additionalInfo: Joi.string().optional(),
});

export const validateEditContractBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editContractBody, "body");

const editContractParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditContractParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editContractParams, "params");
