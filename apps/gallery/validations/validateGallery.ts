import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation schema for file upload
const fileUploadSchema = Joi.object({
    files: Joi.array()
        .items(
            Joi.object({
                originalname: Joi.string().required()
                    .messages({
                        'string.empty': 'File name cannot be empty.',
                    }),
                mimetype: Joi.string()
                    .valid('image/jpeg', 'image/png', 'application/pdf') // Adjust valid MIME types as needed
                    .required()
                    .messages({
                        'any.only': 'File type is not allowed. Acceptable types are .jpeg, .png, .pdf.',
                    }),
                size: Joi.number()
                    .max(5 * 1024 * 1024) // Set a max file size of 5MB
                    .required()
                    .messages({
                        'number.max': 'File size must not exceed 5MB.',
                    }),
            })
        )
        .required()
        .messages({
            'array.base': 'Files are required.',
            'array.empty': 'Files cannot be empty.',
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
