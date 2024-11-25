import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const createCommissionSchema = Joi.object({
    product_id: Joi.number().required().messages({
        'string.empty': 'Product ID is required',
        'any.required': 'Product ID is required',
    }),
    productType: Joi.string()
        .valid('retort', 'packaging')
        .required()
        .messages({
            'string.base': 'Product type must be a string.',
            'any.required': 'Product type is required.',
            'any.only': 'Product type must be either "retort" or "packaging".',
        }),
    quantity: Joi.number().integer().min(0).required().messages({
        'number.base': 'Quantity must be a number',
        'number.min': 'Quantity must be at least 1',
        'any.required': 'Quantity is required',
    }),
});


const validateUpdateProduct = (req, res, next) => {
    const { error } = updateProductSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

export { validateAddProduct, validateRemoveProduct, validateUpdateProduct };
