import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation schema for creating a user address
const createUserAddressSchema = Joi.object({
    billingTitle: Joi.string().required().messages({
        'string.empty': 'Billing title is required.',
        'any.required': 'Billing title is required.',
    }),
    billingFirstName: Joi.string().required().messages({
        'string.empty': 'Billing first name is required.',
        'any.required': 'Billing first name is required.',
    }),
    billingLastName: Joi.string().required().messages({
        'string.empty': 'Billing last name is required.',
        'any.required': 'Billing last name is required.',
    }),
    billingEmail: Joi.string().email().required().messages({
        'string.empty': 'Billing email is required.',
        'string.email': 'Billing email must be a valid email.',
        'any.required': 'Billing email is required.',
    }),
    billingPhone: Joi.string().required().messages({
        'string.empty': 'Billing phone is required.',
        'any.required': 'Billing phone is required.',
    }),
    billingGstin: Joi.string().optional().messages({
        'string.empty': 'Billing GSTIN must be a string.',
    }),
    billingAddress: Joi.string().required().messages({
        'string.empty': 'Billing address is required.',
        'any.required': 'Billing address is required.',
    }),
    billingCity: Joi.string().required().messages({
        'string.empty': 'Billing city is required.',
        'any.required': 'Billing city is required.',
    }),
    billingState: Joi.string().required().messages({
        'string.empty': 'Billing state is required.',
        'any.required': 'Billing state is required.',
    }),
    billingCountry: Joi.string().required().messages({
        'string.empty': 'Billing country is required.',
        'any.required': 'Billing country is required.',
    }),
    billingZipCode: Joi.string().required().messages({
        'string.empty': 'Billing ZIP code is required.',
        'any.required': 'Billing ZIP code is required.',
    }),

    shippingTitle: Joi.string().required().messages({
        'string.empty': 'Shipping title is required.',
        'any.required': 'Shipping title is required.',
    }),
    shippingFirstName: Joi.string().required().messages({
        'string.empty': 'Shipping first name is required.',
        'any.required': 'Shipping first name is required.',
    }),
    shippingLastName: Joi.string().required().messages({
        'string.empty': 'Shipping last name is required.',
        'any.required': 'Shipping last name is required.',
    }),
    shippingEmail: Joi.string().email().required().messages({
        'string.empty': 'Shipping email is required.',
        'string.email': 'Shipping email must be a valid email.',
        'any.required': 'Shipping email is required.',
    }),
    shippingPhone: Joi.string().required().messages({
        'string.empty': 'Shipping phone is required.',
        'any.required': 'Shipping phone is required.',
    }),
    shippingGstin: Joi.string().optional().messages({
        'string.empty': 'Shipping GSTIN must be a string.',
    }),
    shippingAddress: Joi.string().required().messages({
        'string.empty': 'Shipping address is required.',
        'any.required': 'Shipping address is required.',
    }),
    shippingCity: Joi.string().required().messages({
        'string.empty': 'Shipping city is required.',
        'any.required': 'Shipping city is required.',
    }),
    shippingState: Joi.string().required().messages({
        'string.empty': 'Shipping state is required.',
        'any.required': 'Shipping state is required.',
    }),
    shippingCountry: Joi.string().required().messages({
        'string.empty': 'Shipping country is required.',
        'any.required': 'Shipping country is required.',
    }),
    shippingZipCode: Joi.string().required().messages({
        'string.empty': 'Shipping ZIP code is required.',
        'any.required': 'Shipping ZIP code is required.',
    }),
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