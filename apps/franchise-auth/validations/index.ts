import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const loginFranchiseBody = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const validateLoginFranchiseBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, loginFranchiseBody, "body");