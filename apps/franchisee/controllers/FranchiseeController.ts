import { Request, Response } from 'express';
import { FranchiseeRepo } from '../models/FranchiseeRepo';
import { RegionRepo } from '../../region/models/RegionRepo';
import { ContractRepo } from '../../contracts/models/ContractRepo';
import { sendResponse, sendEmail, getEmailTemplate, EMAIL_TEMPLATE, EMAIL_HEADING } from '../../../libraries';
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../../constants';
import { get, isEmpty } from "lodash";
import jwt from "jsonwebtoken";
import { CONFIG } from "../../../config";

export default class FranchiseeController {
    // Create a new franchisee

    static async createFranchisee(req: Request, res: Response) {
        try {
            const franchiseeData = req.body;

            // Extract franchise location data
            const { franchiseLocation, socialMediaDetails, ...franchiseeDetails } = franchiseeData;

            // delete franchiseeData.franchiseLocation
            // delete franchiseeData.socialMediaDetails;

            // Check if the region exists
            const regionRepo = new RegionRepo();
            const regionExists = await regionRepo.get(franchiseeData.regionId);

            if (!regionExists) {
                return res.status(404).send({
                    message: `Region does not exist.`,
                });
            }

            // Check if all contracts exist
            const contractRepo = new ContractRepo();
            const contractIds = franchiseeDetails.contractIds || [];

            const existingContracts = await Promise.all(
                contractIds.map(contractId => contractRepo.get(contractId))
            );

            // Check if any of the contracts do not exist
            const nonExistentContracts = contractIds.filter((id, index) => !existingContracts[index]);
            if (nonExistentContracts.length > 0) {
                return res.status(404).send({
                    message: `Some contracts do not exist`,
                });
            }

            // Call the repository method to create a franchisee
            const newFranchisee = await new FranchiseeRepo().createFranchisee(franchiseeDetails);

            franchiseLocation.franchiseeId = newFranchisee.id
            // Create the franchise location first


            // If socialMediaDetails exists, set franchiseeId and create social media details
            if (socialMediaDetails && Array.isArray(socialMediaDetails)) {
                await Promise.all(
                    socialMediaDetails.map(socialMediaDetail => {
                        // Assign the franchiseeId to each socialMediaDetail
                        socialMediaDetail.franchiseeId = newFranchisee.id;

                    })
                );
            }

            const token = jwt.sign({ email: franchiseeData.email }, CONFIG.ACCESS_TOKEN_SECRET, { expiresIn: CONFIG.ACCESS_TOKEN_EXPIRATION });
            const passwordCreateLink = `${CONFIG.FRONTEND_URL}/create-password?token=${token}`;

            try {
                const emailContent = await getEmailTemplate(EMAIL_TEMPLATE.NEW_FRANCHISE_CREATED, {
                    leadName: `${franchiseeData.firstName} ${franchiseeData.lastName}`,
                    leadEmail: franchiseeData.email,
                    leadPhone: franchiseeData.contactNumber,
                    passwordCreateLink
                });

                const mailOptions = {
                    to: franchiseeData.email,
                    subject: EMAIL_HEADING.NEW_FRANCHISE_CREATED,
                    templateParams: {
                        heading: EMAIL_HEADING.NEW_FRANCHISE_CREATED,
                        description: emailContent,
                    },
                };

                await sendEmail(mailOptions.to, mailOptions.subject, mailOptions.templateParams);
            } catch (emailError) {
                console.error("Error sending email:", emailError);
            }

            return res.status(201).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.CREATED, newFranchisee));
        } catch (error) {
            console.error('Error creating franchisee:', error);
            return res.status(500).send({
                message: error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    // Retrieve all franchisees
    static async getAllFranchisees(req: Request, res: Response) {
        try {
            const franchiseType = get(req.query, 'franchiseType');

            const franchisees = await new FranchiseeRepo().getAllFranchisees(franchiseType as string);

            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, franchisees));
        } catch (error) {
            console.error('Error fetching franchisees:', error);
            return res.status(500).send({
                message: error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    // Retrieve a franchisee by ID
    static async getFranchiseeById(req: Request, res: Response) {
        try {
            const franchiseeId = req.params.id;

            console.log("franchise id ", franchiseeId);

            const franchisee = await new FranchiseeRepo().getFranchiseeById(franchiseeId);

            if (!franchisee) {
                return res.status(404).send({
                    message: 'Franchisee not found.',
                });
            }

            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, franchisee));
        } catch (error) {
            console.error('Error fetching franchisee:', error);
            return res.status(500).send({
                message: error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    // Update a franchisee by ID
    static async updateFranchisee(req: Request, res: Response) {
        try {
            const franchiseeId = req.params.id;
            const franchiseeData = req.body;

            // Check if the region exists
            const regionRepo = new RegionRepo();
            if (franchiseeData.regionId) {
                const regionExists = await regionRepo.get(franchiseeData.regionId);
                if (!regionExists) {
                    return res.status(404).send({
                        message: 'Region does not exist.',
                    });
                }
            }

            // Check if the franchisee exists
            const existingFranchisee = await new FranchiseeRepo().getFranchiseeById(franchiseeId);
            if (!existingFranchisee) {
                return res.status(404).send({
                    message: 'Franchisee not found.',
                });
            }

            // Update franchise location if provided
            // if (franchiseeData.franchiseLocation) {

            //     await franchiseLocationRepo.updateFranchiseLocationByFranchiseId(franchiseeId, franchiseeData.franchiseLocation);
            // }

            // Update social media details if provided
            if (franchiseeData.socialMediaDetails) {

                await Promise.all(
                    franchiseeData.socialMediaDetails.map(async (socialMediaDetail: any) => {
                        if (socialMediaDetail.id) {
                            // Update existing social media detail
                            // await socialMediaRepo.update(socialMediaDetail.id, socialMediaDetail);
                        } else {
                            // Create new social media detail if no id is provided
                            socialMediaDetail.franchiseeId = franchiseeId;
                            // await socialMediaRepo.createSocialMediaDetails(socialMediaDetail);
                        }
                    })
                );
            }

            // Check if all contracts exist
            const contractRepo = new ContractRepo();
            const contractIds = franchiseeData.contractIds || [];

            const existingContracts = await Promise.all(
                contractIds.map(contractId => contractRepo.get(contractId))
            );

            // Check if any of the contracts do not exist
            const nonExistentContracts = contractIds.filter((id, index) => !existingContracts[index]);
            if (nonExistentContracts.length > 0) {
                return res.status(404).send({
                    message: `Some contracts do not exist`,
                });
            }

            // Call the repository method to update the franchisee
            const updatedFranchisee = await new FranchiseeRepo().updateFranchisee(franchiseeId, franchiseeData);

            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.UPDATED, updatedFranchisee));
        } catch (error) {
            console.error('Error updating franchisee:', error);
            return res.status(500).send({
                message: error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    // Delete a franchisee by ID
    static async deleteFranchisee(req: Request, res: Response) {
        try {
            const franchiseeId = req.params.id;

            const deleted = await new FranchiseeRepo().deleteFranchisee(franchiseeId);

            if (!deleted) {
                return res.status(404).send({
                    message: 'Franchisee not found.',
                });
            }

            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.DELETED));
        } catch (error) {
            console.error('Error deleting franchisee:', error);
            return res.status(500).send({
                message: error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
