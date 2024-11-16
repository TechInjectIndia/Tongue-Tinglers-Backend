import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import { validateReq } from '../../../libraries';

// Validation schema for creating a region
const createRegionBody = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'Region title is required.',
    'string.base': 'Region title must be a string.',
  }),
  area: Joi.array().items(Joi.number()).optional().allow(null).messages({
    'array.base': 'Area must be an array of numbers.',
    'array.items': 'Each area value must be a number.',
    'any.allowOnly': 'Area cannot be an object or a non-array value.',
  }),
}).strict();

// Validation schema for editing a region
const editRegionBody = Joi.object({
  title: Joi.string().optional().messages({
    'string.base': 'Region title must be a string.',
  }),
  area: Joi.array().items(Joi.number()).min(1).optional().messages({
    'array.base': 'Area must be an array of numbers.',
    'array.items': 'Each area value must be a number.',
    'array.min': 'At least one area value is required.',
  }),
}).strict();

// Validation schema for region parameters (e.g., for editing, deleting, or getting a region by ID)
const editRegionParams = Joi.object({
  id: Joi.number().required().messages({
    'any.required': 'Region ID is required.',
    'number.base': 'Region ID must be a number.',
  }),
}).strict();

// Validation schema for listing regions with pagination and filters
const listRegionQuery = Joi.object({
  size: Joi.number().integer().min(1).optional().messages({
    'number.base': 'Size must be a number.',
    'number.integer': 'Size must be an integer.',
  }),
  skip: Joi.number().integer().min(0).optional().messages({
    'number.base': 'Skip must be a number.',
    'number.integer': 'Skip must be an integer.',
  }),
  search: Joi.string().optional().allow('').messages({
    'string.base': 'Search query must be a string.',
  }),
}).strict();

// Validation schema for deleting multiple region IDs
const editMultipleIdsBody = Joi.object({
  ids: Joi.array().items(Joi.number()).min(1).required().messages({
    'array.min': 'At least one region ID is required.',
    'any.required': 'IDs are required.',
    'number.base': 'Each ID must be a number.',
  }),
}).strict();

// Middleware for validating region creation
export const validateCreateRegionBody = (req: Request, res: Response, next: NextFunction) => {
  validateReq(req, res, next, createRegionBody, 'body');
};

// Middleware for validating region editing
export const validateEditRegionBody = (req: Request, res: Response, next: NextFunction) => {
  validateReq(req, res, next, editRegionBody, 'body');
};

// Middleware for validating region parameters
export const validateEditRegionParams = (req: Request, res: Response, next: NextFunction) => {
  validateReq(req, res, next, editRegionParams, 'params');
};

// Middleware for validating region listing query parameters
export const validateListRegionQuery = (req: Request, res: Response, next: NextFunction) => {
  validateReq(req, res, next, listRegionQuery, 'query');
};

// Middleware for validating multiple region IDs for deletion
export const validateEditMultipleIdsBody = (req: Request, res: Response, next: NextFunction) => {
  validateReq(req, res, next, editMultipleIdsBody, 'body');
};
