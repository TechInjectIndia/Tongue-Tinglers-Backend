import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { REVIEWS_ITEM_TYPE, REVIEW_FILTERS } from '../../../interfaces';

// Validation for creating a review
const createReviewsBody = Joi.object().keys({
    review_text: Joi.string().required()
        .messages({
            'any.required': 'Review text is required.'
        }),
    rating: Joi.number().integer().min(0).max(5).required()
        .messages({
            'number.base': 'Rating must be an integer.',
            'number.min': 'Rating must be at least 0.',
            'number.max': 'Rating must be at most 5.',
            'any.required': 'Rating is required.'
        }),
    item_id: Joi.number().required()
        .messages({
            'any.required': 'Item ID is required.'
        }),
    item_type: Joi.string().valid(...Object.values(REVIEWS_ITEM_TYPE)).optional().allow('')
        .messages({
            'any.only': `Item type must be one of: ${Object.values(REVIEWS_ITEM_TYPE).join(', ')}.`
        }),
});

// Validation for editing a review
const editReviewsBody = Joi.object().keys({
    review_text: Joi.string().required()
        .messages({
            'any.required': 'Review text is required.'
        }),
    review_date: Joi.date().required()
        .messages({
            'any.required': 'Review date is required.'
        }),
    rating: Joi.number().integer().min(0).max(5).required()
        .messages({
            'number.base': 'Rating must be an integer.',
            'number.min': 'Rating must be at least 0.',
            'number.max': 'Rating must be at most 5.',
            'any.required': 'Rating is required.'
        }),
    approved: Joi.number().valid(...Object.values(REVIEW_FILTERS)).optional().allow('')
        .messages({
            'any.only': `Approved status must be one of: ${Object.values(REVIEW_FILTERS).join(', ')}.`
        }),
});

// Validation for editing review parameters
const editReviewsParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Review ID is required.'
        }),
});

// Validation for listing reviews
const listReviewsQuery = Joi.object().keys({
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

// Validation for editing multiple reviews
const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required()
        .messages({
            'array.min': 'At least one ID is required.',
            'any.required': 'IDs are required.'
        }),
});

// Middleware for creating review validation
export const validateCreateReviewsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createReviewsBody, "body");

// Middleware for editing review validation
export const validateEditReviewsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editReviewsBody, "body");

// Middleware for editing review parameters validation
export const validateEditReviewsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editReviewsParams, "params");

// Middleware for listing reviews validation
export const validateListReviewsQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listReviewsQuery, "query");

// Middleware for editing multiple reviews validation
export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
