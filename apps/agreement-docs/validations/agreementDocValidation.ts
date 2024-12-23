import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { ENTITY_TYPE_AGREEMENT } from "../../../interfaces/agreement-docs";

const createAgreementDocSchema = Joi.object({
    agreement_id: Joi.string().required().messages({
        "string.base": "Agreement ID must be a string.",
        "string.empty": "Agreement ID cannot be empty.",
        "any.required": "Agreement ID is required.",
    }),
    doc_link: Joi.string().uri().required().messages({
        "string.base": "Document link must be a string.",
        "string.empty": "Document link cannot be empty.",
        "string.uri": "Document link must be a valid URI.",
        "any.required": "Document link is required.",
    }),
    entity_id: Joi.string().required().messages({
        "string.base": "Entity ID must be a string.",
        "string.empty": "Entity ID cannot be empty.",
        "any.required": "Entity ID is required.",
    }),
    entity_type: Joi.string()
        .valid(
            ENTITY_TYPE_AGREEMENT.FRANCHISE,
            ENTITY_TYPE_AGREEMENT.ORGANISATION,
            ENTITY_TYPE_AGREEMENT.PROSPECT
        ) // Replace with actual valid types
        .required()
        .messages({
            "string.base": "Entity type must be a string.",
            "any.only":
                "Entity type must be one of the allowed values: type1, type2, type3.",
            "any.required": "Entity type is required.",
        }),
    signed_date: Joi.date().iso().optional().messages({
        "date.base": "Signed date must be a valid date.",
        "date.format": "Signed date must be in ISO format.",
    }),
    error: Joi.string().allow(null).optional().messages({
        "string.base": "Error must be a string.",
    }),
});

const getAgreementDocSchema = Joi.object({
    entity_id: Joi.number().integer().positive().required().messages({
        "number.base": "Entity ID must be a number.",
        "number.integer": "Entity ID must be an integer.",
        "number.positive": "Entity ID must be a positive number.",
        "any.required": "Entity ID is required.",
    }),
    entity_type: Joi.string()
        .valid(
            ENTITY_TYPE_AGREEMENT.FRANCHISE,
            ENTITY_TYPE_AGREEMENT.ORGANISATION,
            ENTITY_TYPE_AGREEMENT.PROSPECT
        ) // Replace with your valid entity types
        .required()
        .messages({
            "string.base": "Entity type must be a string.",
            "any.only":
                "Entity type must be one of the allowed values: type1, type2, type3.",
            "any.required": "Entity type is required.",
        }),
});

const getAgreementDocByIdSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        "number.base": "The ID must be a number.",
        "number.integer": "The ID must be an integer.",
        "number.positive": "The ID must be a positive number.",
        "any.required": "The ID is required.",
    }),
});

const getAllAgreementDocSchema = Joi.object({
    page: Joi.number().integer().positive().required().messages({
        "number.base": "Page must be a number.",
        "number.integer": "Page must be an integer.",
        "number.positive": "Page must be a positive number.",
        "any.required": "Page is required.",
    }),
    limit: Joi.number().integer().positive().required().messages({
        "number.base": "Limit must be a number.",
        "number.integer": "Limit must be an integer.",
        "number.positive": "Limit must be a positive number.",
        "any.required": "Limit is required.",
    }),
});

const updateAgreementDocSchema = Joi.object({
    agreement_id: Joi.string().optional().messages({
        "string.base": "Agreement ID must be a string.",
    }),
    doc_link: Joi.string().uri().optional().messages({
        "string.base": "Document link must be a string.",
        "string.uri": "Document link must be a valid URI.",
    }),
    entity_id: Joi.string().optional().messages({
        "string.base": "Entity ID must be a string.",
    }),
    entity_type: Joi.string()
        .valid(
            ENTITY_TYPE_AGREEMENT.FRANCHISE,
            ENTITY_TYPE_AGREEMENT.ORGANISATION,
            ENTITY_TYPE_AGREEMENT.PROSPECT
        ) // Replace with your valid entity types
        .optional()
        .messages({
            "string.base": "Entity type must be a string.",
            "any.only":
                "Entity type must be one of the allowed values: type1, type2, type3.",
        }),
    signed_date: Joi.date().iso().optional().messages({
        "date.base": "Signed date must be a valid date.",
        "date.format": "Signed date must be in ISO format.",
    }),
    error: Joi.string().allow(null).optional().messages({
        "string.base": "Error must be a string.",
    }),
});

export const validateCreateAgreementDoc = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createAgreementDocSchema, "body");

export const validateGetAgreementDocById = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, getAgreementDocByIdSchema, "params");

export const validateGetAgreementDoc = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, getAgreementDocSchema, "query");

export const validateGetAllAgreementDoc = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, getAllAgreementDocSchema, "query");

export const validateUpdateAgreementDoc = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, updateAgreementDocSchema, "body");
