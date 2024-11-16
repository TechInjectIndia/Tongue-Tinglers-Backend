import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation schema for creating a campaign submission
const createCampaignSubmissionBody = Joi.object().keys({
  campaignId: Joi.string().uuid().required()
    .messages({
      'any.required': 'ID is required.',
      'string.base': 'ID must be a valid UUID.'
    }),
  response: Joi.string().required()
    .messages({
      'any.required': 'Response is required.',
      'string.base': 'Response must be a string.'
    }),
});

// Middleware for validating campaign submission creation
export const validateCreateCampaignBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, createCampaignSubmissionBody, "body");

// Additional validation for listing campaigns (if needed)
const listCampaignQuery = Joi.object().keys({
  size: Joi.number().integer().min(1).required()
    .messages({ 'any.required': 'Size is required.' }),
  skip: Joi.number().integer().min(0).required()
    .messages({ 'any.required': 'Skip is required.' }),
  search: Joi.string().optional().allow(""),
  sorting: Joi.string().optional().allow(""),
});

// Middleware for validating campaign listing queries
export const validateListCampaignQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, listCampaignQuery, "query");

// Validation for editing campaign parameters (if needed)
const editCampaignParams = Joi.object().keys({
  id: Joi.string().required()
    .messages({
      'any.required': 'ID is required.',
      'string.base': 'ID must be a valid UUID.'
    }),
});

// Middleware for validating campaign editing parameters
export const validateEditCampaignParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, editCampaignParams, "params");

// Validation schema for deleting multiple campaigns
const deleteMultipleIdsBody = Joi.object().keys({
  ids: Joi.array().min(1).required()
    .messages({
      'array.min': 'At least one ID is required.',
      'any.required': 'IDs are required.'
    }),
});

// Middleware for validating deleting multiple campaigns
export const validateDeleteMultipleIdsBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, deleteMultipleIdsBody, "body");