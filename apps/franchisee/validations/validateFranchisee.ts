import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries"; // Adjust import as necessary
import { FranchiseeAttributes } from "../../../interfaces"; // Adjust import as necessary

// Validation for creating a franchisee
const createFranchiseeBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Franchisee name is required.',
        }),
    ownerName: Joi.string().required()
        .messages({
            'any.required': 'Owner name is required.',
        }),
    contactEmail: Joi.array().items(Joi.string().email().required()).required()
        .messages({
            'any.required': 'Contact email is required.',
            'string.email': 'Please provide a valid email address.',
        }),
    franchiseLocations: Joi.array().items(Joi.object()).required()
        .messages({
            'any.required': 'Franchise locations are required.',
        }),
    establishedDate: Joi.date().iso().required()
        .messages({
            'date.iso': 'Established date must be in ISO format.',
            'any.required': 'Established date is required.',
        }),
    franchiseAgreementSignedDate: Joi.date().iso().required()
        .messages({
            'date.iso': 'Franchise agreement signed date must be in ISO format.',
            'any.required': 'Franchise agreement signed date is required.',
        }),
    franchiseType: Joi.string().required()
        .messages({
            'any.required': 'Franchise type is required.',
        }),
    numberOfEmployees: Joi.number().integer().required()
        .messages({
            'any.required': 'Number of employees is required.',
            'number.base': 'Number of employees must be an integer.',
        }),
    investmentAmount: Joi.number().required()
        .messages({
            'any.required': 'Investment amount is required.',
        }),
    royaltyPercentage: Joi.number().optional(),
    monthlyRevenue: Joi.number().optional(),
    numberOfOutlets: Joi.number().integer().optional(),
    menuSpecialty: Joi.string().optional(),
    businessHours: Joi.string().optional(),
    deliveryOptions: Joi.boolean().optional(),
    isActive: Joi.boolean().optional(),
});

// Validation for editing a franchisee
const editFranchiseeBody = Joi.object().keys({
    name: Joi.string().optional(),
    ownerName: Joi.string().optional(),
    contactEmail: Joi.array().items(Joi.string().email()).optional(),
    franchiseLocations: Joi.array().items(Joi.object()).optional(),
    establishedDate: Joi.date().iso().optional(),
    franchiseAgreementSignedDate: Joi.date().iso().optional(),
    franchiseType: Joi.string().optional(),
    numberOfEmployees: Joi.number().integer().optional(),
    investmentAmount: Joi.number().optional(),
    royaltyPercentage: Joi.number().optional(),
    monthlyRevenue: Joi.number().optional(),
    numberOfOutlets: Joi.number().integer().optional(),
    menuSpecialty: Joi.string().optional(),
    businessHours: Joi.string().optional(),
    deliveryOptions: Joi.boolean().optional(),
    isActive: Joi.boolean().optional(),
});

// Validation for franchisee ID in params
const editFranchiseeParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Franchisee ID is required.',
        }),
});

// Middleware functions for validations
export const validateCreateFranchiseeBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createFranchiseeBody, "body");

export const validateEditFranchiseeBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editFranchiseeBody, "body");

export const validateEditFranchiseeParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editFranchiseeParams, "params");
