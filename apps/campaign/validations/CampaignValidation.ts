import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation schema for creating a campaign
const createCampaignBody = Joi.object().keys({
  name: Joi.string().required()
    .messages({ 'any.required': 'Campaign name is required.' }),
  description: Joi.string().optional()
    .messages({ 'string.base': 'Description must be a string.' }),
  startDate: Joi.date().required()
    .messages({ 'any.required': 'Start date is required.' }),
  endDate: Joi.date().optional()
    .greater(Joi.ref('startDate'))
    .messages({ 'date.greater': 'End date must be after start date.' }),
  questions: Joi.array().items(
    Joi.object().keys({
      label: Joi.string().required().messages({ 'any.required': 'Label is required.' }),
      value: Joi.string().required().messages({ 'any.required': 'Value is required.' })
    })
  ).required()
    .messages({ 'any.required': 'Questions are required.' }),
});

// Validation schema for editing a campaign
const editCampaignBody = Joi.object().keys({
  name: Joi.string().optional()
    .messages({ 'string.base': 'Campaign name must be a string.' }),
  description: Joi.string().optional()
    .messages({ 'string.base': 'Description must be a string.' }),
  startDate: Joi.date().optional()
    .messages({ 'date.base': 'Start date must be a valid date.' }),
  endDate: Joi.date().optional()
    .greater(Joi.ref('startDate'))
    .messages({ 'date.greater': 'End date must be after start date.' }),
  questions: Joi.array().items(
    Joi.object().keys({
      label: Joi.string().required().messages({ 'any.required': 'Label is required.' }),
      value: Joi.string().required().messages({ 'any.required': 'Value is required.' })
    })
  ).optional()
    .messages({ 'array.base': 'Questions must be an array of objects.' }),
});

// Validation schema for editing campaign parameters
const editCampaignParams = Joi.object().keys({
  id: Joi.string().uuid().required()
    .messages({ 'any.required': 'Campaign ID is required.' }),
});

// Validation schema for listing campaigns
const listCampaignQuery = Joi.object().keys({
  size: Joi.number().integer().min(1).required()
    .messages({ 'any.required': 'Size is required.' }),
  skip: Joi.number().integer().min(0).required()
    .messages({ 'any.required': 'Skip is required.' }),
  search: Joi.string().optional().allow(""),
  sorting: Joi.string().optional().allow(""),
});

// Validation schema for deleting multiple campaigns
const deleteMultipleIdsBody = Joi.object().keys({
  ids: Joi.array().min(1).required()
    .messages({
      'array.min': 'At least one ID is required.',
      'any.required': 'IDs are required.'
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
