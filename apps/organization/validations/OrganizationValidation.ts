import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const createOrganizationBody = Joi.object().keys({

  name: Joi.string().required()
    .messages({ 'any.required': 'Organization name is required.' }),

  contactPersonName: Joi.string().required()
    .messages({ 'any.required': 'Contact person name is required.' }),

  prospectId: Joi.string().required()
    .messages({ 'any.required': 'Prospect id is required.' }),

  street: Joi.string().required()
    .messages({ 'any.required': 'Street id is required.' }),

  city: Joi.string().required()
    .messages({ 'any.required': 'City id is required.' }),

  postalCode: Joi.string().required()
    .messages({ 'any.required': 'Postal code id is required.' }),

  state: Joi.string().required()
    .messages({ 'any.required': 'State id is required.' }),

  country: Joi.string().required()
    .messages({ 'any.required': 'Country id is required.' }),

  contactNumber: Joi.string().required()
    .messages({ 'any.required': 'Contact number is required.' }),
  contactEmail: Joi.string().required()
    .messages({ 'any.required': 'Contact email is required.' }),
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

// Middleware for validating campaign creation
export const validateCreateOrganizationBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, createOrganizationBody, "body");
