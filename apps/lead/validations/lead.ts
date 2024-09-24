import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { LeadSource, LeadStatus, followStatus } from '../../../interfaces/leads';

// Schema for UserDetails
const USER_DETAILS_SCHEMA = Joi.object().keys({
    userName: Joi.string().required()
        .messages({
            'any.required': 'User name is required.',
        }),
    id: Joi.string().required()
        .messages({
            'any.required': 'User ID is required.',
        }),
});

// Schema for FollowDetails
const FOLLOWED_DATE_SCHEMA = Joi.object().keys({
    followedDate: Joi.date().iso().allow(null)
        .messages({
            'date.iso': 'Followed date must be in ISO format.',
        }),
    followedBy: USER_DETAILS_SCHEMA.required()
        .messages({
            'any.required': 'Followed By details are required.',
        }),
    notes: Joi.string().allow(null).optional(),
    description: Joi.string().allow(null).optional(),
    status: Joi.string().valid(...Object.values(followStatus))
        .messages({
            'any.only': `Status must be one of: ${Object.values(followStatus).join(', ')}.`,
        }),
    createdAt: Joi.date().iso().allow(null)
        .messages({
            'date.iso': 'Followed date must be in ISO format.',
        }),
    createdBy: USER_DETAILS_SCHEMA.required()
        .messages({
            'any.required': 'Followed By details are required.',
        }),
    reminder: Joi.date().iso().allow(null)
        .messages({
            'date.iso': 'reminder date must be in ISO format.',
        }),
});

// Schema for Notes
const NOTE_SCHEMA = Joi.object().keys({
    note: Joi.string().required()
        .messages({
            'any.required': 'Note content is required.',
        }),
    userDetails: USER_DETAILS_SCHEMA.required()
        .messages({
            'any.required': 'User details are required for the note.',
        }),
    date: Joi.date().iso().required()
        .messages({
            'date.iso': 'Date must be in ISO format.',
            'any.required': 'Date is required.',
        }),
});

// Schema for Logs
const LOGS_SCHEMA = Joi.object().keys({
    userDetails: USER_DETAILS_SCHEMA.required()
        .messages({
            'any.required': 'User details are required for the note.',
        }),
    events: Joi.string().required()
        .messages({
            'any.required': 'Logs content is required.',
        }),
    timeline: Joi.date().iso().required()
        .messages({
            'date.iso': 'Date must be in ISO format.',
            'any.required': 'Date is required.',
        }),
});

const ADDRESS_SCHEMA = Joi.object().keys({
    address: Joi.string().required()
        .messages({ 'any.required': 'Address is required.' }),
    city: Joi.string().required()
        .messages({ 'any.required': 'City is required.' }),
    state: Joi.string().required()
        .messages({ 'any.required': 'State is required.' }),
    zipCode: Joi.string().required()
        .messages({ 'any.required': 'Zip code is required.' }),
    country: Joi.string().required()
        .messages({ 'any.required': 'Country is required.' }),
    GSTIN: Joi.string().allow(null).optional(),
});

const ASSIGN_SCHEMA = Joi.object().keys({
    assignedTo: USER_DETAILS_SCHEMA.required()
        .messages({ 'any.required': 'Assigned To details are required.' }),
    assignedBy: USER_DETAILS_SCHEMA.optional(),
    assignedDate: Joi.date().iso().optional(),
});

