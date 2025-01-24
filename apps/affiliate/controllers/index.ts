import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { AffiliateRepo } from '../models';
import { SocialMediaDetailsRepo } from '../models/smDetailsRepo';
import { constructNow } from "date-fns";
import { AdminRepo } from "apps/user/models/user";

export default class AffiliateController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = await new AdminRepo().get(req.body.userId)

            if (!userData?.id)
                return res.status(500).send({
                    message: "Invalid userId send",
                });
            const userId = get(req, 'user_id', '');
            // console.log(userId,"userId");

            // if (!userId)
            //     throw "Invalid User"
            const affiliateData = { ...req.body, createdBy: userId };
            // Extract the social media details
            const { sm, type, codes } = affiliateData; // Destructure type and codes from affiliateData

            // Ensure type and codes are provided
            if (!type || !codes) {
                return res.status(400).send({
                    message: "Type and codes are required fields."
                });
            }


            // Create payload for the affiliate
            const payload = { ...affiliateData };
            delete payload.sm;
            const Affiliate = await new AffiliateRepo().create(payload);
            // Remove social media details from the payload for affiliate creation
            delete payload.user_id
            delete payload.createdBy
            // Create the affiliate record


            const affiliateId = Affiliate.id
            if (!affiliateId) {
                throw new Error("Failed to retrieve Affiliate ID.");
            }

            // Check if social media details are provided
            if (sm && typeof sm === 'object') {
                // Iterate through social media entries
                for (const [platform, details] of Object.entries(sm)) {
                    // Type the details explicitly
                    const socialMediaDetails: any = details;

                    // Ensure the platform and required fields are provided
                    if (!socialMediaDetails.handle || !socialMediaDetails.followers || !socialMediaDetails.tags) {
                        return res.status(400).send({
                            message: "Social media details must include handle, followers, and tags."
                        });
                    }

                    // Prepare the social media detail object
                    const socialMediaData: any = {
                        affiliateId: Affiliate.id,
                        platform, // Use the key as platform
                        handle: socialMediaDetails.handle,
                        followers: socialMediaDetails.followers,
                        tags: socialMediaDetails.tags,
                    };

                    // Create the social media details
                    await new SocialMediaDetailsRepo().create(socialMediaData);
                }
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        Affiliate
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const size = get(req?.query, "size", 10);
            const skip = get(req?.query, "skip", 1);
            const search = get(req?.query, "search", "");
            const trashOnly = get(req?.query, "trashOnly", "");
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.toString().split(" ");


            const Affiliates = await new AffiliateRepo().list({
                offset: skip as number,
                limit: size as number,
                search: search as string,
                sorting: sorting,
                trashOnly: trashOnly as string
            });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        Affiliates
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(get(req.params, "id"));
            // const user_id = parseInt(get(req, 'user_id'));
            const userData = await new AdminRepo().get(req.body.userId)
            if (!userData?.id)
                return res.status(500).send({
                    message: "Invalid userId send",
                });
            const updateAffiliate = req.body;

            // Check for social media details in the request
            const { sm } = updateAffiliate;
            delete updateAffiliate.sm; // Remove social media details from the update payload

            // Update the affiliate record
            const affiliate = await new AffiliateRepo().update(id, updateAffiliate);

            // Check if social media details are provided
            if (sm && typeof sm === 'object') {
                // Iterate through social media entries
                for (const [platform, details] of Object.entries(sm)) {
                    // Type the details explicitly
                    const socialMediaDetails: any = details;

                    // Ensure required fields are provided
                    if (!socialMediaDetails.handle || !socialMediaDetails.followers || !socialMediaDetails.tags) {
                        return res.status(400).send({
                            message: "Social media details must include handle, followers, and tags."
                        });
                    }

                    // Prepare the social media detail object
                    const socialMediaData: any = {
                        affiliateId: id,
                        platform, // Use the key as platform
                        handle: socialMediaDetails.handle,
                        followers: socialMediaDetails.followers,
                        tags: socialMediaDetails.tags,
                    };

                    // Check if social media entry exists for the platform
                    const existingSocialMedia = await new SocialMediaDetailsRepo().getByAffiliateAndPlatform(id, platform);
                    if (existingSocialMedia) {
                        // Update existing social media details
                        await new SocialMediaDetailsRepo().update(existingSocialMedia.id, socialMediaData);
                    } else {
                        // Create new social media details if it doesn't exist
                        await new SocialMediaDetailsRepo().create(socialMediaData);
                    }
                }
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        affiliate
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", 0);
            const user_id = get(req, 'user_id',);

            const existingAffiliate = await new AffiliateRepo().get(id as number);

            if (isEmpty(existingAffiliate)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS
                        )
                    );
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        existingAffiliate
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const ids = get(req?.body, "ids", "");
            const user_id = get(req, 'user_id', 0);

            const Affiliate = await new AffiliateRepo().delete(ids);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.DELETED,
                        Affiliate
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getAffiliateByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = get(req, 'user_id', 1);

            const Affiliate = await new AffiliateRepo().getAffiliateByUserId(user_id as number);

            if (isEmpty(Affiliate)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS
                        )
                    );
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        Affiliate
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

}
