import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import { validateReq } from '../../../libraries'; // Assuming you have a custom validation middleware

// Email validation schema
const emailSchema = Joi.object({
    to: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address.',
        'any.required': 'Recipient email is required.',
    }),
    subject: Joi.string().required().messages({
        'any.required': 'Subject is required.',
    }),
    body: Joi.string().required().messages({
        'any.required': 'Email body is required.',
    }),
    filePath: Joi.string().optional().allow(null, '').messages({
        'string.base': 'File path must be a string.',
    }),
    file: Joi.any().optional().messages({
        'any.required': 'A file or file path must be provided.',
    })
}).xor('file', 'filePath') // Ensure that either file or filePath is provided, but not both.

export const validateEmail = (req: Request, res: Response, next: NextFunction) => {
    validateReq(req, res, next, emailSchema, "body");
};