// Validation for creating a lead
const createLeadBody = Joi.object().keys({
    firstName: Joi.string().required()
        .messages({
            'any.required': 'First name is required.',
        }),
    lastName: Joi.string().required()
        .messages({
            'any.required': 'Last name is required.',
        }),
    phoneNumber: Joi.string().pattern(/^\+\d{1,3}\d{9,}$/).required()
        .messages({
            'string.pattern.base': 'Phone number must be in international format (e.g., +1234567890).',
            'any.required': 'Phone number is required.'
        }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
        .messages({
            'string.email': 'Please provide a valid email address.',
            'any.required': 'Email is required.',
        }),
    address: ADDRESS_SCHEMA.required(),
    additionalInfo: Joi.string().optional(),
    status: Joi.string().valid(...Object.values(LeadStatus))
        .messages({
            'any.only': `Status must be one of: ${Object.values(LeadStatus).join(', ')}.`,
            'any.required': 'Status is required.',
        }),
    referBy: USER_DETAILS_SCHEMA.allow(null),
    assign: ASSIGN_SCHEMA.optional().allow(null),
    followDetails: Joi.array().items(FOLLOWED_DATE_SCHEMA).optional(),
    source: Joi.string().valid(...Object.values(LeadSource)).required()
        .messages({
            'any.only': `Source must be one of: ${Object.values(LeadSource).join(', ')}.`,
            'any.required': 'Source is required.',
        }),
    sourceInfo: Joi.string().optional(),
    notes: Joi.array().items(NOTE_SCHEMA).optional(),
    logs: Joi.array().items(LOGS_SCHEMA).optional(),
    proposalModals: Joi.array().items(Joi.string()).optional().allow(null),
    franchiseModals: Joi.array().items(Joi.string()).optional().allow(null),
    affiliate: Joi.array().items(Joi.object().keys({
        id: Joi.string().required().messages({ 'any.required': 'Affiliate ID is required.' }),
        name: Joi.string().required().messages({ 'any.required': 'Affiliate name is required.' }),
    })).optional().allow(null),
    marketing: Joi.array().items(Joi.string()).optional().allow(null),
    other: Joi.array().items(Joi.object().keys({
        key: Joi.string().required().messages({ 'any.required': 'Key is required.' }),
        value: Joi.string().required().messages({ 'any.required': 'Value is required.' }),
    })).optional().allow(null),
});

// Validation for editing a lead body
const editLeadBody = Joi.object().keys({
    firstName: Joi.string().required()
        .messages({
            'any.required': 'First name is required.',
        }),
    lastName: Joi.string().required()
        .messages({
            'any.required': 'Last name is required.',
        }),
    phoneNumber: Joi.string().pattern(/^\+\d{1,3}\d{9,}$/).required()
        .messages({
            'string.pattern.base': 'Phone number must be in international format (e.g., +1234567890).',
            'any.required': 'Phone number is required.'
        }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
        .messages({
            'string.email': 'Please provide a valid email address.',
            'any.required': 'Email is required.',
        }),
    address: ADDRESS_SCHEMA.required(),
    additionalInfo: Joi.string().optional(),
    status: Joi.string().valid(...Object.values(LeadStatus))
        .messages({
            'any.only': `Status must be one of: ${Object.values(LeadStatus).join(', ')}.`,
            'any.required': 'Status is required.',
        }),
    referBy: USER_DETAILS_SCHEMA.allow(null),
    assign: ASSIGN_SCHEMA.optional().allow(null),
    followDetails: Joi.array().items(FOLLOWED_DATE_SCHEMA).optional(),
    source: Joi.string().valid(...Object.values(LeadSource)).required()
        .messages({
            'any.only': `Source must be one of: ${Object.values(LeadSource).join(', ')}.`,
            'any.required': 'Source is required.',
        }),
    sourceInfo: Joi.string().optional(),
    notes: Joi.array().items(NOTE_SCHEMA).optional(),
    logs: Joi.array().items(LOGS_SCHEMA).optional(),
    proposalModals: Joi.array().items(Joi.string()).optional().allow(null),
    franchiseModals: Joi.array().items(Joi.string()).optional().allow(null),
    affiliate: Joi.array().items(Joi.object().keys({
        id: Joi.string().required().messages({ 'any.required': 'Affiliate ID is required.' }),
        name: Joi.string().required().messages({ 'any.required': 'Affiliate name is required.' }),
    })).optional().allow(null),
    marketing: Joi.array().items(Joi.string()).optional().allow(null),
    other: Joi.array().items(Joi.object().keys({
        key: Joi.string().required().messages({ 'any.required': 'Key is required.' }),
        value: Joi.string().required().messages({ 'any.required': 'Value is required.' }),
    })).optional().allow(null),
});

// Validation for editing lead parameters
const editLeadParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Lead ID is required.',
        }),
});

// Validation for listing leads
const listLeadQuery = Joi.object().keys({
    size: Joi.number().required()
        .messages({
            'any.required': 'Size is required.',
            'number.base': 'Size must be a number.',
        }),
    skip: Joi.number().required()
        .messages({
            'any.required': 'Skip is required.',
            'number.base': 'Skip must be a number.',
        }),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

// Validation for editing multiple IDs
const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required()
        .messages({
            'array.min': 'At least one ID is required.',
            'any.required': 'IDs are required.',
        }),
});

// Validation for converting lead parameters
const convertLeadParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Lead ID is required.',
        }),
});

// Validation for assigning lead
const assignLeadBody = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Lead ID is required.',
        }),
    assignedTo: Joi.object().keys({
        userName: Joi.string().required()
            .messages({
                'any.required': 'Assigned To username is required.',
            }),
        id: Joi.string().required()
            .messages({
                'any.required': 'Assigned To ID is required.',
            }),
    }).required()
        .messages({
            'any.required': 'Assigned To details are required.',
        }),
});

// Validation for lead status body
const statusLeadBody = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Lead ID is required.',
        }),
});

// Middleware functions for validations
export const validateCreateLeadBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createLeadBody, "body");

export const validateEditLeadBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editLeadBody, "body");

export const validateEditLeadParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editLeadParams, "params");

export const validateListLeadQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listLeadQuery, "query");

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

export const validateConvertLeadParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, convertLeadParams, "body");

export const validateAssignLeadBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, assignLeadBody, "body");

export const validateLeadStatusBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, statusLeadBody, "body");
