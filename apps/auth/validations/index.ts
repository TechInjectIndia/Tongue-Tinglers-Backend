import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const loginBody = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required(),
});

export const validateLoginBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, loginBody, "body");

const changePasswordBody = Joi.object().keys({
    old_password: Joi.string().required(),
    new_password: Joi.string().required(),
});

export const validateChangePasswordBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, changePasswordBody, "body");