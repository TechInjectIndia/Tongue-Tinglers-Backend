import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import { validateReq } from '../../../libraries';

// Validation schema for sending an email
const emailSchema = Joi.object({
    to: Joi.string().email().required().messages({
        'string.empty': `"to" cannot be an empty field`,
        'string.email': `"to" must be a valid email`,
        'any.required': `"to" is a required field`,
    }),
    subject: Joi.string().required().messages({
        'string.empty': `"subject" cannot be an empty field`,
        'any.required': `"subject" is a required field`,
    }),
    body: Joi.string().required().messages({
        'string.empty': `"body" cannot be an empty field`,
        'any.required': `"body" is a required field`,
    }),
    filePaths: Joi.string().custom((value, helpers) => {
        try {
            const parsed = JSON.parse(value);
            if (!Array.isArray(parsed)) {
                throw new Error('must be an array');
            }
            return parsed;
        } catch (e) {
            throw new Error('must be a valid JSON string');
        }
    }).optional(),
    files: Joi.array().optional(),
});

export const validateEmail = (req: Request, res: Response, next: NextFunction) => {
    validateReq(req, res, next, emailSchema, "body");
};
