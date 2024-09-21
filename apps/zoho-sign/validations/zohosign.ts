import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation schema for Zoho Sign parameters
const createZohoSignParams = Joi.object().keys({
    // Add any required parameters here
});

// Middleware function for validating the request parameters
export const validateZohoSignParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createZohoSignParams, "query");
