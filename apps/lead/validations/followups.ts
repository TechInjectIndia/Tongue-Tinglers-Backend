import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const todayFollowUpsParams = Joi.object().keys({
    start_date: Joi.date().iso().required(),
    end_date: Joi.date().iso().min(Joi.ref('start_date')).required()
});

export const validateTodayFollowUpsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, todayFollowUpsParams, "query");