import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { TESTIMONIAL_ITEM_TYPE, APPROVED_FILTERS } from '../../../interfaces';

// Validation for creating a testimonial
const createTestimonialsBody = Joi.object().keys({
    testimonial_text: Joi.string().required()
        .messages({
            'any.required': 'Testimonial text is required.'
        }),
    rating: Joi.number().min(1).max(5).required()
        .messages({
            'number.base': 'Rating must be a number.',
            'number.min': 'Rating must be at least 1.',
            'number.max': 'Rating must be at most 5.',
            'any.required': 'Rating is required.'
        }),
    date_submitted: Joi.date().required()
        .messages({
            'any.required': 'Date submitted is required.'
        }),
    approved: Joi.number().valid(...Object.values(APPROVED_FILTERS)).optional()
        .messages({
            'any.only': `Approved status must be one of: ${Object.values(APPROVED_FILTERS).join(', ')}.`
        }),
    item_id: Joi.number().required()
        .messages({
            'any.required': 'Item ID is required.'
        }),
    item_type: Joi.string().valid(...Object.values(TESTIMONIAL_ITEM_TYPE)).optional().allow('')
        .messages({
            'any.only': `Item type must be one of: ${Object.values(TESTIMONIAL_ITEM_TYPE).join(', ')}.`
        }),
});

// Validation for editing a testimonial
const editTestimonialsBody = Joi.object().keys({
    testimonial_text: Joi.string().required()
        .messages({
            'any.required': 'Testimonial text is required.'
        }),
    rating: Joi.number().min(1).max(5).required()
        .messages({
            'number.base': 'Rating must be a number.',
            'number.min': 'Rating must be at least 1.',
            'number.max': 'Rating must be at most 5.',
            'any.required': 'Rating is required.'
        }),
    date_submitted: Joi.date().required()
        .messages({
            'any.required': 'Date submitted is required.'
        }),
    approved: Joi.number().valid(...Object.values(APPROVED_FILTERS)).optional()
        .messages({
            'any.only': `Approved status must be one of: ${Object.values(APPROVED_FILTERS).join(', ')}.`
        }),
});

// Validation for editing testimonial parameters
const editTestimonialsParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Testimonial ID is required.'
        }),
});

// Validation for listing testimonials
const listTestimonialsQuery = Joi.object().keys({
    size: Joi.number().integer().min(1).required()
        .messages({
            'number.base': 'Size must be a number.',
            'number.min': 'Size must be at least 1.',
            'any.required': 'Size is required.',
        }),
    skip: Joi.number().integer().min(0).required()
        .messages({
            'number.base': 'Skip must be a number.',
            'number.min': 'Skip must be 0 or greater.',
            'any.required': 'Skip is required.',
        }),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

// Validation for editing multiple testimonials
const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required()
        .messages({
            'array.min': 'At least one ID is required.',
            'any.required': 'IDs are required.'
        }),
});

// Middleware functions for validations
export const validateCreateTestimonialsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createTestimonialsBody, "body");

export const validateEditTestimonialsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editTestimonialsBody, "body");

export const validateEditTestimonialsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editTestimonialsParams, "params");

export const validateListTestimonialsQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listTestimonialsQuery, "query");

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
