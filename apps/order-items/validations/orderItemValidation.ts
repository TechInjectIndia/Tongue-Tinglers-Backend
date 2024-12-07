import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const createOrderItemSchema = Joi.object({
    product_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Product ID must be a number.",
            "number.integer": "Product ID must be an integer.",
            "number.positive": "Product ID must be a positive number.",
            "any.required": "Product ID is required.",
        }),
    product_option_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Product Option ID must be a number.",
            "number.integer": "Product Option ID must be an integer.",
            "number.positive": "Product Option ID must be a positive number.",
            "any.required": "Product Option ID is required.",
        }),
    quantity: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Quantity must be a number.",
            "number.integer": "Quantity must be an integer.",
            "number.positive": "Quantity must be a positive number.",
            "any.required": "Quantity is required.",
        }),
    total_price: Joi.number()
        .positive()
        .required()
        .messages({
            "number.base": "Total Price must be a number.",
            "number.positive": "Total Price must be a positive number.",
            "any.required": "Total Price is required.",
        }),
    total_tax: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.base": "Total Tax must be a number.",
            "number.min": "Total Tax must be 0 or more.",
            "any.required": "Total Tax is required.",
        }),
    coupon_discount: Joi.number()
        .min(0)
        .default(0)
        .messages({
            "number.base": "Coupon Discount must be a number.",
            "number.min": "Coupon Discount must be 0 or more.",
        }),
    points_discount: Joi.number()
        .min(0)
        .default(0)
        .messages({
            "number.base": "Points Discount must be a number.",
            "number.min": "Points Discount must be 0 or more.",
        }),
    student_discount: Joi.number()
        .min(0)
        .default(0)
        .messages({
            "number.base": "Student Discount must be a number.",
            "number.min": "Student Discount must be 0 or more.",
        }),
    type: Joi.string()
        .valid("retort", "packaging") // Add valid ORDER_ITEM_TYPE values here
        .required()
        .messages({
            "string.base": "Type must be a string.",
            "any.only": "Type must be either 'PRODUCT' or 'SERVICE'.",
            "any.required": "Type is required.",
        }),
});

const bulkOrderItemsSchema = Joi.array()
    .items(createOrderItemSchema)
    .min(1)
    .required()
    .messages({
        "array.base": "Order items must be an array.",
        "array.min": "There must be at least one order item.",
        "any.required": "Order items are required.",
    });

const updateOrderItemSchema = Joi.object({
    product_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Product ID must be a number.",
            "number.integer": "Product ID must be an integer.",
            "number.positive": "Product ID must be a positive number.",
            "any.required": "Product ID is required.",
        }),
    product_option_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Product Option ID must be a number.",
            "number.integer": "Product Option ID must be an integer.",
            "number.positive": "Product Option ID must be a positive number.",
            "any.required": "Product Option ID is required.",
        }),
    quantity: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Quantity must be a number.",
            "number.integer": "Quantity must be an integer.",
            "number.positive": "Quantity must be a positive number.",
            "any.required": "Quantity is required.",
        }),
    total_price: Joi.number()
        .positive()
        .required()
        .messages({
            "number.base": "Total Price must be a number.",
            "number.positive": "Total Price must be a positive number.",
            "any.required": "Total Price is required.",
        }),
    total_tax: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.base": "Total Tax must be a number.",
            "number.min": "Total Tax must be 0 or more.",
            "any.required": "Total Tax is required.",
        }),
    coupon_discount: Joi.number()
        .min(0)
        .default(0)
        .messages({
            "number.base": "Coupon Discount must be a number.",
            "number.min": "Coupon Discount must be 0 or more.",
        }),
    points_discount: Joi.number()
        .min(0)
        .default(0)
        .messages({
            "number.base": "Points Discount must be a number.",
            "number.min": "Points Discount must be 0 or more.",
        }),
    student_discount: Joi.number()
        .min(0)
        .default(0)
        .messages({
            "number.base": "Student Discount must be a number.",
            "number.min": "Student Discount must be 0 or more.",
        }),
    type: Joi.string()
        .valid("PRODUCT", "SERVICE") // Add valid ORDER_ITEM_TYPE values here
        .required()
        .messages({
            "string.base": "Type must be a string.",
            "any.only": "Type must be either 'PRODUCT' or 'SERVICE'.",
            "any.required": "Type is required.",
        }),
});

const getOrderItemsByIdSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "ID must be a number.",
            "number.integer": "ID must be an integer.",
            "number.positive": "ID must be a positive number.",
            "any.required": "ID is required.",
        }),
})

const orderItemDeleteValidationSchema = Joi.object({
    id: Joi.number().integer().required().messages({
        'number.base': 'Id must be a number',
        'number.integer': 'Id must be an integer'
    })
})

const updateQuantityValidationSchema = Joi.object({
    quantity: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Quantity must be a number.",
            "number.integer": "Quantity must be an integer.",
            "number.positive": "Quantity must be a positive number.",
            "any.required": "Quantity is required.",
        }),
});

const updateCouponDiscountValidationSchema = Joi.object({
    coupon_discount: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Coupon Discount must be a number.",
            "number.integer": "Coupon Discount must be an integer.",
            "number.positive": "Coupon Discount must be a positive number.",
            "any.required": "Coupon Discount is required.",
        }),
});

const updatePointsDiscountValidationSchema = Joi.object({
    points_discount: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Quantity must be a number.",
            "number.integer": "Quantity must be an integer.",
            "number.positive": "Quantity must be a positive number.",
            "any.required": "Quantity is required.",
        }),
});

const updateStudentDiscountValidationSchema = Joi.object({
    points_discount: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Student Discount must be a number.",
            "number.integer": "Student Discount must be an integer.",
            "number.positive": "Student Discount must be a positive number.",
            "any.required": "Student Discount is required.",
        }),
});

export const validateCreateOrderItem = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, createOrderItemSchema, 'body');

export const validateUpdateOrderItem = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, updateOrderItemSchema, 'body');

export const validateGetOrderItemsById = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, getOrderItemsByIdSchema, 'params');

export const validateOrderItemDelete = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, orderItemDeleteValidationSchema, 'params')

export const validateUpdateQuantity = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, updateQuantityValidationSchema, 'body')

export const validateUpdateCouponDiscount = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, updateCouponDiscountValidationSchema, 'body')

export const validateUpdatePointsDiscount = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, updatePointsDiscountValidationSchema, 'body')

export const validateUpdateStudentDiscount = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, updateStudentDiscountValidationSchema, 'body')

export const validateBulkOrderItems = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, bulkOrderItemsSchema, 'body');