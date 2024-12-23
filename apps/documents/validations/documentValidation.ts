import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Define schema for a single document
const documentSchema = Joi.object({
    entity_id: Joi.number().required().messages({
        "any.required": "entity_id is required",
        "number.base": "entity_id must be a number",
    }),
    doc_name: Joi.string().required().messages({
        "any.required": "doc_name is required",
        "string.base": "doc_name must be a string",
    }),
    link: Joi.string().uri().required().messages({
        "any.required": "link is required",
        "string.uri": "link must be a valid URI",
    }),
});

// Define schema for the overall request body
const requestBodySchema = Joi.object().pattern(
    Joi.string(), // Keys (like 'franchise', 'organisation') can be any string
    Joi.array().items(documentSchema).required() // Each key maps to an array of documents
).messages({
    "object.pattern.match": "The request body must have valid keys with arrays of documents",
    "array.base": "Each key must have an array of document objects",
});

const documentById = Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "Id must be a number",
      "number.integer": "Id must be an integer",
    }),
});

export const validateDocument = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, requestBodySchema, 'body');

export const validateDocumentById = (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, documentById, "params");