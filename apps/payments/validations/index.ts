import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation for creating payments
const createPaymentsBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Name is required.'
        }),
    city: Joi.string().required()
        .messages({
            'any.required': 'City is required.'
        }),
    state: Joi.string().required()
        .messages({
            'any.required': 'State is required.'
        }),
    zip_code: Joi.string().required()
        .messages({
            'any.required': 'Zip code is required.'
        }),
    country: Joi.string().required()
        .messages({
            'any.required': 'Country is required.'
        }),
    phone_number: Joi.string().required()
        .messages({
            'any.required': 'Phone number is required.'
        }),
    email: Joi.string().required()
        .messages({
            'any.required': 'Email is required.'
        }),
    address: Joi.string().required()
        .messages({
            'any.required': 'Address is required.'
        }),
    additional_info: Joi.string().required()
        .messages({
            'any.required': 'Additional info is required.'
        }),
    status: Joi.number().required()
        .messages({
            'any.required': 'Status is required.'
        }),
});

// Validation for editing payments
const editPaymentsBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Name is required.'
        }),
    city: Joi.string().required()
        .messages({
            'any.required': 'City is required.'
        }),
    state: Joi.string().required()
        .messages({
            'any.required': 'State is required.'
        }),
    zip_code: Joi.string().required()
        .messages({
            'any.required': 'Zip code is required.'
        }),
    country: Joi.string().required()
        .messages({
            'any.required': 'Country is required.'
        }),
    phone_number: Joi.string().required()
        .messages({
            'any.required': 'Phone number is required.'
        }),
    email: Joi.string().required()
        .messages({
            'any.required': 'Email is required.'
        }),
    address: Joi.string().required()
        .messages({
            'any.required': 'Address is required.'
        }),
    additional_info: Joi.string().required()
        .messages({
            'any.required': 'Additional info is required.'
        }),
    status: Joi.number().required()
        .messages({
            'any.required': 'Status is required.'
        }),
});

// Validation for editing payment parameters
const editPaymentsParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Payment ID is required.'
        }),
});

// Validation for listing payments
const listPaymentsQuery = Joi.object().keys({
    size: Joi.number().required()
        .messages({
            'any.required': 'Size is required.'
        }),
    skip: Joi.number().required()
        .messages({
            'any.required': 'Skip is required.'
        }),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

// Validation for editing multiple payments
const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required()
        .messages({
            'array.min': 'At least one ID is required.',
            'any.required': 'IDs are required.'
        }),
});

// Validation for generating a link
const generateLinkBody = Joi.object().keys({
    contract_id: Joi.number().required()
        .messages({
            'any.required': 'Contract ID is required.'
        }),
});

// Middleware functions
export const validateCreatePaymentsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createPaymentsBody, "body");

export const validateEditPaymentsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editPaymentsBody, "body");

export const validateEditPaymentsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editPaymentsParams, "params");

export const validateListPaymentsQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listPaymentsQuery, "query");

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

export const validateGenerateLinkBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, generateLinkBody, "body");
