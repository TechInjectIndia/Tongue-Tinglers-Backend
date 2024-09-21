import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation for creating a role
const createRoleBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Role name is required.',
        }),
    description: Joi.string().required()
        .messages({
            'any.required': 'Description is required.',
        }),
    role_permissions: Joi.string().required()
        .messages({
            'any.required': 'Role permissions are required.',
        }),
    active: Joi.boolean().required()
        .messages({
            'any.required': 'Active status is required.',
        }),
});

// Validation for editing a role
const editRoleBody = Joi.object().keys({
    name: Joi.string().required()
        .messages({
            'any.required': 'Role name is required.',
        }),
    description: Joi.string().required()
        .messages({
            'any.required': 'Description is required.',
        }),
    role_permissions: Joi.string().required()
        .messages({
            'any.required': 'Role permissions are required.',
        }),
    active: Joi.boolean().required()
        .messages({
            'any.required': 'Active status is required.',
        }),
});

// Validation for editing role params
const editRoleParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Role ID is required.',
        }),
});

// Validation for listing roles
const listRoleQuery = Joi.object().keys({
    size: Joi.number().integer().min(1).required()
        .messages({
            'number.base': 'Size must be a number.',
            'number.min': 'Size must be at least 1.',
            'any.required': 'Size is required.',
        }),
    skip: Joi.number().integer().min(0).required()
        .messages({
            'number.base': 'Skip must be a number.',
            'number.min': 'Skip must be 0 or greater.',
            'any.required': 'Skip is required.',
        }),
});

// Validation for deleting multiple roles
const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required()
        .messages({
            'array.min': 'At least one ID is required.',
            'any.required': 'IDs are required.',
        }),
});

// Middleware functions for validations
export const validateCreateRoleBody = async (req: Request, res: Response, next: NextFunction) =>
    validateReq(req, res, next, createRoleBody, "body");

export const validateEditRoleBody = async (req: Request, res: Response, next: NextFunction) =>
    validateReq(req, res, next, editRoleBody, "body");

export const validateEditRoleParams = async (req: Request, res: Response, next: NextFunction) =>
    validateReq(req, res, next, editRoleParams, "params");

export const validateListRoleQuery = async (req: Request, res: Response, next: NextFunction) =>
    validateReq(req, res, next, listRoleQuery, "query");

export const validateEditMultipleIdsBody = async (req: Request, res: Response, next: NextFunction) =>
    validateReq(req, res, next, editMultipleIdsBody, "body");
