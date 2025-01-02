import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation schema for file upload
const fileUploadSchema = Joi.object({
    files: Joi.array()
        .items(
            Joi.string()
        )
        .optional()
        .messages({
            'array.base': 'Files are required.',
            'array.empty': 'Files cannot be empty.',
        }),
    name: Joi.string()
    .trim()
    .required()
    .messages({
        "string.base": "Name must be a string.",
        "string.empty": "Name cannot be empty.",
        "any.required": "Name is required.",
    }),
    message: Joi.string()
    .trim()
    .required()
    .messages({
        "string.base": "Message must be a string.",
        "string.empty": "Message cannot be empty.",
        "any.required": "Message is required.",
    }),
    subject: Joi.string()
    .trim()
    .required()
    .messages({
        "string.base": "Subject must be a string.",
        "string.empty": "Subject cannot be empty.",
        "any.required": "Subject is required.",
    }),
});

// Validation schema for deleting files
const deleteFileSchema = Joi.object({
    ids: Joi.array()
        .min(1)
        .required()
        .messages({
            'array.min': 'At least one file ID is required.',
            'any.required': 'File IDs are required.',
        }),
});

// Validation schema for listing files
const listFilesQuerySchema = Joi.object({
    size: Joi.number()
        .required()
        .messages({
            'any.required': 'Size is required.',
        }),
    skip: Joi.number()
        .required()
        .messages({
            'any.required': 'Skip is required.',
        }),
    search: Joi.string()
        .optional()
        .allow(""),
});

// Middleware for validating file upload
export const validateFileUpload = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, fileUploadSchema, "files");

// Middleware for validating delete file request
export const validateDeleteFiles = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, deleteFileSchema, "body");

// Middleware for validating list files query
export const validateListFilesQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listFilesQuerySchema, "query");
