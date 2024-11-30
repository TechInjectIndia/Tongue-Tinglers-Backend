import { Op } from "sequelize";
import { SocialMediaDetailsModel } from "../../../database/schema"; // Adjust import based on your structure
import { SocialMediaDetails, SocialMediaDetailsAttributesPayload } from "../../../interfaces";
import IBaseRepo from '../controllers/controller/ISocialMediaController';

export class SocialMediaDetailsRepo implements IBaseRepo<SocialMediaDetails> {
    constructor() { }

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
    public async create(data: SocialMediaDetailsAttributesPayload): Promise<SocialMediaDetails> {
        const response = await SocialMediaDetailsModel.create(data);
        return response;
    }
}
