import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const createZohoSignParams = Joi.object().keys({
});

export const validateZohoSignParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createZohoSignParams, "query");