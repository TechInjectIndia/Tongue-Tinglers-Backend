import { FranchiseLocationModel } from "../../../database/schema";
import { FranchiseLocationAttributes, AddFranchiseLocationPayload } from "../../../interfaces";
import IFranchiseLocationController from '../controllers/controller/IFranchiseLocationController';

export class FranchiseLocationRepo implements IFranchiseLocationController<FranchiseLocationAttributes> {
    // Create a new franchise location
    public async createFranchiseLocation(franchiseLocationData: AddFranchiseLocationPayload): Promise<FranchiseLocationAttributes> {
        try {
            const newFranchiseLocation = await FranchiseLocationModel.create(franchiseLocationData);
            return newFranchiseLocation;
        } catch (error) {
            console.error('Error creating franchise location:', error);
            throw new Error('Failed to create franchise location.');
        }
    }

    // Retrieve a franchise location by ID
    public async getFranchiseLocationById(franchiseLocationId: number): Promise<FranchiseLocationAttributes | null> {
        try {
            const franchiseLocation = await FranchiseLocationModel.findByPk(franchiseLocationId);
            return franchiseLocation;
        } catch (error) {
            console.error('Error fetching franchise location by ID:', error);
            throw new Error('Failed to fetch franchise location by ID.');
        }
    }

    // Update a franchise location by ID
    public async updateFranchiseLocationByFranchiseId(franchiseeId: number, franchiseLocationData: Partial<FranchiseLocationAttributes>): Promise<FranchiseLocationAttributes | null> {
        try {
            await FranchiseLocationModel.update(franchiseLocationData, { where: { franchiseeId: franchiseeId } });
            return await this.getFranchiseLocationById(franchiseeId); // Return the updated franchise location
        } catch (error) {
            console.error('Error updating franchise location:', error);
            throw new Error('Failed to update franchise location.');
        }
    }
}
