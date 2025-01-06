import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Schema for PDI Checklist creation
const createIChecklistBody = Joi.object().keys({
    title: Joi.string().required()
        .messages({
            'string.base': 'Title must be a string.',
            'any.required': 'Title is required.',
        }),
        checkPoints: Joi.array()
        .items(Joi.number().required())
        .required()
        .messages({
            'array.base': 'CheckPoints must be an array of numbers.',
            'any.required': 'CheckPoints are required.',
            'array.includes': 'Each item in CheckPoints must be a number.',
        }),

        franchiseModelId: Joi.number().required()
    .messages({
        'number.base': 'Franchise must be a number.',
        'any.required': 'Franchise is required.',
    }),
});



// Validation schema for editing a Area
const editChecklistBody = Joi.object({
    title: Joi.string().required()
    .messages({
        'string.base': 'Title must be a string.',
        'any.required': 'Title is required.',
    }),
    checkPoints: Joi.array()
    .items(Joi.number().required())
    .required()
    .messages({
        'array.base': 'CheckPoints must be an array of numbers.',
        'any.required': 'CheckPoints are required.',
        'array.includes': 'Each item in CheckPoints must be a number.',
    }),

    franchiseModelId: Joi.number().required()
    .messages({
        'number.base': 'Franchise must be a number.',
        'any.required': 'Franchise is required.',
    }),
}).strict();

const editChecklistParams = Joi.object({
    id: Joi.number().required().messages({
      'any.required': 'Checklist ID is required.',
      'number.base': 'Checklist ID must be a number.',
    }),
}).strict();

const listChecklistQuery = Joi.object({
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

const editMultipleIdsBody = Joi.object({
ids: Joi.array().items(Joi.number()).min(1).required().messages({
    'array.min': 'At least one Checkpoint ID is required.',
    'any.required': 'IDs are required.',
    'number.base': 'Each ID must be a number.',
}),
}).strict();



// Middleware for validating Area creation
export const validateCreateIChecklistBody = (req: Request, res: Response, next: NextFunction) => {
    validateReq(req, res, next, createIChecklistBody, 'body');
};

// Middleware for validating Area editing
export const validateEditChecklistBody = (req: Request, res: Response, next: NextFunction) => {
    validateReq(req, res, next, editChecklistBody, 'body');
  };

  // Middleware for validating Area parameters
  export const validateEditCheckpointParams = (req: Request, res: Response, next: NextFunction) => {
    validateReq(req, res, next, editChecklistParams, 'params');
  };

  // Middleware for validating Area listing query parameters
  export const validateListChecklistQuery = (req: Request, res: Response, next: NextFunction) => {
    validateReq(req, res, next, listChecklistQuery, 'query');
  };

  // Middleware for validating multiple Area IDs for deletion
  export const validateDeleteMultipleIdsBody = (req: Request, res: Response, next: NextFunction) => {
    validateReq(req, res, next, editMultipleIdsBody, 'body');
  };

