import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const createTaxRatePayload = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.base": `"Title" should be a type of 'text'.`,
            "string.empty": `"Title" cannot be empty.`,
            "string.min": `"Title" should have a minimum length of {#limit}.`,
            "string.max": `"Title" should have a maximum length of {#limit}.`,
            "any.required": `"Title" is required.`,
        }),
    value: Joi.number()
        .positive()
        .required()
        .messages({
            "number.base": `"Value" should be a number.`,
            "number.positive": `"Value" must be a positive number.`,
            "any.required": `"Value" is required.`,
        }),
});

// Validation for listing tax rates
export const listTaxRateSchema = Joi.object({
    query: Joi.object({
        page: Joi.number().integer().min(1).optional(),
        limit: Joi.number().integer().min(1).optional(),
        search: Joi.string().optional(),
        filters: Joi.object().optional(),
    }),
});

// Validation for getting a tax rate by ID
export const getTaxRateSchema = Joi.object({
    params: Joi.object({
        id: Joi.string().required().messages({
            "string.base": `"ID" should be a string.`,
            "string.empty": `"ID" cannot be empty.`,
            "any.required": `"ID" is required.`,
        }),
    }),
});

// Validation for updating a tax rate
export const updateTaxRateSchema = Joi.object({
    params: Joi.object({
        id: Joi.string().required().messages({
            "string.base": `"ID" should be a string.`,
            "string.empty": `"ID" cannot be empty.`,
            "any.required": `"ID" is required.`,
        }),
    }),
    body: Joi.object({
        title: Joi.string().min(3).max(100).optional(),
        value: Joi.number().positive().optional(),
    }),
});

// Validation for deleting a tax rate
export const deleteTaxRateSchema = Joi.object({
    query: Joi.object({
        id: Joi.string().required().messages({
            "string.base": `"ID" should be a string.`,
            "string.empty": `"ID" cannot be empty.`,
            "any.required": `"ID" is required.`,
        }),
    }),
});



export const validateCreateTaxRatePayload = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createTaxRatePayload, "body");

export const validateListTaxRateSchema = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listTaxRateSchema, "query");

export const validateGetTaxRateSchema = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, getTaxRateSchema, "params");

export const validateUpdateTaxRateSchema = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, updateTaxRateSchema, "body");