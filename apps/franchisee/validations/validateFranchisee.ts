import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";

// Validation schema for creating and editing a franchisee
const franchiseeSchema = Joi.object({
    name: Joi.string().trim().min(3).required().messages({
        "any.required": "Franchisee name is required.",
        "string.empty": "Franchisee name cannot be empty.",
        "string.min": "Franchisee name must be at least 3 characters long.",
    }),
    ownerName: Joi.string().trim().required().messages({
        "any.required": "Owner name is required.",
        "string.empty": "Owner name cannot be empty.",
    }),
    contactEmail: Joi.string().email().required().min(1).required().messages({
        "any.required": "At least one contact email is required.",
        "string.email": "Please provide a valid email address.",
    }),
    contactNumber: Joi.string().trim().required().messages({
        "any.required": "Contact number is required.",
        "string.empty": "Contact number cannot be empty.",
    }),
    franchiseLocations: Joi.array()
        .items(
            Joi.object({
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
                    .pattern(/^\d{5}(-\d{4})?$/)
                    .required()
                    .messages({
                        "any.required": "ZIP code is required.",
                        "string.pattern.base": "ZIP code must be valid.",
                    }),
            }).optional()
        )
        .optional()
        .messages({
            "any.required": "At least one franchise location is required.",
        }),
    establishedDate: Joi.date().iso().required().messages({
        "any.required": "Established date is required.",
        "date.iso": "Established date must be in ISO format.",
    }),
    franchiseAgreementSignedDate: Joi.date().iso().required().messages({
        "any.required": "Franchise agreement signed date is required.",
        "date.iso": "Date must be in ISO format.",
    }),
    franchiseType: Joi.string().required().messages({
        "any.required": "Franchise type is required.",
        "string.empty": "Franchise type cannot be empty.",
    }),
    region: Joi.string().required().messages({
        "any.required": "Region is required.",
        "string.empty": "Region cannot be empty.",
    }),
    description: Joi.string().optional().allow("").messages({
        "string.empty": "Description cannot be empty.",
    }),
    website: Joi.string().optional().allow("").messages({
        "string.uri": "Website must be a valid URL.",
    }),
    socialMediaLinks: Joi.array()
        .items(Joi.string().uri().optional())
        .optional()
        .messages({
            "string.uri": "Each social media link must be a valid URL.",
        }),
    logo: Joi.string().optional().allow("").messages({
        "string.uri": "Logo must be a valid URL.",
    }),
    numberOfEmployees: Joi.number().integer().min(0).required().messages({
        "any.required": "Number of employees is required.",
        "number.base": "Number of employees must be a number.",
        "number.integer": "Number of employees must be an integer.",
        "number.min": "Number of employees cannot be negative.",
    }),
    investmentAmount: Joi.number().positive().required().messages({
        "any.required": "Investment amount is required.",
        "number.base": "Investment amount must be a number.",
        "number.positive": "Investment amount must be a positive number.",
    }),
    royaltyPercentage: Joi.number().min(0).max(100).required().messages({
        "any.required": "Royalty percentage is required.",
        "number.base": "Royalty percentage must be a number.",
        "number.min": "Royalty percentage cannot be less than 0.",
        "number.max": "Royalty percentage cannot exceed 100.",
    }),
    monthlyRevenue: Joi.number().positive().required().messages({
        "any.required": "Monthly revenue is required.",
        "number.base": "Monthly revenue must be a number.",
        "number.positive": "Monthly revenue must be a positive number.",
    }),
    numberOfOutlets: Joi.number().integer().min(0).required().messages({
        "any.required": "Number of outlets is required.",
        "number.base": "Number of outlets must be a number.",
        "number.integer": "Number of outlets must be an integer.",
        "number.min": "Number of outlets cannot be negative.",
    }),
    menuSpecialty: Joi.string().optional().allow("").messages({
        "string.empty": "Menu specialty cannot be empty.",
    }),
    businessHours: Joi.string().optional().allow("").messages({
        "string.empty": "Business hours cannot be empty.",
    }),
    deliveryOptions: Joi.boolean().required().messages({
        "any.required": "Delivery options are required.",
    }),
    isActive: Joi.boolean().required().messages({
        "any.required": "Active status is required.",
    }),
    ratings: Joi.number().min(0).max(5).optional().messages({
        "number.base": "Ratings must be a number.",
        "number.min": "Ratings cannot be less than 0.",
        "number.max": "Ratings cannot exceed 5.",
    }),
    promotions: Joi.array().items(Joi.string().optional()).optional(),
    targetMarket: Joi.string().optional().allow("").messages({
        "string.empty": "Target market cannot be empty.",
    }),
    sustainabilityPractices: Joi.string().optional().allow("").messages({
        "string.empty": "Sustainability practices cannot be empty.",
    }),
    trainingPrograms: Joi.array().items(Joi.string().optional()).optional(),
    supportContact: Joi.string().trim().optional().allow("").messages({
        "string.empty": "Support contact cannot be empty.",
    }),
    operationalChallenges: Joi.array().items(Joi.string().optional()).optional(),
    competitiveAdvantages: Joi.string().optional().allow("").messages({
        "string.empty": "Competitive advantages cannot be empty.",
    }),
    expansionPlans: Joi.string().optional().allow("").messages({
        "string.empty": "Expansion plans cannot be empty.",
    }),
    customerFeedback: Joi.array().items(Joi.string().optional()).optional(),
    industryCertifications: Joi.array().items(Joi.string().optional()).optional(),
    affiliatePrograms: Joi.array().items(Joi.string().optional()).optional(),
    performanceMetrics: Joi.object()
        .pattern(Joi.string(), Joi.number().positive())
        .optional(),
    franchiseRenewalInfo: Joi.object({
        renewalDate: Joi.date().iso().required().messages({
            "any.required": "Renewal date is required.",
            "date.iso": "Renewal date must be in ISO format.",
        }),
        conditions: Joi.string().optional().allow("").messages({
            "string.empty": "Renewal conditions cannot be empty.",
        }),
    }).optional().allow(""),
    partnerships: Joi.array().items(Joi.string().optional()).optional(),
    marketingStrategies: Joi.array().items(Joi.string().optional()).optional(),
    trainingHistory: Joi.array()
        .items(
            Joi.object({
                date: Joi.date().iso().required().messages({
                    "any.required": "Training date is required.",
                    "date.iso": "Training date must be in ISO format.",
                }),
                topic: Joi.string().required().messages({
                    "any.required": "Training topic is required.",
                    "string.empty": "Training topic cannot be empty.",
                }),
            })
        )
        .optional(),
    crisisManagementPlans: Joi.string().optional().allow("").messages({
        "string.empty": "Crisis management plans cannot be empty.",
    }),
    diversityInitiatives: Joi.string().optional().allow("").messages({
        "string.empty": "Diversity initiatives cannot be empty.",
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
