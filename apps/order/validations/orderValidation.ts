import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";
import { DeliveryStatus, ORDER_TYPE, OrderStatus, PAYMENT_TYPE } from "../interface/Order";
import { ORDER_ITEM_TYPE } from "../interface/OrderItem";
import { PRODUCTS_TYPE } from "apps/product/interface/Product";

const orderValidationSchema = Joi.object({
    order_items: Joi.array()
        .items(Joi.number().required())
        .required()
        .messages({
            "array.base": "Order items must be an array of numbers.",
            "array.includesRequiredUnknowns": "Each item in the order items must be a number.",
            "any.required": "Order items are required.",
        }),
    status: Joi.string()
        .required()
        .messages({
            "string.base": "Status must be a string.",
            "any.required": "Status is required.",
        }),
    item_count: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "Item count must be a number.",
            "any.required": "Item count is required.",
        }),
    total: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "Total must be a number.",
            "any.required": "Total is required.",
        }),
    total_tax: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "Total tax must be a number.",
            "any.required": "Total tax is required.",
        }),
    delivery_status: Joi.string()
        .required()
        .messages({
            "string.base": "Delivery status must be a string.",
            "any.required": "Delivery status is required.",
        }),
    customer_details: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "Customer details must be a number.",
            "any.required": "Customer details are required.",
        }),
    payment_type: Joi.string()
        .required()
        .messages({
            "string.base": "Payment type must be a string.",
            "any.required": "Payment type is required.",
        }),
    payment_id: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "Payment ID must be a number.",
            "any.required": "Payment ID is required.",
        }),
    cancelled_items: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "Cancelled items must be a number.",
            "any.required": "Cancelled items are required.",
        }),
    total_discount: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "Total discount must be a number.",
            "any.required": "Total discount is required.",
        }),
    delivery_details: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "Delivery details must be a number.",
            "any.required": "Delivery details are required.",
        }),
    total_shipping: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "Total shipping must be a number.",
            "any.required": "Total shipping is required.",
        }),
    anomalyArr: Joi.array()
        .items(Joi.number())
        .required()
        .messages({
            "array.base": "Anomaly array must be an array of numbers.",
            "any.required": "Anomaly array is required.",
        }),
    prices: Joi.string()
        .required()
        .messages({
            "string.base": "Prices must be a string.",
            "any.required": "Prices are required.",
        }),
    discount_prices: Joi.string()
        .required()
        .messages({
            "string.base": "Discount prices must be a string.",
            "any.required": "Discount prices are required.",
        }),
});

