import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Define the SMDetails schema for validation
const SMDetailsSchema = Joi.object({
    handle: Joi.string().required()
        .messages({
            'string.base': 'SM handle must be a string.',
            'any.required': 'SM handle is required.'
        }),
    followers: Joi.number().integer().required()
        .messages({
            'number.base': 'Followers must be a number.',
            'any.required': 'Followers count is required.'
        }),
    tags: Joi.array().items(Joi.string()).optional()
        .messages({
            'array.base': 'Tags must be an array of strings.'
        }),
});

// Validation schema for creating an Affiliate
const createAffiliateBody = Joi.object({
    type: Joi.string().required()
        .messages({ 'any.required': 'Type is required.' }),
    codes: Joi.object().pattern(
        Joi.string(),
        Joi.string()
    ).required()
        .messages({ 'any.required': 'Codes are required.' }),
    sm: Joi.object().pattern(
        Joi.string(),
        SMDetailsSchema
    ).required()
        .messages({ 'any.required': 'SM details are required.' }),
});

// Validation schema for editing an Affiliate
const editAffiliateBody = Joi.object({
    type: Joi.string().optional()
        .messages({ 'string.base': 'Type must be a string.' }),
    codes: Joi.object().pattern(
        Joi.string(),
        Joi.string()
    ).optional()
        .messages({ 'object.base': 'Codes must be an object with string key-value pairs.' }),
    sm: Joi.object().pattern(
        Joi.string(),
        SMDetailsSchema
    ).optional()
        .messages({ 'object.base': 'SM details must be an object with valid SMDetails.' }),
}).or('type', 'codes', 'sm')
  .messages({
      'object.missing': 'At least one field must be provided for update.'
  });

// Validation schema for editing Affiliate parameters
const editAffiliateParams = Joi.object({
    id: Joi.string().uuid().required()
        .messages({ 
            'string.base': 'Affiliate ID must be a string.',
            'string.guid': 'Affiliate ID must be a valid UUID.',
            'any.required': 'Affiliate ID is required.' 
        }),
});

// Validation schema for listing Affiliates
const listAffiliateQuery = Joi.object({
    size: Joi.number().integer().min(1).default(10)
        .messages({ 
            'number.base': 'Size must be a number.',
            'number.integer': 'Size must be an integer.',
            'number.min': 'Size must be at least 1.'
        }),
    skip: Joi.number().integer().min(0).default(0)
        .messages({ 
            'number.base': 'Skip must be a number.',
            'number.integer': 'Skip must be an integer.',
            'number.min': 'Skip cannot be negative.'
        }),
    search: Joi.string().trim().allow("").optional()
        .messages({ 
            'string.base': 'Search must be a string.'
        }),
    sorting: Joi.string().trim().allow("").optional()
        .messages({ 
            'string.base': 'Sorting must be a string.'
        }),
});

// Validation schema for deleting multiple Affiliates
const editMultipleIdsBody = Joi.object({
    ids: Joi.array().items(Joi.string().uuid())
        .min(1)
        .required()
        .messages({ 
            'array.base': 'IDs must be an array of UUIDs.',
            'array.min': 'At least one ID is required.',
            'string.guid': 'Each ID must be a valid UUID.',
            'any.required': 'IDs are required.' 
        }),
});

// Middleware for validating Affiliate creation
export const validateCreateAffiliateBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createAffiliateBody, "body");

// Middleware for validating Affiliate editing
export const validateEditAffiliateBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editAffiliateBody, "body");

// Middleware for validating Affiliate editing parameters
export const validateEditAffiliateParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editAffiliateParams, "params");

// Middleware for validating Affiliate listing queries
export const validateListAffiliateQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listAffiliateQuery, "query");

// Middleware for validating deleting multiple Affiliates
export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
