import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const createPetPoojaParams = Joi.object().keys({
});

export const validatePetPoojaParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createPetPoojaParams, "query");