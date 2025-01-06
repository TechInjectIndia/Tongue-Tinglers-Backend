import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import {IPdiChecklistStatus} from "../interface/PdiCheckList";

// Schema for PDI Checklist creation
const createPdiChecklistBody = Joi.object().keys({
    franchiseeId: Joi.string().required()
        .messages({
            'any.required': 'Franchisee ID is required.',
        }),
    checklistName: Joi.string().required()
        .messages({
            'any.required': 'Checklist Name is required.',
        }),
    pdiDate: Joi.date().iso().required()
        .messages({
            'date.iso': 'PDI Date must be in ISO format.',
            'any.required': 'PDI Date is required.',
        }),
    status: Joi.string().valid(...Object.values(IPdiChecklistStatus))
        .required()
        .messages({
            'any.only': `Status must be one of: ${Object.values(IPdiChecklistStatus).join(', ')}.`,
            'any.required': 'Status is required.',
        }),
    items: Joi.array().items(Joi.object()).required()
        .messages({
            'any.required': 'Items are required.',
        }),
});

// Schema for PDI Checklist update
const updatePdiChecklistBody = Joi.object().keys({
    checklistName: Joi.string().required()
        .messages({
            'any.required': 'Checklist Name is required.',
        }),
    pdiDate: Joi.date().iso().required()
        .messages({
            'date.iso': 'PDI Date must be in ISO format.',
            'any.required': 'PDI Date is required.',
        }),
    status: Joi.string().valid(...Object.values(IPdiChecklistStatus))
        .required()
        .messages({
            'any.only': `Status must be one of: ${Object.values(IPdiChecklistStatus).join(', ')}.`,
            'any.required': 'Status is required.',
        }),
    items: Joi.array().items(Joi.object()).required()
        .messages({
            'any.required': 'Items are required.',
        }),
});

// Schema for updating a PDI Checklist by ID
const updatePdiChecklistParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'PDI Checklist ID is required.',
        }),
});

// Schema for getting a PDI Checklist by ID
const getPdiChecklistParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'PDI Checklist ID is required.',
        }),
});

// Schema for deleting PDI Checklists
const deletePdiChecklistBody = Joi.object().keys({
    ids: Joi.array().min(1).required()
        .messages({
            'array.min': 'At least one ID is required.',
            'any.required': 'IDs are required.',
        }),
});

// Middleware functions for validations
export const validateCreatePdiChecklistBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createPdiChecklistBody, "body");

export const validateUpdatePdiChecklistBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, updatePdiChecklistBody, "body");

export const validateUpdatePdiChecklistParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, updatePdiChecklistParams, "params");

export const validateGetPdiChecklistParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, getPdiChecklistParams, "params");

export const validateDeletePdiChecklistBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, deletePdiChecklistBody, "body");
