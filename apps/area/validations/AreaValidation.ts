import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import { validateReq } from '../../../libraries';

// Validation schema for creating a Area
const createAreaBody = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'Area title is required.',
    'string.base': 'Area title must be a string.',
  }),
  area: Joi.array().items(Joi.number()).optional().allow(null).messages({
    'array.base': 'Area must be an array of numbers.',
    'array.items': 'Each area value must be a number.',
    'any.allowOnly': 'Area cannot be an object or a non-array value.',
  }),
}).strict();

// Validation schema for editing a Area
const editAreaBody = Joi.object({
  title: Joi.string().optional().messages({
    'string.base': 'Area title must be a string.',
  }),
  area: Joi.array().items(Joi.number()).min(1).optional().messages({
    'array.base': 'Area must be an array of numbers.',
    'array.items': 'Each area value must be a number.',
    'array.min': 'At least one area value is required.',
  }),
}).strict();

// Validation schema for Area parameters (e.g., for editing, deleting, or getting a Area by ID)
const editAreaParams = Joi.object({
  id: Joi.number().required().messages({
    'any.required': 'Area ID is required.',
    'number.base': 'Area ID must be a number.',
  }),
}).strict();

// Validation schema for listing Areas with pagination and filters
const listAreaQuery = Joi.object({
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

// Validation schema for deleting multiple Area IDs
const editMultipleIdsBody = Joi.object({
  ids: Joi.array().items(Joi.number()).min(1).required().messages({
    'array.min': 'At least one Area ID is required.',
    'any.required': 'IDs are required.',
    'number.base': 'Each ID must be a number.',
  }),
}).strict();

// Middleware for validating Area creation
export const validateCreateAreaBody = (req: Request, res: Response, next: NextFunction) => {
  validateReq(req, res, next, createAreaBody, 'body');
};

// Middleware for validating Area editing
export const validateEditAreaBody = (req: Request, res: Response, next: NextFunction) => {
  validateReq(req, res, next, editAreaBody, 'body');
};

// Middleware for validating Area parameters
export const validateEditAreaParams = (req: Request, res: Response, next: NextFunction) => {
  validateReq(req, res, next, editAreaParams, 'params');
};

// Middleware for validating Area listing query parameters
export const validateListAreaQuery = (req: Request, res: Response, next: NextFunction) => {
  validateReq(req, res, next, listAreaQuery, 'query');
};

// Middleware for validating multiple Area IDs for deletion
export const validateEditMultipleIdsBody = (req: Request, res: Response, next: NextFunction) => {
  validateReq(req, res, next, editMultipleIdsBody, 'body');
};
