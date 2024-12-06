import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { PRODUCT_CATEGORY_STATUS } from "../../../interfaces/products_category";

const productsCategoryValidationSchema = Joi.object({
    name: Joi.string()
    .min(3)
    .max(255)
    .required()
    .messages({
        "string.base": "Category name must be a string.",
        "string.empty": "Category name is required.",
        "string.min": "Category name must be at least 3 characters long.",
        "string.max": "Category name must not exceed 255 characters.",
    }),
    description: Joi.string()
        .allow(null, "")
        .max(500)
        .messages({
            "string.base": "Description must be a string.",
            "string.max": "Description must not exceed 500 characters.",
        }),
    slug: Joi.string()
        .required()
        .messages({
            "string.base": "Slug must be a string.",
            "any.required": "Slug is required.",
        })
});

const getAllProductsCategoryValidationSchema = Joi.object({
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
    })
});

const productsCategoryUpdateValidationSchema = Joi.object({
    name: Joi.string()
    .min(3)
    .max(255)
    .required()
    .messages({
        "string.base": "Category name must be a string.",
        "string.empty": "Category name is required.",
        "string.min": "Category name must be at least 3 characters long.",
        "string.max": "Category name must not exceed 255 characters.",
    }),
    description: Joi.string()
        .allow(null, "")
        .max(500)
        .messages({
            "string.base": "Description must be a string.",
            "string.max": "Description must not exceed 500 characters.",
        }), 
    slug: Joi.string()
    .required()
    .messages({
        "string.base": "Slug must be a string.",
        "any.required": "Slug is required.",
    }),
    status: Joi.string()
        .valid(...Object.values(PRODUCT_CATEGORY_STATUS))
        .required()
        .messages({
            "string.base": "Status must be a string.",
            "any.only": `Status must be one of [${Object.values(PRODUCT_CATEGORY_STATUS).join(", ")}].`,
            "any.required": "Status is required.",
        }),
});

const productsCategoryDeleteValidationSchema = Joi.object({
    status: Joi.string()
    .valid(...Object.values(PRODUCT_CATEGORY_STATUS))
    .required()
    .messages({
        "string.base": "Status must be a string.",
        "any.only": `Status must be one of [${Object.values(PRODUCT_CATEGORY_STATUS).join(", ")}].`,
        "any.required": "Status is required.",
    }),
})

const getProductsCategoryByIdValidateSchema = Joi.object({
    id: Joi.number().integer().required().messages({
        'number.base': 'Id must be a number',
        'number.integer': 'Id must be an integer'
    }),
})

const getProductsCategoryBySlugValidationSchema = Joi.object({
    slug: Joi.string().required().messages({
        'string.base': 'Slug must be a string',
        'any.required': 'Slug is required',
    }),
});

const updateSatusValidationSchema = Joi.object({
    status: Joi.string()
    .valid(...Object.values(PRODUCT_CATEGORY_STATUS))
    .required()
    .messages({
        "string.base": "Status must be a string.",
        "any.only": `Status must be one of [${Object.values(PRODUCT_CATEGORY_STATUS).join(", ")}].`,
        "any.required": "Status is required.",
    }),
})

export const validateCreateProductsCategory = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, productsCategoryValidationSchema, 'body');

export const validateGetAllProductsCategory = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, getAllProductsCategoryValidationSchema, 'query');

export const validateUpdateProductsCategory = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, productsCategoryUpdateValidationSchema, 'body');

export const validateDeleteProductsCategory = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, productsCategoryDeleteValidationSchema, 'params');

export const validateGetProductsCategoryById = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, getProductsCategoryByIdValidateSchema, 'params');

export const validateGetProductsCategoryBySlug = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, getProductsCategoryBySlugValidationSchema, 'params');

export const validateUpdateStatus = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, updateSatusValidationSchema, 'body');

