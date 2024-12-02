import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation schema for creating a user address
const createUserAddressSchema = Joi.object({
    title: Joi.string().optional().messages({
        'string.empty': 'title is required.',
        'any.required': 'title is required.',
    }),
    firstName: Joi.string().optional().messages({
        'string.empty': 'first name is required.',
        'any.required': 'first name is required.',
    }),
    lastName: Joi.string().optional().messages({
        'string.empty': 'last name is required.',
        'any.required': 'last name is required.',
    }),
    email: Joi.string().email().optional().messages({
        'string.empty': 'email is required.',
        'string.email': 'email must be a valid email.',
        'any.required': 'email is required.',
    }),
    phone: Joi.string().optional().messages({
        'string.empty': 'phone is required.',
        'any.required': 'phone is required.',
    }),
    gstin: Joi.optional(),
    address: Joi.string().optional().messages({
        'string.empty': 'address is required.',
        'any.required': 'address is required.',
    }),
    houseNo: Joi.string().optional().messages({
        'string.empty': 'address is required.',
        'any.required': 'address is required.',
    }),
    city: Joi.string().optional().messages({
        'string.empty': 'city is required.',
        'any.required': 'city is required.',
    }),
    state: Joi.string().optional().messages({
        'string.empty': 'state is required.',
        'any.required': 'state is required.',
    }),
    country: Joi.string().optional().messages({
        'string.empty': 'country is required.',
        'any.required': 'country is required.',
    }),
    zipCode: Joi.string().optional().messages({
        'string.empty': 'ZIP code is required.',
        'any.required': 'ZIP code is required.',
    }),
    isActive: Joi.boolean().optional().messages({
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
    id: Joi.string().optional().messages({
        'any.required': 'ID is required.',
    }),
});

// Middleware to validate the request params for deleting a user address
export const validateDeleteUserAddress = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, deleteUserAddressSchema, 'params');