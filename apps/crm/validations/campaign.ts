import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { CAMPAIGN_STATUS } from '../../../interfaces/';

// Validation schema for sending campaign assignment
const sendCampaignAssignmentBody = Joi.object().keys({
    campaignId: Joi.number().required()
        .messages({
            'any.required': 'Campaign ID is required.'
        }),
});

// Validation schema for creating a campaign
const createCampaignBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Campaign name is required.'
        }),
    subject: Joi.string().required()
        .messages({
            'any.required': 'Subject is required.'
        }),
    body: Joi.string().required()
        .messages({
            'any.required': 'Body is required.'
        }),
    scheduledAt: Joi.date().iso().required()
        .messages({
            'any.required': 'Scheduled date is required.',
            'date.iso': 'Scheduled date must be in ISO format.'
        }),
    status: Joi.string().valid(...Object.values(CAMPAIGN_STATUS)).optional().allow('')
        .messages({
            'any.only': 'Status must be one of the predefined values.'
        }),
});

// Validation schema for editing a campaign
const editCampaignBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Campaign name is required.'
        }),
    subject: Joi.string().optional(),
    body: Joi.string().required()
        .messages({
            'any.required': 'Body is required.'
        }),
    scheduledAt: Joi.date().iso().required()
        .messages({
            'any.required': 'Scheduled date is required.',
            'date.iso': 'Scheduled date must be in ISO format.'
        }),
    status: Joi.string().valid(...Object.values(CAMPAIGN_STATUS)).optional().allow('')
        .messages({
            'any.only': 'Status must be one of the predefined values.'
        }),
});

// Validation schema for editing campaign parameters
const editCampaignParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Campaign ID is required.'
        }),
});

// Validation schema for listing campaigns
const listCampaignQuery = Joi.object().keys({
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

// Validation schema for editing multiple IDs
const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required()
        .messages({
            'array.min': 'At least one ID is required.'
        }),
});

// Middleware for validating send campaign assignment body
export const validateSendCampaignAssignmentBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, sendCampaignAssignmentBody, "body");

// Middleware for validating create campaign body
export const validateCreateCampaignBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createCampaignBody, "body");

// Middleware for validating edit campaign body
export const validateEditCampaignBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editCampaignBody, "body");

// Middleware for validating edit campaign parameters
export const validateEditCampaignParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editCampaignParams, "params");

// Middleware for validating list campaign query
export const validateListCampaignQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listCampaignQuery, "query");

// Middleware for validating edit multiple IDs body
export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
