import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { SM_PLATFORM_FRANCHISE } from "../../../interfaces";

// Validation schema for creating and editing a franchisee
const franchiseeSchema = Joi.object({
    name: Joi.string().trim().min(3).required().messages({
        "any.required": "Franchisee name is required.",
        "string.empty": "Franchisee name cannot be empty.",
        "string.min": "Franchisee name must be at least 3 characters long.",
    }),
    userid: Joi.string().optional(),
    referBy: Joi.string().optional().allow(null),
    parentFranchise: Joi.string().optional().allow(null),
    ownerName: Joi.string().trim().required().messages({
        "any.required": "Owner name is required.",
        "string.empty": "Owner name cannot be empty.",
    }),
    contactEmail: Joi.string().email().required().messages({
        "any.required": "Contact email is required.",
        "string.email": "Please provide a valid email address.",
    }),
    contactNumber: Joi.string()
        .trim()
        .required()
        .pattern(/^\+?[1-9]\d{1,14}$/) // Example regex for international phone numbers
        .messages({
            "any.required": "Contact number is required.",
            "string.empty": "Contact number cannot be empty.",
            "string.pattern.base": "Contact number must be a valid format." // Custom message for pattern validation
        }),
    franchiseLocation: Joi.object({
        contactPhone: Joi.string().trim().required().messages({
            "any.required": "Contact phone is required.",
            "string.empty": "Contact phone cannot be empty.",
        }),
        location: Joi.string().trim().required().messages({
            "any.required": "Location is required.",
            "string.empty": "Location cannot be empty.",
        }),
        city: Joi.string().trim().required().messages({
            "any.required": "City is required.",
            "string.empty": "City cannot be empty.",
        }),
        state: Joi.string().trim().required().messages({
            "any.required": "State is required.",
            "string.empty": "State cannot be empty.",
        }),
        country: Joi.string().trim().required().messages({
            "any.required": "Country is required.",
            "string.empty": "Country cannot be empty.",
        }),
        zipCode: Joi.string()
            .required()
            .messages({
                "any.required": "ZIP code is required.",
                "string.pattern.base": "ZIP code must be valid.",
            }),
    }).required().messages({
        "any.required": "Franchise location details are required.",
    }),
    establishedDate: Joi.date().iso().required().messages({
        "any.required": "Established date is required.",
        "date.iso": "Established date must be in ISO format.",
    }),
    franchiseAgreementSignedDate: Joi.date().iso().required().messages({
        "any.required": "Franchise agreement signed date is required.",
        "date.iso": "Franchise agreement signed date must be in ISO format.",
    }),
    franchiseType: Joi.string().valid('master_franchise', 'super_franchise', 'franchise').required().messages({
        "any.required": "Franchise type is required.",
        "string.empty": "Franchise type cannot be empty.",
    }),
    regionId: Joi.any().required().messages({
        "number.base": "Ratings must be a number.",
        "number.min": "Ratings cannot be less than 0.",
    }),
    contractIds: Joi.array().items(Joi.string()).optional(),
    isActive: Joi.boolean().required().messages({
        "any.required": "Active status is required.",
    }),
    ratings: Joi.number().min(0).max(5).optional().messages({
        "number.base": "Ratings must be a number.",
        "number.min": "Ratings cannot be less than 0.",
        "number.max": "Ratings cannot exceed 5.",
    }),
    franchiseRenewalInfo: Joi.object({
        renewalDate: Joi.date().iso().required().messages({
            "any.required": "Renewal date is required.",
            "date.iso": "Renewal date must be in ISO format.",
        }),
        conditions: Joi.string().optional().allow("").messages({
            "string.empty": "Renewal conditions cannot be empty.",
        }),
    }).optional().allow(null),
    socialMediaDetails: Joi.array().items(Joi.object({
        url: Joi.string().required().messages({
            "any.required": "Social media URL is required.",
            "string.uri": "Each URL must be a valid URI.",
        }),
        type: Joi.string()
            .valid(...Object.values(SM_PLATFORM_FRANCHISE)) // Ensure the type is one of the enum values
            .required()
            .messages({
                "any.required": "Social media type is required.",
                "any.allowOnly": "Social media type must be one of 'fb', 'instagram', or 'youtube'."
            }),
    })).optional(),
    organizationId: Joi.number().allow(null).messages({
        "any.required": "Organization id is required.",
        "number.base": "Organization id must be a number.",
    }),
});

// Middleware for validating the request body for creating a franchisee
const validateCreateFranchiseeBody = (req: Request, res: Response, next: NextFunction) => {
    const { error } = franchiseeSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

// Middleware for validating the request body for editing a franchisee
const validateEditFranchiseeBody = (req: Request, res: Response, next: NextFunction) => {
    const { error } = franchiseeSchema.validate(req.body, { allowUnknown: true });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

// Middleware for validating franchisee ID in the request parameters
const validateEditFranchiseeParams = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const idSchema = Joi.string().guid().required();
    const { error } = idSchema.validate(id);
    if (error) {
        return res.status(400).json({ message: "Invalid franchisee ID." });
    }
    next();
};

// Export the validation functions
export {
    validateCreateFranchiseeBody,
    validateEditFranchiseeBody,
    validateEditFranchiseeParams,
};