const orderSchema = Joi.object({
    status: Joi.string()
        .valid(...Object.values(OrderStatus))
        .required()
        .messages({
            "any.required": "Order status is required.",
            "any.only": `Order status must be one of ${Object.values(OrderStatus).join(", ")}.`,
        }),
    total: Joi.number().positive().required().messages({
        "number.base": "Total must be a number.",
        "number.positive": "Total must be a positive number.",
        "any.required": "Total is required.",
    }),
    totalTax: Joi.number().positive().required().messages({
        "number.base": "Total tax must be a number.",
        "number.positive": "Total tax must be a positive number.",
        "any.required": "Total tax is required.",
    }),
    deliveryStatus: Joi.string()
        .valid(...Object.values(DeliveryStatus))
        .required()
        .messages({
            "any.required": "Delivery status is required.",
            "any.only": `Delivery status must be one of ${Object.values(DeliveryStatus).join(", ")}.`,
        }),
    customerDetails: Joi.number().integer().positive().required().messages({
        "number.base": "Customer details must be a number.",
        "number.integer": "Customer details must be an integer.",
        "number.positive": "Customer details must be a positive number.",
        "any.required": "Customer details are required.",
    }),
    paymentType: Joi.string()
        .valid(...Object.values(PAYMENT_TYPE))
        .required()
        .messages({
            "any.required": "Payment type is required.",
            "any.only": `Payment type must be one of ${Object.values(PAYMENT_TYPE).join(", ")}.`,
        }),
    paymentId: Joi.string().required().messages({
        "any.required": "Payment ID is required.",
    }),
    cancelledItems: Joi.array()
        .items(Joi.number().integer().positive())
        .allow(null)
        .messages({
            "array.base": "Cancelled items must be an array of numbers.",
            "array.includes": "Cancelled items must contain only positive integers.",
        }),
    totalDiscount: Joi.number().allow(null).messages({
        "number.base": "Total discount must be a number.",
    }),
    deliveryDetails: Joi.string().allow(null, "").messages({
        "string.base": "Delivery details must be a string.",
    }),
    shippingAddress: Joi.object({
        street: Joi.string().required().messages({
            "any.required": "Street in Shipping address is required.",
        }),
        city: Joi.string().required().messages({
            "any.required": "City in shipping address is required.",
        }),
        state: Joi.string().required().messages({
            "any.required": "State in shipping address is required.",
        }),
        postalCode: Joi.string().required().messages({
            "any.required": "Postal code in shipping address is required.",
        }),
        country: Joi.string().required().messages({
            "any.required": "Country in shipping address is required.",
        }),
        phoneNumber: Joi.string().required().messages({
            "any.required": "Phone number in shipping address is required.",
        }),
        firstName: Joi.string().required().messages({
            "any.required": "First name in shipping address is required.",
        }),
        lastName: Joi.string().required().messages({
            "any.required": "Last name in shipping address is required.",
        }),
    }).required(),
    billingAddress: Joi.object({
        street: Joi.string().required().messages({
            "any.required": "Street in Shipping address is required.",
        }),
        city: Joi.string().required().messages({
            "any.required": "City in shipping address is required.",
        }),
        state: Joi.string().required().messages({
            "any.required": "State in shipping address is required.",
        }),
        postalCode: Joi.string().required().messages({
            "any.required": "Postal code in shipping address is required.",
        }),
        country: Joi.string().required().messages({
            "any.required": "Country in shipping address is required.",
        }),
        phoneNumber: Joi.string().required().messages({
            "any.required": "Phone number in shipping address is required.",
        }),
        firstName: Joi.string().required().messages({
            "any.required": "First name in shipping address is required.",
        }),
        lastName: Joi.string().required().messages({
            "any.required": "Last name in shipping address is required.",
        }),
    }).required(),
    totalShipping: Joi.number().required().messages({
        "number.base": "Total shipping must be a number.",
        "any.required": "Total shipping is required.",
    }),
    anomalyArr: Joi.array()
        .items(Joi.number().integer())
        .allow(null)
        .messages({
            "array.base": "Anomaly array must be an array of numbers.",
        }),
    price: Joi.object()
        .min(1) // Ensures the object has at least one key-value pair
        .required()
        .messages({
            "object.base": "Price must be a valid object.",
            "object.min": "Price must contain at least one key-value pair.",
            "any.required": "Price is required.",
        }),
    orderType: Joi.string()
        .valid(...Object.values(ORDER_TYPE))
        .required()
        .messages({
            "any.required": "Order type is required.",
            "any.only": `Order type must be one of ${Object.values(ORDER_TYPE)}.`,
        }),
    franchise: Joi.number().integer().allow(null).messages({
        "number.base": "Franchise must be a number.",
    }),
    items: Joi.array()
        .items(
            Joi.object({
                product: Joi.number().required().messages({
                    "any.required": "Product ID is required in items.",
                }),
                variation: Joi.number().required().messages({
                    "any.required": "Variation ID is required in items.",
                }),
                quantity: Joi.number().required().messages({
                    "any.required": "Quantity is required in items.",
                }),
                price: Joi.object({
                    basePrice: Joi.number().required().messages({
                        "any.required": "Base price is required in items.",
                    }),
                    discountedPrice: Joi.number().required().messages({
                        "any.required": "Discounted price is required in items.",
                    }),
                    taxAmount: Joi.number().required().messages({
                        "any.required": "Tax amount is required in items.",
                    }),
                }).required(),
                totalPrice: Joi.number().required().messages({
                    "any.required": "Total price is required in items.",
                }),
                totalTax: Joi.number().required().messages({
                    "any.required": "Total tax is required in items.",
                }),
                couponDiscount: Joi.number().optional(),
                type: Joi.string().valid(...Object.values(PRODUCTS_TYPE)).required().messages({
                    "any.required": "Type is required in items.",
                }),
            })
        )
        .required()
        .messages({
            "array.base": "Items must be an array.",
            "array.includes": "Items contain invalid data.",
        }),
    notes: Joi.array().optional()
        // .items(
        //     Joi.object({
        //         content: Joi.string().required().messages({
        //             "any.required": "Content is required in notes.",
        //         }),
        //         createdBy: Joi.number().integer().positive().required().messages({
        //             "any.required": "Created by ID is required in notes.",
        //         }),
        //         updatedBy: Joi.number().integer().positive().allow(null).messages({
        //             "number.base": "Updated by ID in notes must be a number.",
        //         }),
        //     })
        // )
        // .allow([])
        // .messages({
        //     "array.base": "Notes must be an array.",
        // }),
});

const getOrderByIdValidationSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Order ID must be a number.",
            "number.integer": "Order ID must be an integer.",
            "number.positive": "Order ID must be a positive number.",
            "any.required": "Order ID is required.",
        }),
});

const getAllOrdersValidationSchema = Joi.object({
    page: Joi.number()
        .integer()
        .positive()
        .default(1)
        .messages({
            "number.base": "Page must be a number.",
            "number.integer": "Page must be an integer.",
            "number.positive": "Page must be a positive number.",
        }),
    limit: Joi.number()
        .integer()
        .positive()
        .default(10)
        .messages({
            "number.base": "Limit must be a number.",
            "number.integer": "Limit must be an integer.",
            "number.positive": "Limit must be a positive number.",
        }),
    search: Joi.string()
        .optional()
        .allow("")
        .messages({
            "string.base": "Search must be a string.",
        }),
    filters: Joi.object()
        .optional()
        .messages({
            "object.base": "Filters must be an object.",
        }),
});

export const validateCreateOrder = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, orderSchema, "body");

export const validateGetOrderById = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, getOrderByIdValidationSchema, "params");

export const validateGetAllOrder = (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, getAllOrdersValidationSchema, "query");


  