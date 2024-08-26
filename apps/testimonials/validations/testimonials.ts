import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const createTestimonialsBody = Joi.object().keys({
    testimonial_text: Joi.string().required(),
    rating: Joi.number().required(),
    date_submitted: Joi.string().required(),
    approved: Joi.number().required(),
    testimonial_type: Joi.string().required(),
});

export const validateCreateTestimonialsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createTestimonialsBody, "body");

const editTestimonialsBody = Joi.object().keys({
    testimonial_text: Joi.string().required(),
    rating: Joi.number().required(),
    date_submitted: Joi.string().required(),
    approved: Joi.number().required(),
    testimonial_type: Joi.string().required(),
});

export const validateEditTestimonialsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editTestimonialsBody, "body");

const editTestimonialsParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditTestimonialsParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editTestimonialsParams, "params");

const listTestimonialsQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListTestimonialsQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listTestimonialsQuery, "query");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

