import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation schema for creating a dynamic form question
const createDynamicFormBody = Joi.object().keys({
  question: Joi.string().required()
    .messages({ 'any.required': 'Question is required.' }),
  type: Joi.string().valid('boolean', 'string', 'multi_choice', 'single_choice', 'number').required()
    .messages({
      'any.required': 'Type is required.',
      'any.only': 'Type must be one of [boolean, string, multi_choice, single_choice, number].'
    }),
  required: Joi.boolean().required()
    .messages({ 'any.required': 'Required field is required.' }),
  options: Joi.array().items(Joi.string()).optional().allow(null) // Allowing options to be optional or null
    .messages({ 'array.base': 'Options must be an array of strings.' }),
});

// Validation schema for editing a dynamic form question
const editDynamicFormBody = Joi.object().keys({
  question: Joi.string().optional()
    .messages({ 'any.required': 'Question is required.' }),
  type: Joi.string().valid('boolean', 'string', 'multi_choice', 'single_choice', 'number').optional()
    .messages({
      'any.only': 'Type must be one of [boolean, string, multi_choice, single_choice, number].'
    }),
  required: Joi.boolean().optional(),
  options: Joi.array().items(Joi.string()).optional().allow(null)
    .messages({ 'array.base': 'Options must be an array of strings.' }),
});

// Validation schema for editing dynamic form question parameters
const editDynamicFormParams = Joi.object().keys({
  id: Joi.string().uuid().required()
    .messages({ 'any.required': 'Dynamic Form Question ID is required.' }),
});

// Validation schema for listing dynamic form questions
const listDynamicFormQuery = Joi.object().keys({
  size: Joi.number().integer().min(1).required()
    .messages({ 'any.required': 'Size is required.' }),
  skip: Joi.number().integer().min(0).required()
    .messages({ 'any.required': 'Skip is required.' }),
  search: Joi.string().optional().allow(""),
  sorting: Joi.string().optional().allow(""),
});

// Validation schema for editing multiple dynamic form question IDs
const editMultipleIdsBody = Joi.object().keys({
  ids: Joi.array().min(1).required()
    .messages({
      'array.min': 'At least one ID is required.',
      'any.required': 'IDs are required.'
    }),
});

// Middleware for validating dynamic form question creation
export const validateCreateDynamicFormBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, createDynamicFormBody, "body");

// Middleware for validating dynamic form question editing
export const validateEditDynamicFormBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, editDynamicFormBody, "body");

// Middleware for validating dynamic form question editing parameters
export const validateEditDynamicFormParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, editDynamicFormParams, "params");

// Middleware for validating dynamic form question listing queries
export const validateListDynamicFormQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, listDynamicFormQuery, "query");

// Middleware for validating editing multiple dynamic form questions
export const validateEditMultipleIdsBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
