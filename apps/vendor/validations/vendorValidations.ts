import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation for creating a vendor
const createVendorBody = Joi.object().keys({
    company_name: Joi.string().required()
        .messages({
            'any.required': 'Company name is required.'
        }),
    gst_number: Joi.string().required()
        .messages({
            'any.required': 'GST number is required.'
        }),
    company_address: Joi.string().required()
        .messages({
            'any.required': 'Company address is required.'
        }),
    company_email: Joi.string().email().required()
        .messages({
            'string.email': 'Company email must be a valid email address.',
            'any.required': 'Company email is required.'
        }),
    company_phone: Joi.string().required()
        .messages({
            'any.required': 'Company phone is required.'
        }),
    first_name: Joi.string().required()
        .messages({
            'any.required': 'First name is required.'
        }),
    last_name: Joi.string().required()
        .messages({
            'any.required': 'Last name is required.'
        }),
    email: Joi.string().email().required()
        .messages({
            'string.email': 'Email must be a valid email address.',
            'any.required': 'Email is required.'
        }),
    phone: Joi.string().required()
        .messages({
            'any.required': 'Phone number is required.'
        }),
});

// Validation for editing a vendor
const editVendorBody = Joi.object().keys({
    company_name: Joi.string().optional(),
    gst_number: Joi.string().optional(),
    company_address: Joi.string().optional(),
    company_email: Joi.string().email().optional()
        .messages({
            'string.email': 'Company email must be a valid email address.',
        }),
    company_phone: Joi.string().optional(),
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
    email: Joi.string().email().optional()
        .messages({
            'string.email': 'Email must be a valid email address.',
        }),
    phone: Joi.string().optional(),
});

// Validation for editing vendor parameters
const editVendorParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Vendor ID is required.'
        }),
});

// Validation for listing vendors
const listVendorQuery = Joi.object().keys({
    size: Joi.number().integer().min(1).default(10)
        .messages({
            'number.base': 'Size must be a number.',
            'number.min': 'Size must be at least 1.',
            'any.required': 'Size is required.',
        }),
    skip: Joi.number().integer().min(0).default(0)
        .messages({
            'number.base': 'Skip must be a number.',
            'number.min': 'Skip must be 0 or greater.',
            'any.required': 'Skip is required.',
        }),
});

// Validation for editing multiple vendors
const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required()
        .messages({
            'array.min': 'At least one ID is required.',
            'any.required': 'IDs are required.'
        }),
});

// Middleware functions for validations
export const validateCreateVendorBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createVendorBody, "body");

export const validateEditVendorBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editVendorBody, "body");

export const validateEditVendorParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editVendorParams, "params");

export const validateListVendorQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listVendorQuery, "query");

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
