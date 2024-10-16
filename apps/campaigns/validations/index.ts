import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation schema for creating an address
const createAddressBody = Joi.object().keys({
    street: Joi.string().required()
        .messages({ 'any.required': 'Street is required.' }),
    city: Joi.string().required()
        .messages({ 'any.required': 'City is required.' }),
    state: Joi.string().required()
        .messages({ 'any.required': 'State is required.' }),
    postalCode: Joi.string().required()
        .messages({ 'any.required': 'Postal code is required.' }),
    country: Joi.string().required()
        .messages({ 'any.required': 'Country is required.' }),
});

// Validation schema for editing an address
const editAddressBody = Joi.object().keys({
    street: Joi.string().optional()
        .messages({ 'any.required': 'Street is required.' }),
    city: Joi.string().optional()
        .messages({ 'any.required': 'City is required.' }),
    state: Joi.string().optional()
        .messages({ 'any.required': 'State is required.' }),
    postalCode: Joi.string().optional()
        .messages({ 'any.required': 'Postal code is required.' }),
    country: Joi.string().optional()
        .messages({ 'any.required': 'Country is required.' }),
});

// Validation schema for editing address parameters
const editAddressParams = Joi.object().keys({
    id: Joi.number().required()
        .messages({ 'any.required': 'Address ID is required.' }),
});

// Validation schema for listing addresses
const listAddressQuery = Joi.object().keys({
    size: Joi.number().required()
        .messages({ 'any.required': 'Size is required.' }),
    skip: Joi.number().required()
        .messages({ 'any.required': 'Skip is required.' }),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

// Validation schema for editing multiple addresses
const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required()
        .messages({ 
            'array.min': 'At least one ID is required.', 
            'any.required': 'IDs are required.' 
        }),
});

// Middleware for validating address creation
export const validateCreateAddressBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createAddressBody, "body");

// Middleware for validating address editing
export const validateEditAddressBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editAddressBody, "body");

// Middleware for validating address editing parameters
export const validateEditAddressParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editAddressParams, "params");

// Middleware for validating address listing queries
export const validateListAddressQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listAddressQuery, "query");

// Middleware for validating editing multiple addresses
export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");
