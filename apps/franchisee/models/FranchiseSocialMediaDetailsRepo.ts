import { SocialMediaDetailsFranchiseModel } from "../../../database/schema";
import { SocialMediaDetailsAttributesFranchisee, AddSocialMediaDetailsAttributesFranchisee } from "../../../interfaces";
import IFranchiseSocialMediaDetailsController from '../controllers/controller/IFranchiseSocialMediaDetailsController';

export class FranchiseSocialMediaDetailsRepo implements IFranchiseSocialMediaDetailsController<SocialMediaDetailsAttributesFranchisee> {
    // Create a new franchise location
    public async createSocialMediaDetails(franchiseSocialMediaData: AddSocialMediaDetailsAttributesFranchisee): Promise<SocialMediaDetailsAttributesFranchisee> {
        try {
            console.log('franchiseSocialMediaData', franchiseSocialMediaData);
            const newFranchiseSocialMedia = await SocialMediaDetailsFranchiseModel.create(franchiseSocialMediaData);
            return newFranchiseSocialMedia;
        } catch (error) {
            console.error('Error creating franchise social media:', error);
            throw new Error('Failed to create franchise social media: ' + error.message);
        }
    }

    // Retrieve a franchise location by ID
    public async getById(franchiseSocialMediaId: string): Promise<SocialMediaDetailsAttributesFranchisee | null> {
        try {
            const newFranchiseDocialMedia = await SocialMediaDetailsFranchiseModel.findByPk(franchiseSocialMediaId);
            return newFranchiseDocialMedia;
        } catch (error) {
            console.error('Error fetching franchise social media by ID:', error);
            throw new Error('Failed to fetch franchise social media by ID.');
        }
    }

    // Update a franchise location by ID
    public async update(franchiseSocialMediaId: string, newFranchiseDocialMediaData: Partial<SocialMediaDetailsAttributesFranchisee>): Promise<SocialMediaDetailsAttributesFranchisee | null> {
        try {
            await SocialMediaDetailsFranchiseModel.update(newFranchiseDocialMediaData, { where: { id: franchiseSocialMediaId } });
            return await this.getById(franchiseSocialMediaId);
        } catch (error) {
            console.error('Error updating franchise social media:', error);
            throw new Error('Failed to update franchise social media.');
        }
    }
}
