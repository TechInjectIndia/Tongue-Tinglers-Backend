import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { IPdiChecklistStatus } from '../../../interfaces';


const checkPointsData = Joi.object().keys({
  key: Joi.number().required(),
  value: Joi.boolean().required(),
});
// Schema for PDI Checklist creation
const createIChecklistBody = Joi.object().keys({
    checkpoints: Joi.array().items(checkPointsData).required(),
    prospectId: Joi.number().required()
    .messages({
        'number.base': 'Prospect must be a number.',
        'any.required': 'Prospect is required.',
    }),
});



// Validation schema for editing a Area
const editChecklistBody = Joi.object({
    checkpoints: Joi.array().items(checkPointsData).required(),
    prospectId: Joi.number().required()
    .messages({
        'number.base': 'Prospect must be a number.',
        'any.required': 'Prospect is required.',
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

const idValidationSchema = Joi.object({
  id: Joi.number().required().messages({
    "number.base": "ID must be a number",
    "any.required": "ID is required",
  }),
});

const isValidateProspectId = Joi.object({
  prospectId: Joi.number().required().messages({
    "number.base": "Prospect ID must be a number",
    "any.required": "Prospect ID is required",
  }),
});

export const validateProspectId = (req: Request, res: Response, next: NextFunction) => {
  const { error } = isValidateProspectId.validate(req.params);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const { error } = idValidationSchema.validate(req.params);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};



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
  