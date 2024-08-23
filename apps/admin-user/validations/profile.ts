import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const editProfileParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditProfileParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editProfileParams, "params");

const editProfileBody = Joi.object().keys({
    email: Joi.string().email().required(),
    full_name: Joi.string().required(),
    contact_number: Joi.string().required(),
    phone_code: Joi.string().required(),
    address: Joi.string().required(),
    active: Joi.number().required(),
});

export const validateEditProfileBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editProfileBody, "body");

const editProfileProfileBody = Joi.object().keys({
    full_name: Joi.string().required(),
    contact_number: Joi.string().required(),
    phone_code: Joi.string().required(),
    address: Joi.string().required(),
});