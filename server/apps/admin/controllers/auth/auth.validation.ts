import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "helpers/api-validations";

const loginAdminBody = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const validateLoginAdminBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, loginAdminBody, "body");
