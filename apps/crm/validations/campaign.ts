import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { CAMPAIGN_STATUS } from '../../../interfaces/';

const campaignAssignmentBody = Joi.object().keys({
    campaignId: Joi.number().required(),
    subscriberId: Joi.number().required(),
});

export const validateCampaignAssignmentBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, campaignAssignmentBody, "body");

const sendCampaignAssignmentBody = Joi.object().keys({
    campaignId: Joi.number().required(),
});

export const validatesendCampaignAssignmentBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, sendCampaignAssignmentBody, "body");

const createCampaignBody = Joi.object().keys({
    name: Joi.string().required(),
    subject: Joi.string().required(),
    body: Joi.string().required(),
    scheduledAt: Joi.date().iso().required(),
    status: Joi.string().valid(...Object.values(CAMPAIGN_STATUS)).optional().allow(''),
});

export const validateCreateCampaignBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createCampaignBody, "body");

const editCampaignBody = Joi.object().keys({
    name: Joi.string().required(),
    subject: Joi.string(),
    body: Joi.string().required(),
    scheduledAt: Joi.date().iso().required(),
    status: Joi.string().valid(...Object.values(CAMPAIGN_STATUS)).optional().allow(''),
});

export const validateEditCampaignBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editCampaignBody, "body");

const editCampaignParams = Joi.object().keys({
    id: Joi.string().required(),
});

export const validateEditCampaignParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editCampaignParams, "params");

const listCampaignQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export const validateListCampaignQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listCampaignQuery, "query");

const editMultipleIdsBody = Joi.object().keys({
    ids: Joi.array().min(1).required(),
});

export const validateEditMultipleIdsBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editMultipleIdsBody, "body");

