import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const productValidationSchema = Joi.object({

    name: Joi.string().required().messages({
        'string.empty': 'Name is required',
    }),
    MOQ: Joi.number().integer().positive().required().messages({
        'number.base': 'MOQ must be a number',
        'number.positive': 'MOQ must be greater than 0',
    }),
    category: Joi.number().integer().positive().required().messages({
        'number.base': 'Category must be a number',
        'number.positive': 'Category must be greater than 0',
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Description is required',
    }),
    images: Joi.array().items(Joi.string().uri()).required().messages({
        'array.base': 'Images must be an array of URLs',
        'string.uri': 'Each image must be a valid URL',
    }),
    slug: Joi.string().required().messages({
        'string.empty': 'Slug is required',
    }),
    type: Joi.string().valid('retort', 'packaging').required().messages({
        'any.only': 'Type must be either "retort" or "packaging"',
    }),
    variationIds: Joi.array().items(Joi.number().integer()).required().messages({
        'array.base': 'Variation IDs must be an array of integers',
    })

});

const productList = Joi.object({
    page: Joi.number().integer().min(1).required().messages({
        'number.base': 'Page must be a number',
        'number.integer': 'Page must be an integer',
        'number.min': 'Page must be greater than or equal to 1',
    }),
    limit: Joi.number().integer().min(1).required().messages({
        'number.base': 'Limit must be a number',
        'number.integer': 'Limit must be an integer',
        'number.min': 'Limit must be greater than or equal to 1',
    }),
    search: Joi.string().optional().allow('').messages({
        'string.base': 'Search query must be a string.',
    }),
    filters: Joi.string().optional().allow('').messages({
        'string.base': 'Filters query must be a string.',
    })
});

const productById = Joi.object({
    id: Joi.number().integer().required().messages({
        'number.base': 'Id must be a number',
        'number.integer': 'Id must be an integer'
    })
});

const productUpdateValidationSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Name is required',
    }),
    MOQ: Joi.number().integer().positive().required().messages({
        'number.base': 'MOQ must be a number',
        'number.positive': 'MOQ must be greater than 0',
    }),
    category: Joi.number().integer().positive().required().messages({
        'number.base': 'Category must be a number',
        'number.positive': 'Category must be greater than 0',
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Description is required',
    }),
    images: Joi.array().items(Joi.string().uri()).required().messages({
        'array.base': 'Images must be an array of URLs',
        'string.uri': 'Each image must be a valid URL',
    }),
    slug: Joi.string().required().messages({
        'string.empty': 'Slug is required',
    }),
    type: Joi.string().valid('retort', 'packaging').required().messages({
        'any.only': 'Type must be either "retort" or "packaging"',
    }),
    variationIds: Joi.array().items(Joi.number().integer()).required().messages({
        'array.base': 'Variation IDs must be an array of integers',
    })

});

const productDeleteValidationSchema = Joi.object({
    id: Joi.number().integer().required().messages({
        'number.base': 'Id must be a number',
        'number.integer': 'Id must be an integer'
    })
})

const changeProductStatusValidationSchema = Joi.object({
    id: Joi.number().integer().required().messages({
        'number.base': 'Id must be a number',
        'number.integer': 'Id must be an integer'
    }),
    status: Joi.string()
        .valid('active', 'inactive')
        .required()
        .messages({
            'any.only': 'Status must be one of [active, inactive].',
            'any.required': 'Status is required.',
        }),
})

export const validateCreateProduct = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, productValidationSchema, 'body');

export const validateProductList = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, productList, 'query');

export const validateProductById = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, productById, 'params');

export const validateUpdateProduct = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, productUpdateValidationSchema, 'body');

export const validateDeleteProduct = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, productDeleteValidationSchema, 'params');

export const validateChangeProductStatus = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, changeProductStatusValidationSchema, 'body');