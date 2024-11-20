import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const createOrganizationBody = Joi.object().keys({
  prospectId: Joi.string().required()
    .messages({ 'any.required': 'Prospect id is required.' }),

  name: Joi.string().required()
    .messages({ 'any.required': 'Organization name is required.' }),

  contactPersonName: Joi.string().required()
    .messages({ 'any.required': 'Contact person name is required.' }),

  contactNumber: Joi.string().required()
    .messages({ 'any.required': 'Contact number is required.' }),

  contactEmail: Joi.string().required()
    .messages({ 'any.required': 'Contact email is required.' }),

  street: Joi.string().required()
    .messages({ 'any.required': 'Street id is required.' }),

  city: Joi.string().required()
    .messages({ 'any.required': 'City id is required.' }),

  state: Joi.string().required()
    .messages({ 'any.required': 'State id is required.' }),

  country: Joi.string().required()
    .messages({ 'any.required': 'Country id is required.' }),

  postalCode: Joi.string().required()
    .messages({ 'any.required': 'Postal code id is required.' }),

  pan: Joi.string().optional().allow(null),
  gst: Joi.string().optional().allow(null),
  bankName: Joi.string().required()
    .messages({ 'any.required': 'Bank name is required.' }),
  bankAccountNumber: Joi.string().required()
    .messages({ 'any.required': 'Bank account number is required.' }),

  bankIFSCCode: Joi.string().required()
    .messages({ 'any.required': 'Bank ifsc code is required.' }),

  masterFranchiseId: Joi.number().optional().allow(null),

});

const editOrgParams = Joi.object().keys({
  id: Joi.string().required()
      .messages({
          'any.required': 'Organization ID is required.',
      }),
});

const listOrgQuery = Joi.object().keys({
  size: Joi.number().required()
      .messages({
          'any.required': 'Size is required.',
          'number.base': 'Size must be a number.',
      }),
  skip: Joi.number().required()
      .messages({
          'any.required': 'Skip is required.',
          'number.base': 'Skip must be a number.',
      }),
  search: Joi.string().optional().allow(""),
  sorting: Joi.string().optional().allow(""),
});

const editMultipleIdsBody = Joi.object().keys({
  ids: Joi.array().min(1).required()
      .messages({
          'array.min': 'At least one ID is required.',
          'any.required': 'IDs are required.',
      }),
});

// Middleware for validating campaign creation
export const validateCreateOrganizationBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, createOrganizationBody, "body");

export const validateEditOrgParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, editOrgParams, "params");

export const validateEditOrganizationBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, createOrganizationBody, "body");

export const validateListOrgQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, listOrgQuery, "query");

export const validateEditMultipleIdsBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");