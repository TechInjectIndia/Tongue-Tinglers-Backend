import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import {
    CONTRACT_STATUS,
    CONTRACT_DOCUMENT_STATUS,
    CONTRACT_PAYMENT_STATUS,
    SIGN_STATUS,
} from "../../../interfaces/";

// Schema for UserDetails
const USER_DETAILS_SCHEMA = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            "any.required": "User ID is required.",
        }),
});

// Schema for Logs
const LOGS_SCHEMA = Joi.object().keys({
    userDetails: USER_DETAILS_SCHEMA.required()
        .messages({
            "any.required": "User details are required for the note.",
        }),
    events: Joi.string().required()
        .messages({
            "any.required": "Logs content is required.",
        }),
    timeline: Joi.date().iso().required()
        .messages({
            "date.iso": "Date must be in ISO format.",
            "any.required": "Date is required.",
        }),
});

// Define termination details schema as a constant
const terminationDetailsSchema = Joi.object().keys({
    UserDetails: Joi.object().required()
        .messages({ "any.required": "User details are required." }),
    reason: Joi.string().required()
        .messages({ "any.required": "Termination reason is required." }),
    date: Joi.date().required()
        .messages({ "any.required": "Termination date is required." }),
});

// Define signed docs schema
const signedDocsSchema = Joi.object().keys({
    docId: Joi.string().allow(null),
    sentBy: Joi.object().required()
        .messages({ "any.required": "Sender details are required." }),
    createdAt: Joi.date().required()
        .messages({ "any.required": "Creation date is required." }),
    // status: Joi.string().valid(...Object.values(SIGN_STATUS)).required()
    //     .messages({ 'any.only': 'Status must be one of the predefined values.' }),
    status: Joi.string().required()
        .messages({ "any.only": "Status must be one of the predefined values." }),
    docLink: Joi.string().allow(null),
    signedDate: Joi.date().allow(null),
    notes: Joi.string().allow(null),
});

// Define contract payment details schema
const contractPaymentDetailsSchema = Joi.object().keys({
    paymentId: Joi.string().required()
        .messages({ "any.required": "Payment ID is required." }),
    amount: Joi.number().required()
        .messages({ "any.required": "Payment amount is required." }),
    date: Joi.date().required()
        .messages({ "any.required": "Payment date is required." }),
    status: Joi.string().valid(...Object.values(CONTRACT_PAYMENT_STATUS)).required()
        .messages({ "any.only": "Payment status must be one of the predefined values." }),
    additionalInfo: Joi.string().allow(null).optional(),
});

// Validation schema for creating a contract
const createContractBody = Joi.object().keys({
    status: Joi.string().valid(...Object.values(CONTRACT_STATUS)).required()
        .messages({
            "any.required": "Contract status is required.",
            "any.only": "Status must be one of the predefined values.",
        }),
    terminationDetails: terminationDetailsSchema.allow(null).optional(),
    proposalData: Joi.object().allow(null).optional(),
    payment: contractPaymentDetailsSchema.allow(null).optional(),
    organizationId: Joi.number().allow(null).optional(),
    leadId: Joi.string().required()
        .messages({ "any.required": "Lead ID is required." }),
    templateId: Joi.string().required()
        .messages({ "any.required": "Template ID is required." }),
    amount: Joi.number().required()
        .messages({ "any.required": "Amount is required." }),
    signedDate: Joi.date().allow(null).optional(),
    dueDate: Joi.date().allow(null).required()
        .messages({ "any.required": "Due date is required." }),
    validity: Joi.object().keys({
        from: Joi.date().required()
            .messages({ "any.required": "Validity from date is required." }),
        to: Joi.date().required()
            .messages({ "any.required": "Validity to date is required." }),
    }).required(),
    additionalInfo: Joi.string().allow(null).optional(),
    logs: Joi.array().items(LOGS_SCHEMA).optional(),
    createdBy: Joi.string().required()
        .messages({ "any.required": "Created by information is required." }),
    updatedBy: Joi.string().allow(null).optional(),
    deletedBy: Joi.string().allow(null).optional(),
    signedDocs: Joi.array().allow(null).items(signedDocsSchema).optional(),
});

// Validation schema for editing a contract
const editContractBody = Joi.object().keys({
    status: Joi.string().valid(...Object.values(CONTRACT_STATUS)).optional()
        .messages({
            "any.only": "Status must be one of the predefined values.",
        }),
    proposalData: Joi.object().allow(null).optional(),
    terminationDetails: terminationDetailsSchema.allow(null).optional(),
    payment: Joi.array().allow(null).optional(),
    amount: Joi.number().optional(),
    signedDate: Joi.date().allow(null).optional(),
    dueDate: Joi.date().optional(),
    validity: Joi.object().optional(),
    additionalInfo: Joi.string().allow(null, "").optional(),
    signedDocs: Joi.array().items(signedDocsSchema).optional(),
    organizationId: Joi.number().allow(null).optional(),
});

// Validation schema for editing contract parameters
const editContractParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({ "any.required": "Contract ID is required." }),
});

// Middleware functions for validations
export const validateCreateContractBody = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => validateReq(req, res, next, createContractBody, "body");

export const validateEditContractBody = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => validateReq(req, res, next, editContractBody, "body");

export const validateEditContractParams = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => validateReq(req, res, next, editContractParams, "params");
