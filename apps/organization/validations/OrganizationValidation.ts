import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import {
    BUSINESS_TYPE,
    ORGANIZATION_TYPE,
} from "../../../interfaces/organization";

const addressSchema = Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
});

// Base Organization schema
const createOrganizationBody = Joi.object({
    name: Joi.string().required(),
    contactPersonName: Joi.string().required(),
    contactNumber: Joi.string().required(),
    contactEmail: Joi.string().email().required(),
    pan: Joi.string().allow(null),
    gst: Joi.string().allow(null),
    bankName: Joi.string().required(),
    bankAccountNumber: Joi.string().required(),
    bankIFSCCode: Joi.string().required(),
    masterFranchiseId: Joi.number().allow(null),
    type: Joi.string()
        .valid(...Object.values(ORGANIZATION_TYPE))
        .required(), // Use `valid()` with `Object.values()`
    businessType: Joi.string()
        .valid(...Object.values(BUSINESS_TYPE))
        .required(), // Use `valid()` with `Object.values()`
    billingAddress: addressSchema.required(),
    shippingAddress: Joi.array().items(addressSchema).required(),
    prospectId: Joi.number().optional(),
});

const editOrgParams = Joi.object().keys({
    id: Joi.number().required().messages({
        "any.required": "Organization ID is required.",
    }),
});

const listOrgQuery = Joi.object({
    page: Joi.number().integer().min(1).required().messages({
        "number.base": "Page must be a number",
        "number.integer": "Page must be an integer",
        "number.min": "Page must be greater than or equal to 1",
    }),
    limit: Joi.number().integer().min(1).required().messages({
        "number.base": "Limit must be a number",
        "number.integer": "Limit must be an integer",
        "number.min": "Limit must be greater than or equal to 1",
    }),
    search: Joi.string().optional().allow("").messages({
        "string.base": "Search query must be a string.",
    }),
    filters: Joi.string().optional().allow("").messages({
        "string.base": "Filters query must be a string.",
    }),
});

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required().messages({
        "array.min": "At least one ID is required.",
        "any.required": "IDs are required.",
    }),
});

// Middleware for validating campaign creation
export const validateCreateOrganizationBody = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => validateReq(req, res, next, createOrganizationBody, "body");

export const validateEditOrgParams = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => validateReq(req, res, next, editOrgParams, "params");

export const validateEditOrganizationBody = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => validateReq(req, res, next, createOrganizationBody, "body");

export const validateListOrgQuery = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => validateReq(req, res, next, listOrgQuery, "query");

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => validateReq(req, res, next, editMultipleIdsBody, "body");
