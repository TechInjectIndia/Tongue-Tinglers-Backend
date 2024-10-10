import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Define the SeoImage schema for validation
const SeoImageSchema = Joi.object({
    url: Joi.string().required()
        .messages({
            'any.required': 'Image URL is required.',
        }),
    altText: Joi.string().required()
        .messages({
            'string.base': 'Alt text must be a string.',
            'any.required': 'Alt text is required.'
        }),
});

// Validation schema for creating a ProposalModel
const createProposalModelBody = Joi.object({
    title: Joi.string().required()
        .messages({ 'any.required': 'Title is required.' }),
    budget: Joi.number().precision(2).min(0).required()
        .messages({
            'number.base': 'Budget must be a number.',
            'number.precision': 'Budget can have up to two decimal places.',
            'number.min': 'Budget must be a positive number.',
            'any.required': 'Budget is required.'
        }),
    files: Joi.array().items(SeoImageSchema).min(1).required()
        .messages({
            'array.base': 'Files must be an array.',
            'array.min': 'At least one file is required.',
            'any.required': 'Files are required.'
        }),
});

// Validation schema for editing a ProposalModel
const editProposalModelBody = Joi.object({
    title: Joi.string().optional()
        .messages({ 'string.base': 'Title must be a string.' }),
    budget: Joi.number().precision(2).min(0).optional()
        .messages({
            'number.base': 'Budget must be a number.',
            'number.precision': 'Budget can have up to two decimal places.',
            'number.min': 'Budget must be a positive number.',
        }),
    files: Joi.array().items(SeoImageSchema).optional()
        .messages({
            'array.base': 'Files must be an array.',
        }),
}).or('title', 'budget', 'files') // At least one field must be provided for update
    .messages({
        'object.missing': 'At least one field must be provided for update.'
    });

// Validation schema for editing ProposalModel parameters
const editProposalModelParams = Joi.object({
    id: Joi.string().uuid().required()
        .messages({
            'string.base': 'ProposalModel ID must be a string.',
            'string.guid': 'ProposalModel ID must be a valid UUID.',
            'any.required': 'ProposalModel ID is required.'
        }),
});

// Validation schema for listing ProposalModels
const listProposalModelQuery = Joi.object({
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

// Validation schema for editing multiple ProposalModels
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

// Middleware for validating ProposalModel creation
export const validateCreateProposalModelBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createProposalModelBody, "body");

// Middleware for validating ProposalModel editing
export const validateEditProposalModelBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editProposalModelBody, "body");

// Middleware for validating ProposalModel editing parameters
export const validateEditProposalModelParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editProposalModelParams, "params");

// Middleware for validating ProposalModel listing queries
export const validateListProposalModelQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listProposalModelQuery, "query");

// Middleware for validating editing multiple ProposalModels
export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
