import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation schema for creating a campaign
const createCampaignBody = Joi.object().keys({
    name: Joi.string()
        .required()
        .messages({ "any.required": "Campaign name is required." }),
    organizationId: Joi.number().required(),
    regionId: Joi.number()
        .required()
        .messages({ "any.required": "Region Id are required." }),
    description: Joi.string()
        .optional()
        .messages({ "string.base": "Description must be a string." }),
    questionList: Joi.array()
        .items(
            Joi.number()
                .required()
                .messages({ "any.required": "Question ID is required." })
        )
        .required()
        .messages({ "any.required": "Questions are required." }),
    affiliateId: Joi.number().optional().allow(null),
    proposalIds: Joi.array()
        .items(
            Joi.number()
                .required()
                .messages({ "any.required": "proposal Id is required." })
        )
        .required()
        .messages({ "any.required": "proposals are required." }),
    start: Joi.date().required().messages({
        "any.required": "The start date is required.",
        "date.base": "The start date must be a valid date.",
    }),
    to: Joi.date().required().messages({
        "any.required": "The to date is required.",
        "date.base": "The to date must be a valid date.",
    }),
});

// Validation schema for editing a campaign
const editCampaignBody = Joi.object({
    name: Joi.string()
        .optional()
        .messages({ "string.base": "Campaign name must be a string." }),

    organizationId: Joi.number()
        .messages({ "number.base": "Organization ID must be a number." }),

    regionId: Joi.number()
        .allow(null)
        .messages({ "number.base": "Region ID must be a number." }),

    description: Joi.string()
        .optional()
        .messages({ "string.base": "Description must be a string." }),

    questionList: Joi.array()
        .items(
            Joi.any().messages({ "any.required": "Question ID is required." })
        )
        .optional()
        .messages({ "array.base": "Questions must be an array." }),

    affiliateId: Joi.number()
        .allow(null)
        .messages({ "number.base": "Affiliate ID must be a number." }),

    proposalIds: Joi.array()
        .items(
            Joi.number()
                .required()
                .messages({ "number.base": "Proposal ID must be a number.", "any.required": "Proposal ID is required." })
        )
        .required()
        .messages({ "array.base": "Proposals must be an array.", "any.required": "Proposals are required." }),

    start: Joi.date()
        .required()
        .messages({
            "any.required": "The start date is required.",
            "date.base": "The start date must be a valid date.",
        }),

    to: Joi.date()
        .required()
        .messages({
            "any.required": "The to date is required.",
            "date.base": "The to date must be a valid date.",
        }),
});


// Validation schema for editing campaign parameters
const editCampaignParams = Joi.object().keys({
    id: Joi.number()
        .required()
        .messages({ "any.required": "Campaign ID is required." }),
});

// Validation schema for listing campaigns
const listCampaignQuery = Joi.object().keys({
    size: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({ "any.required": "Size is required." }),
    skip: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({ "any.required": "Skip is required." }),
    search: Joi.string()
        .optional()
        .allow("")
        .messages({ "string.base": "Search must be a string." }),
    sorting: Joi.string()
        .optional()
        .allow("")
        .valid(
            "id ASC",
            "id DESC",
            "name ASC",
            "name DESC",
            "createdAt ASC",
            "createdAt DESC"
        )
        .messages({
            "any.only":
                "Sorting must be one of id ASC, id DESC, name ASC, name DESC, createdAt ASC, createdAt DESC.",
        }),
    organizationId: Joi.number()
        .messages({ "number.base": "Organization ID must be a number." }),
    region: Joi.string()
        .optional()
        .allow("")
        .messages({ "string.base": "Region must be a string." }),
    trashOnly: Joi.string()
        .optional()
        .allow("")
        .valid("true", "false")
        .messages({
            "any.only": 'TrashOnly must be either "true" or "false".',
        }),
});

// Validation schema for deleting multiple campaigns
const deleteMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required().messages({
        "array.min": "At least one ID is required.",
        "any.required": "IDs are required.",
    }),
});

// Middleware for validating campaign creation
export const validateCreateCampaignBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createCampaignBody, "body");

// Middleware for validating campaign editing
export const validateEditCampaignBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editCampaignBody, "body");

// Middleware for validating campaign editing parameters
export const validateEditCampaignParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editCampaignParams, "params");

// Middleware for validating campaign listing queries
export const validateListCampaignQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listCampaignQuery, "query");

// Middleware for validating deleting multiple campaigns
export const validateDeleteMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, deleteMultipleIdsBody, "body");
