import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

// Validation schema for creating a shipping history
const createShippingHistoryBody = Joi.object().keys({
    orderId: Joi.string().required()
        .messages({
            'any.required': 'Order ID is required.'
        }),
    shippingData: Joi.object().keys({
        date: Joi.date().required()
            .messages({
                'any.required': 'Shipping date is required.'
            }),
        activities: Joi.array().items(Joi.object().keys({
            status: Joi.string().required()
                .messages({
                    'any.required': 'Status is required.'
                }),
            trackingNumber: Joi.string().optional()
        })).required()
            .messages({
                'array.min': 'At least one shipping activity is required.'
            })
    }).required()
        .messages({
            'any.required': 'Shipping data is required.'
        }),
});

// Validation schema for editing a shipping history
const editShippingHistoryBody = Joi.object().keys({
    status: Joi.optional(),
    trackingNumber: Joi.optional(),
});

// Validation schema for editing shipping history parameters
const editShippingHistoryParams = Joi.object().keys({
    id: Joi.string().required()
        .messages({
            'any.required': 'Shipping history ID is required.'
        }),
});

// Validation schema for listing shipping history
const listShippingHistoryQuery = Joi.object().keys({
    size: Joi.number().required()
        .messages({
            'any.required': 'Size is required.'
        }),
    skip: Joi.number().required()
        .messages({
            'any.required': 'Skip is required.'
        }),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

// Middleware for validating create shipping history body
export const validateCreateShippingHistoryBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createShippingHistoryBody, "body");

// Middleware for validating edit shipping history body
export const validateEditShippingHistoryBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editShippingHistoryBody, "body");

// Middleware for validating edit shipping history parameters
export const validateEditShippingHistoryParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, editShippingHistoryParams, "params");

// Middleware for validating list shipping history query
export const validateListShippingHistoryQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, listShippingHistoryQuery, "query");
