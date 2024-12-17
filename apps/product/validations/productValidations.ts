import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const productValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  MOQ: Joi.number().integer().positive().required().messages({
    "number.base": "MOQ must be a number",
    "number.positive": "MOQ must be greater than 0",
  }),
  category: Joi.number().integer().positive().required().messages({
    "number.base": "Category must be a number",
    "number.positive": "Category must be greater than 0",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required",
  }),
  images: Joi.array().items(Joi.string().uri()).required().messages({
    "array.base": "Images must be an array of URLs",
    "string.uri": "Each image must be a valid URL",
  }),
  slug: Joi.string().required().messages({
    "string.empty": "Slug is required",
  }),
  type: Joi.string().valid("retort", "packaging").required().messages({
    "any.only": 'Type must be either "retort" or "packaging"',
  }),
  status:Joi.string().valid("active", "inactive").required().messages({
    "any.only": 'Status must be either "active" or "inactive"',
  }),
  tax_rate_id:Joi.number().integer().positive().required().messages({
    "number.base": "Tax Rate ID must be a number",
    "number.positive": "Tax Rate ID must be greater than 0",
  }),
  vendorId:Joi.number().integer().positive().required().messages({
    "number.base": "Vendor ID must be a number",
    "number.positive": "Vendor ID must be greater than 0",
  }),
  variations: Joi.array()
    .items(
      Joi.object({
        optionValueId: Joi.number().integer().positive().required().messages({
          "number.base": "Option Value ID must be a number",
          "number.positive": "Option Value ID must be greater than 0",
          "any.required": "Option Value ID is required",
        }),
        price: Joi.number().positive().required().messages({
          "number.base": "Price must be a number",
          "number.positive": "Price must be greater than 0",
          "any.required": "Price is required",
        }),
        stock: Joi.number().integer().min(0).required().messages({
          "number.base": "Stock must be a number",
          "number.min": "Stock must be at least 0",
          "any.required": "Stock is required",
        }),
        status:Joi.string().valid("active", "inactive").required().messages({
          "any.only": 'Status must be either "active" or "inactive"',
        }),
        images: Joi.array().items(Joi.string()).messages({
          "array.base": "Images must be an array of URLs",
          // 'string.uri': 'Each image must be a valid URL',
        }),
        
      })
    )
    .required()
    .messages({
      "array.base": "Options must be an array of objects",
      "any.required": "Options are required",
    }),
});

const productList = Joi.object({
  page: Joi.number().integer().min(1).required().messages({
    "number.base": "Page must be a number",
    "number.integer": "Page must be an integer",
    "number.min": "Page must be greater than or equal to 1",
  }),
  limit: Joi.number().integer().min(1).required().messages({
    "number.base": "Limit must be a number",
    "number.integer": "Limit must be an integer",
    "number.min": "Limit must be greater than or equal to 1",
  }),
  search: Joi.string().optional().allow("").messages({
    "string.base": "Search query must be a string.",
  }),
  filters: Joi.string().optional().allow("").messages({
    "string.base": "Filters query must be a string.",
  }),
});

const productById = Joi.object({
  id: Joi.number().integer().required().messages({
    "number.base": "Id must be a number",
    "number.integer": "Id must be an integer",
  }),
});

const productUpdateValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  tax_rate_id:Joi.number().integer().positive().required().messages({
    "number.base": "Tax Rate ID must be a number",
    "number.positive": "Tax Rate ID must be greater than 0",
  }),
  status:Joi.string().valid("active", "inactive").required().messages({
    "any.only": 'Status must be either "active" or "inactive"',
  }),
  MOQ: Joi.number().integer().positive().required().messages({
    "number.base": "MOQ must be a number",
    "number.positive": "MOQ must be greater than 0",
  }),
  category: Joi.number().integer().positive().required().messages({
    "number.base": "Category must be a number",
    "number.positive": "Category must be greater than 0",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required",
  }),
  images: Joi.array().items(Joi.string().uri()).required().messages({
    "array.base": "Images must be an array of URLs",
    "string.uri": "Each image must be a valid URL",
  }),
  slug: Joi.string().required().messages({
    "string.empty": "Slug is required",
  }),
  type: Joi.string().valid("retort", "packaging").required().messages({
    "any.only": 'Type must be either "retort" or "packaging"',
  }),
  variationIds: Joi.array().items(Joi.number().integer()).required().messages({
    "array.base": "Variation IDs must be an array of integers",
  }),
  options: Joi.array()
    .items(
      Joi.object({
        optionValueId: Joi.number().integer().positive().required().messages({
          "number.base": "Option Value ID must be a number",
          "number.positive": "Option Value ID must be greater than 0",
          "any.required": "Option Value ID is required",
        }),
        price: Joi.number().positive().required().messages({
          "number.base": "Price must be a number",
          "number.positive": "Price must be greater than 0",
          "any.required": "Price is required",
        }),
        stock: Joi.number().integer().min(0).required().messages({
          "number.base": "Stock must be a number",
          "number.min": "Stock must be at least 0",
          "any.required": "Stock is required",
        }),
        images: Joi.string().required().messages({
          "string.base": "Images must be a string",
          // 'string.uri': 'Each image must be a valid URL',
        }),
        status:Joi.string().valid("active", "inactive").required().messages({
            "any.only": 'Status must be either "active" or "inactive"',
          }),
      })
    )
    .required()
    .messages({
      "array.base": "Options must be an array of objects",
      "any.required": "Options are required",
    }),
});

const productDeleteValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "number.base": "Id must be a number",
    "number.integer": "Id must be an integer",
  }),
});

const changeProductStatusValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "number.base": "Id must be a number",
    "number.integer": "Id must be an integer",
  }),
  status: Joi.string().valid("active", "inactive").required().messages({
    "any.only": "Status must be one of [active, inactive].",
    "any.required": "Status is required.",
  }),
});

export const validateCreateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, productValidationSchema, "body");

export const validateProductList = (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, productList, "query");

export const validateProductById = (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, productById, "params");

export const validateUpdateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, productUpdateValidationSchema, "body");

export const validateDeleteProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, productDeleteValidationSchema, "params");

export const validateChangeProductStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => validateReq(req, res, next, changeProductStatusValidationSchema, "body"); 