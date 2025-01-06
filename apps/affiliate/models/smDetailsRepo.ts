// Adjust import based on your structure
import { SocialMediaDetailsModel } from "apps/lead/models/smDetailsTable";

import IBaseRepo from "../controllers/controller/ISocialMediaController";
import {BaseSocialMedia, SocialMediaDetails} from "../../lead/interface/lead";

export class SocialMediaDetailsRepo implements IBaseRepo<SocialMediaDetails> {
    constructor() {
    }

    // Method to get a single social media detail by ID
    public async get(id: number): Promise<SocialMediaDetails | null> {
        const data = await SocialMediaDetailsModel.findOne({
            where: { id },
        });
        return data;
    }

    public async update(id: number, data: Partial<SocialMediaDetailsModel>): Promise<SocialMediaDetailsModel | null> {
        try {
            const socialMediaDetail = await SocialMediaDetailsModel.findByPk(id);
            if (!socialMediaDetail) {
                throw new Error("Social media detail not found");
            }

            // Update the details with the provided data
            await socialMediaDetail.update(data);
            return socialMediaDetail;
        } catch (error) {
            console.error("Error updating social media details:", error);
            throw new Error("Error updating social media details");
        }
    }

    public async getByAffiliateAndPlatform(id: number, platform: string): Promise<SocialMediaDetailsModel | null> {
        try {
            const socialMediaDetail = await SocialMediaDetailsModel.findOne({
                where: {
                    id,
                    platform,
                },
            });
            return socialMediaDetail;
        } catch (error) {
            console.error("Error fetching social media details:", error);
            throw new Error("Error fetching social media details");
        }
    }

    // Method to create a new social media detail
    public async create(data: BaseSocialMedia): Promise<SocialMediaDetails> {
        const response = await SocialMediaDetailsModel.create(data);
        return response;
    }

    public async saveBulk(data: BaseSocialMedia[], options?: { transaction?: any }): Promise<SocialMediaDetails[]> {
        try {
            const { transaction } = options || {};
            // Use bulkCreate to insert multiple records
            const response = await SocialMediaDetailsModel.bulkCreate(data, {transaction});

            // Map over the response array to convert each instance to JSON
            return response.map(item => item.toJSON());
        } catch (error) {
            return [];
        }
    }
}
