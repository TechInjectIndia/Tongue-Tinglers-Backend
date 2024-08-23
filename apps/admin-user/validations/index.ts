import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const listFranchiseeQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
    trashOnly: Joi.string().optional().allow("").valid("true", ""),
});
export const validateListFranchiseeQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listFranchiseeQuery, "query");

const createFranchiseeBody = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    full_name: Joi.string().required(),
    contact_number: Joi.string().required(),
    phone_code: Joi.string().required(),
    address: Joi.string().required(),
    active: Joi.number().required(),
});

export const validateCreateFranchiseeBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createFranchiseeBody, "body");

const editFranchiseeParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditFranchiseeParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editFranchiseeParams, "params");

const editFranchiseeBody = Joi.object().keys({
    email: Joi.string().email().required(),
    full_name: Joi.string().required(),
    contact_number: Joi.string().required(),
    phone_code: Joi.string().required(),
    address: Joi.string().required(),
    active: Joi.number().required(),
});

export const validateEditFranchiseeBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editFranchiseeBody, "body");

const editFranchiseeProfileBody = Joi.object().keys({
    full_name: Joi.string().required(),
    contact_number: Joi.string().required(),
    phone_code: Joi.string().required(),
    address: Joi.string().required(),
});

export const validateEditFranchiseeProfileBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editFranchiseeProfileBody, "body");

const createRoleBody = Joi.object().keys({
    name: Joi.string().required(),
    role_permissions: Joi.string(),
    active: Joi.number().required(),
});

export const validateCreateRoleBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createRoleBody, "body");

const editRoleBody = Joi.object().keys({
    name: Joi.string().required(),
    role_permissions: Joi.string(),
    active: Joi.number().required(),
});

export const validateEditRoleBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editRoleBody, "body");

const editRoleParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditRoleParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editRoleParams, "params");

const listRoleQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListRoleQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listRoleQuery, "query");

const listAdminQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
    trashOnly: Joi.string().optional().allow("").valid("true", ""),
});

export const validateListAdminQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listAdminQuery, "query");

const createAdminBody = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    full_name: Joi.string().required(),
    contact_number: Joi.string().required(),
    phone_code: Joi.string().required(),
    role: Joi.number().required(),
    address: Joi.string().required(),
    active: Joi.number().required(),
});

export const validateCreateAdminBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createAdminBody, "body");

const editAdminParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditAdminParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editAdminParams, "params");

const editAdminBody = Joi.object().keys({
    email: Joi.string().email().required(),
    full_name: Joi.string().required(),
    contact_number: Joi.string().required(),
    phone_code: Joi.string().required(),
    role: Joi.number().required(),
    address: Joi.string().required(),
    active: Joi.number().required(),
});

export const validateEditAdminBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editAdminBody, "body");

const editAdminProfileBody = Joi.object().keys({
    full_name: Joi.string().required(),
    contact_number: Joi.string().required(),
    phone_code: Joi.string().required(),
    address: Joi.string().required(),
});

export const validateEditAdminProfileBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editAdminProfileBody, "body");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

const createPermissionBody = Joi.object().keys({
    name: Joi.string().required(),
    active: Joi.number().required(),
});

export const validateCreatePermissionBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createPermissionBody, "body");

const editPermissionBody = Joi.object().keys({
    name: Joi.string().required(),
    active: Joi.number().required(),
});

export const validateEditPermissionBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editPermissionBody, "body");

const editPermissionParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditPermissionParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editPermissionParams, "params");

const listPermissionQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListPermissionQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listPermissionQuery, "query");