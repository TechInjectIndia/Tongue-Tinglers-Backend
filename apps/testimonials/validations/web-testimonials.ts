import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation for listing testimonials
const listTestimonialsQuery = Joi.object().keys({
    size: Joi.number().integer().min(1).required()
        .messages({
            'number.base': 'Size must be a number.',
            'number.integer': 'Size must be an integer.',
            'number.min': 'Size must be at least 1.',
            'any.required': 'Size is required.',
        }),
    skip: Joi.number().integer().min(0).required()
        .messages({
            'number.base': 'Skip must be a number.',
            'number.integer': 'Skip must be an integer.',
            'number.min': 'Skip must be 0 or greater.',
            'any.required': 'Skip is required.',
        }),
    rating: Joi.number().integer().min(1).max(5).required()
        .messages({
            'number.base': 'Rating must be a number.',
            'number.integer': 'Rating must be an integer.',
            'number.min': 'Rating must be at least 1.',
            'number.max': 'Rating must be at most 5.',
            'any.required': 'Rating is required.',
        }),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

// Middleware function for validating the query parameters
export const validateListTestimonialsQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listTestimonialsQuery, "query");
