import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Define the SeoImage schema for validation
const SeoImageSchema = Joi.object({
    url: Joi.string().uri().required()
        .messages({
            'string.base': 'Image URL must be a string.',
            'string.uri': 'Image URL must be a valid URI.',
            'any.required': 'Image URL is required.'
        }),
    altText: Joi.string().required()
        .messages({
            'string.base': 'Alt text must be a string.',
            'any.required': 'Alt text is required.'
        }),
});

// Define the ExtraFields schema for validation
const ExtraFieldsSchema = Joi.object().pattern(
    Joi.string(),
    Joi.string()
).optional();

// Validation schema for creating a FranchiseModel
const createFranchiseModelBody = Joi.object({
    description: Joi.string().required()
        .messages({ 'any.required': 'Description is required.' }),
    title: Joi.string().required()
        .messages({ 'any.required': 'Title is required.' }),
    reqArea: Joi.number().integer().min(0).required()
        .messages({ 
            'number.base': 'Required area must be a number.',
            'number.integer': 'Required area must be an integer.',
            'number.min': 'Required area must be a positive number.',
            'any.required': 'Required area is required.'
        }),
    images: Joi.array().items(SeoImageSchema).min(1).required()
        .messages({
            'array.base': 'Images must be an array.',
            'array.min': 'At least one image is required.',
            'any.required': 'Images are required.'
        }),
    investment: Joi.number().precision(2).min(0).required()
        .messages({ 
            'number.base': 'Investment must be a number.',
            'number.precision': 'Investment can have up to two decimal places.',
            'number.min': 'Investment must be a positive number.',
            'any.required': 'Investment is required.'
        }),
    runningCost: Joi.number().precision(2).min(0).required()
        .messages({ 
            'number.base': 'Running cost must be a number.',
            'number.precision': 'Running cost can have up to two decimal places.',
            'number.min': 'Running cost must be a positive number.',
            'any.required': 'Running cost is required.'
        }),
    bestFor: Joi.array().items(Joi.string().trim().min(1)).min(1).required()
        .messages({
            'array.base': 'BestFor must be an array of strings.',
            'array.min': 'At least one category is required in BestFor.',
            'string.base': 'Each category in BestFor must be a string.',
            'string.empty': 'Categories in BestFor cannot be empty strings.',
            'any.required': 'BestFor is required.'
        }),
    inclusions: Joi.array().items(Joi.string().trim().min(1)).min(1).required()
        .messages({
            'array.base': 'Inclusions must be an array of strings.',
            'array.min': 'At least one inclusion is required.',
            'string.base': 'Each inclusion must be a string.',
            'string.empty': 'Inclusions cannot contain empty strings.',
            'any.required': 'Inclusions are required.'
        }),
    others: ExtraFieldsSchema,
});

// Validation schema for editing a FranchiseModel
const editFranchiseModelBody = Joi.object({
    description: Joi.string().optional()
        .messages({ 'string.base': 'Description must be a string.' }),
    title: Joi.string().optional()
        .messages({ 'string.base': 'Title must be a string.' }),
    reqArea: Joi.number().integer().min(0).optional()
        .messages({ 
            'number.base': 'Required area must be a number.',
            'number.integer': 'Required area must be an integer.',
            'number.min': 'Required area must be a positive number.'
        }),
    images: Joi.array().items(SeoImageSchema).min(1).optional()
        .messages({
            'array.base': 'Images must be an array.',
            'array.min': 'At least one image is required.',
        }),
    investment: Joi.number().precision(2).min(0).optional()
        .messages({ 
            'number.base': 'Investment must be a number.',
            'number.precision': 'Investment can have up to two decimal places.',
            'number.min': 'Investment must be a positive number.',
        }),
    runningCost: Joi.number().precision(2).min(0).optional()
        .messages({ 
            'number.base': 'Running cost must be a number.',
            'number.precision': 'Running cost can have up to two decimal places.',
            'number.min': 'Running cost must be a positive number.',
        }),
    bestFor: Joi.array().items(Joi.string().trim().min(1)).min(1).optional()
        .messages({
            'array.base': 'BestFor must be an array of strings.',
            'array.min': 'At least one category is required in BestFor.',
            'string.base': 'Each category in BestFor must be a string.',
            'string.empty': 'Categories in BestFor cannot be empty strings.',
        }),
    inclusions: Joi.array().items(Joi.string().trim().min(1)).min(1).optional()
        .messages({
            'array.base': 'Inclusions must be an array of strings.',
            'array.min': 'At least one inclusion is required.',
            'string.base': 'Each inclusion must be a string.',
            'string.empty': 'Inclusions cannot contain empty strings.',
        }),
    others: ExtraFieldsSchema,
}).or('description', 'title', 'reqArea', 'images', 'investment', 'runningCost', 'bestFor', 'inclusions', 'others')
  .messages({
      'object.missing': 'At least one field must be provided for update.'
  });

// Validation schema for editing FranchiseModel parameters
const editFranchiseModelParams = Joi.object({
    id: Joi.string().uuid().required()
        .messages({ 
            'string.base': 'FranchiseModel ID must be a string.',
            'string.guid': 'FranchiseModel ID must be a valid UUID.',
            'any.required': 'FranchiseModel ID is required.' 
        }),
});

// Validation schema for listing FranchiseModels
const listFranchiseModelQuery = Joi.object({
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

// Validation schema for editing multiple FranchiseModels
const editMultipleIdsBody = Joi.object({
    ids: Joi.array().items(Joi.string().uuid())
        .min(1)
        .required()
        .messages({ 
            'array.base': 'IDs must be an array.',
            'array.min': 'At least one ID is required.',
            'string.guid': 'Each ID must be a valid UUID.',
            'any.required': 'IDs are required.' 
        }),
});

// Middleware for validating FranchiseModel creation
export const validateCreateFranchiseModelBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createFranchiseModelBody, "body");

// Middleware for validating FranchiseModel editing
export const validateEditFranchiseModelBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editFranchiseModelBody, "body");

// Middleware for validating FranchiseModel editing parameters
export const validateEditFranchiseModelParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editFranchiseModelParams, "params");

// Middleware for validating FranchiseModel listing queries
export const validateListFranchiseModelQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listFranchiseModelQuery, "query");

// Middleware for validating editing multiple FranchiseModels
export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
