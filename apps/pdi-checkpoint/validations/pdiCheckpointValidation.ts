import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Schema for PDI Checklist creation
const createPdiCheckpointBody = Joi.object().keys({
    title: Joi.string().required()
        .messages({
            'string.base': 'Title must be a string.',
            'any.required': 'Title is required.',
        }),
});

// Validation schema for editing a Area
const editCheckpointBody = Joi.object({
    title: Joi.string().optional().messages({
      'string.base': 'Area title must be a string.',
      'any.required': 'Title is required.',
    })
}).strict();

const editCheckpointParams = Joi.object({
    id: Joi.number().integer().required().messages({
      'any.required': 'Checkpoint ID is required.',
      'number.base': 'Checkpoint ID must be a number.',
    }),
}).strict();

const getCheckpointParams = Joi.object({
  id: Joi.number().integer().required().messages({
    'any.required': 'Checkpoint ID is required.',
    'number.base': 'Checkpoint ID must be a number.',
    'number.integer': 'Checkpoint ID must be an integer.',
  }),
}).strict();

const listCheckpointQuery = Joi.object({
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
export const validateCreatePdiCheckpointBody = (req: Request, res: Response, next: NextFunction) => {
    validateReq(req, res, next, createPdiCheckpointBody, 'body');
};

// Middleware for validating Area editing
export const validateEditCheckpointBody = (req: Request, res: Response, next: NextFunction) => {
    validateReq(req, res, next, editCheckpointBody, 'body');
  };

  // Middleware for validating Area parameters
  export const validateEditCheckpointParams = (req: Request, res: Response, next: NextFunction) => {
    validateReq(req, res, next, editCheckpointParams, 'params');
  };
  export const validateGetCheckpointParams = (req: Request, res: Response, next: NextFunction) => {
    validateReq(req, res, next, getCheckpointParams, 'params');
  };
  // Middleware for validating Area listing query parameters
  export const validateListCheckpointQuery = (req: Request, res: Response, next: NextFunction) => {
    validateReq(req, res, next, listCheckpointQuery, 'query');
  };

  // Middleware for validating multiple Area IDs for deletion
  export const validateDeleteMultipleIdsBody = (req: Request, res: Response, next: NextFunction) => {
    validateReq(req, res, next, editMultipleIdsBody, 'body');
  };

