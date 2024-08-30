import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const editSettingsParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditSettingsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editSettingsParams, "params");

const editSettingsBody = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    full_name: Joi.string().required(),
    contact_number: Joi.string().required(),
    phone_code: Joi.string().required(),
    address: Joi.string().required(),
    active: Joi.number().required(),
});

export const validateEditSettingsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editSettingsBody, "body");

const editSettingsSettingsBody = Joi.object().keys({
    full_name: Joi.string().required(),
    contact_number: Joi.string().required(),
    phone_code: Joi.string().required(),
    address: Joi.string().required(),
});