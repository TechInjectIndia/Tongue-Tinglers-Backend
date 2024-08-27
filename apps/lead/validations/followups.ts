import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const todayFollowUpsParams = Joi.object().keys({
    start_date: Joi.string().required(),
    end_date: Joi.string().required(),
});

export const validateTodayFollowUpsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, todayFollowUpsParams, "params");