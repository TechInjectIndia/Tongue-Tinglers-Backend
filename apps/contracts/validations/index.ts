import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { CONTRACT_STATUS } from '../../../interfaces/';

// Define termination details schema as a constant
const terminationDetailsSchema = Joi.object().keys({
    id: Joi.string().required()
        .messages({ 'any.required': 'Termination ID is required.' }),
    reason: Joi.string().required()
        .messages({ 'any.required': 'Termination reason is required.' }),
    date: Joi.date().required()
        .messages({ 'any.required': 'Termination date is required.' }),
});

// Validation schema for creating a contract
const createContractBody = Joi.object().keys({
    status: Joi.string().valid(...Object.values(CONTRACT_STATUS)).required()
        .messages({
            'any.required': 'Contract status is required.',
            'any.only': 'Status must be one of the predefined values.'
        }),
    terminationDetails: terminationDetailsSchema.optional(),
    doc: Joi.object().optional(),
    payment: Joi.object().optional(),
    leadId: Joi.string().required()
        .messages({ 'any.required': 'Lead ID is required.' }),
    templateId: Joi.string().required()
        .messages({ 'any.required': 'Template ID is required.' }),
    amount: Joi.number().required()
        .messages({ 'any.required': 'Amount is required.' }),
    signedDate: Joi.date().optional(),
    dueDate: Joi.date().required()
        .messages({ 'any.required': 'Due date is required.' }),
    validity: Joi.object().keys({
        from: Joi.date().required()
            .messages({ 'any.required': 'Validity from date is required.' }),
        to: Joi.date().required()
            .messages({ 'any.required': 'Validity to date is required.' }),
    }).required(),
    additionalInfo: Joi.string().optional(),
    createdBy: Joi.string().required()
        .messages({ 'any.required': 'Created by information is required.' }),
    updatedBy: Joi.string().optional(),
    deletedBy: Joi.string().optional(),
});

// Validation schema for editing a contract
const editContractBody = Joi.object().keys({
    status: Joi.string().valid(...Object.values(CONTRACT_STATUS)).optional()
        .messages({
            'any.only': 'Status must be one of the predefined values.'
        }),
    terminationDetails: terminationDetailsSchema.optional(),
    doc: Joi.object().optional(),
    payment: Joi.object().optional(),
    amount: Joi.number().optional(),
    signedDate: Joi.date().optional(),
    dueDate: Joi.date().optional(),
    validity: Joi.object().optional(),
    additionalInfo: Joi.string().optional(),
});

// Validation schema for editing contract parameters
const editContractParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({ 'any.required': 'Contract ID is required.' }),
});

// Middleware functions for validations
export const validateCreateContractBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createContractBody, "body");

export const validateEditContractBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editContractBody, "body");

export const validateEditContractParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editContractParams, "params");
