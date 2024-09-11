import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const createAdminBody = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required(),
    userName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    status: Joi.string().required(),
    role: Joi.number().required(),
});

export const validateCreateAdminBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createAdminBody, "body");