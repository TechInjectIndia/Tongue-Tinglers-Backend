import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation schema for editing multiple region IDs
const editMultipleIdsBody = Joi.object().keys({
  ids: Joi.array().items(Joi.string().uuid()).min(1).required()
    .messages({
      'array.min': 'At least one region ID is required.',
      'any.required': 'IDs are required.'
    }),
});

// Validation schema for creating a region
const createRegionBody = Joi.object().keys({
  name: Joi.string().required()
    .messages({ 'any.required': 'Region name is required.' }),
  code: Joi.string().required()
    .messages({ 'any.required': 'Region code is required.' }),
  description: Joi.string().optional().allow(null, '')
    .messages({ 'string.base': 'Description must be a string.' }),
  isActive: Joi.boolean().optional()
    .messages({ 'boolean.base': 'isActive must be a boolean.' }),
});

// Validation schema for editing a region
const editRegionBody = Joi.object().keys({
  name: Joi.string().optional()
    .messages({ 'string.base': 'Region name must be a string.' }),
  code: Joi.string().optional()
    .messages({ 'string.base': 'Region code must be alphanumeric.' }),
  description: Joi.string().optional().allow(null, '')
    .messages({ 'string.base': 'Description must be a string.' }),
  isActive: Joi.boolean().optional()
    .messages({ 'boolean.base': 'isActive must be a boolean.' }),
});

// Validation schema for region parameters (e.g., for editing or deleting a specific region)
const editRegionParams = Joi.object().keys({
  id: Joi.string().uuid().required()
    .messages({ 'any.required': 'Region ID is required.' }),
});

// Validation schema for listing regions with pagination and filtering options
const listRegionQuery = Joi.object().keys({
  size: Joi.number().integer().min(1).optional()
    .messages({ 'number.base': 'Size must be an integer.' }),
  skip: Joi.number().integer().min(0).optional()
    .messages({ 'number.base': 'Skip must be an integer.' }),
  search: Joi.string().optional().allow(""),
  sorting: Joi.string().optional().allow(""),
});

// Validation schema for deleting multiple region IDs
const deleteMultipleIdsBody = Joi.object().keys({
  ids: Joi.array().items(Joi.string().uuid()).min(1).required()
    .messages({
      'array.min': 'At least one region ID is required.',
      'any.required': 'IDs are required.'
    }),
});

// Middleware for validating region creation
export const validateCreateRegionBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, createRegionBody, "body");

// Middleware for validating region editing
export const validateEditRegionBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, editRegionBody, "body");

// Middleware for validating region editing parameters
export const validateEditRegionParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, editRegionParams, "params");

// Middleware for validating region listing queries
export const validateListRegionQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, listRegionQuery, "query");

// Middleware for validating multiple region deletions
export const validateDeleteMultipleIdsBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, deleteMultipleIdsBody, "body");

// Middleware for validating editing multiple region IDs
export const validateEditMultipleIdsBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");