import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const loginCustomerBody = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required(),
});

export const validateLoginCustomerBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, loginCustomerBody, "body");