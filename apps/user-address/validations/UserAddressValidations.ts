import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation schema for creating a user address
const createUserAddressSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.empty': 'Billing title is required.',
        'any.required': 'Billing title is required.',
    }),
    firstName: Joi.string().required().messages({
        'string.empty': 'Billing first name is required.',
        'any.required': 'Billing first name is required.',
    }),
    lastName: Joi.string().required().messages({
        'string.empty': 'Billing last name is required.',
        'any.required': 'Billing last name is required.',
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Billing email is required.',
        'string.email': 'Billing email must be a valid email.',
        'any.required': 'Billing email is required.',
    }),
    phone: Joi.string().required().messages({
        'string.empty': 'Billing phone is required.',
        'any.required': 'Billing phone is required.',
    }),
    gstin: Joi.string().optional().messages({
        'string.empty': 'Billing GSTIN must be a string.',
    }),
    address: Joi.string().required().messages({
        'string.empty': 'Billing address is required.',
        'any.required': 'Billing address is required.',
    }),
    city: Joi.string().required().messages({
        'string.empty': 'Billing city is required.',
        'any.required': 'Billing city is required.',
    }),
    state: Joi.string().required().messages({
        'string.empty': 'Billing state is required.',
        'any.required': 'Billing state is required.',
    }),
    country: Joi.string().required().messages({
        'string.empty': 'Billing country is required.',
        'any.required': 'Billing country is required.',
    }),
    zipCode: Joi.string().required().messages({
        'string.empty': 'Billing ZIP code is required.',
        'any.required': 'Billing ZIP code is required.',
    }),
    isActive: Joi.boolean().required().messages({
        'any.required': 'The isActive field is required.',
        'boolean.base': 'The isActive field must be a boolean value.',
    })
});

// Middleware to validate the request body for creating a user address
export const validateCreateUserAddress = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createUserAddressSchema, 'body');

// Validation schema for updating a user address
const updateUserAddressSchema = createUserAddressSchema.fork(
    Object.keys(createUserAddressSchema.describe().keys),
    (schema) => schema.optional()
);

// Middleware to validate the request body for updating a user address
export const validateUpdateUserAddress = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, updateUserAddressSchema, 'body');

// Validation schema for deleting a user address by ID
const deleteUserAddressSchema = Joi.object({
    id: Joi.string().required().messages({
        'any.required': 'ID is required.',
    }),
});

// Middleware to validate the request params for deleting a user address
export const validateDeleteUserAddress = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, deleteUserAddressSchema, 'params');