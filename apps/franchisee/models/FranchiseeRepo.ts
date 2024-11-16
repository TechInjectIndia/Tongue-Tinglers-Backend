import { FranchiseeModel } from "../../../database/schema";
import { RegionModel } from "../../../database/schema";
import { ContractModel } from "../../../database/schema";
import { FranchiseLocationModel } from "../../../database/schema";
import { SocialMediaDetailsFranchiseModel } from "../../../database/schema";
import { Op } from "sequelize";
import { FranchiseeAttributes, AddFranchiseePayload } from "../../../interfaces";
import IFranchiseeController from '../controllers/controller/IFranchiseeController';

export class FranchiseeRepo implements IFranchiseeController<FranchiseeAttributes> {
    // Create a new franchisee
    public async createFranchisee(franchiseeData: AddFranchiseePayload): Promise<FranchiseeAttributes> {
        try {
            const newFranchisee = await FranchiseeModel.create(franchiseeData);
            return newFranchisee;
        } catch (error) {
            console.error('Error creating franchisee:', error);
            throw new Error('Failed to create franchisee.');
        }
    }

    // Retrieve all franchisees
    public async getAllFranchisees(franchiseType: string): Promise<FranchiseeAttributes[]> {
        try {
            const whereClause = franchiseType ? { franchiseType } : {};
            let franchisees: any;
            if (franchiseType == '') {
                franchisees = await FranchiseeModel.findAll();
            } else {
                franchisees = await FranchiseeModel.findAll({
                    where: whereClause
                });
            }

            return franchisees;
        } catch (error) {
            console.error('Error fetching franchisees:', error);
            throw new Error('Failed to fetch franchisees.');
        }
    }

    // Retrieve a franchisee by ID
    public async getFranchiseeById(franchiseeId: string): Promise<FranchiseeAttributes & { contracts?: ContractModel[] } | null> {
        try {
            const franchisee = await FranchiseeModel.findOne({
                where: { id: franchiseeId },
                include: [
                    { model: RegionModel, as: 'region' },
                    { model: FranchiseLocationModel, as: 'franchiseLocation'},
                    { model: SocialMediaDetailsFranchiseModel, as: 'socialMediaDetails' }
                ]
            });

            if (franchisee) {
                // Get contracts based on the contractIds
                const contracts = await ContractModel.findAll({
                    where: {
                        id: franchisee.contractIds
                    }
                });

                // Include contracts in the result
                return {
                    ...franchisee.toJSON(),
                    contracts
                };
            }

            return null;
        } catch (error) {
            console.error('Error fetching franchisee by ID:', error);
            throw new Error('Failed to fetch franchisee by ID.');
        }
    }

    // Retrieve a franchisee by ID
    public async getFranchiseeByUserId(userId: string): Promise<FranchiseeAttributes | null> {
        try {
            const franchisee = await FranchiseeModel.findOne({
                raw: true,
                where: { userid: userId }
            });
            return franchisee;
        } catch (error) {
            console.error('Error fetching franchisee by ID:', error);
            throw new Error('Failed to fetch franchisee by ID.');
        }
    }

    // Update a franchisee by ID
    public async updateFranchisee(franchiseeId: string, franchiseeData: Partial<FranchiseeAttributes>): Promise<FranchiseeAttributes | null> {
        try {
            await FranchiseeModel.update(franchiseeData, { where: { id: franchiseeId } });
            return await this.getFranchiseeById(franchiseeId); // Return the updated franchisee
        } catch (error) {
            console.error('Error updating franchisee:', error);
            throw new Error('Failed to update franchisee.');
        }
    }

    // Delete a franchisee by ID
    public async deleteFranchisee(franchiseeId: string): Promise<boolean> {
        try {
            const result = await FranchiseeModel.destroy({ where: { id: franchiseeId } });
            return result > 0; // Return true if a franchisee was deleted
        } catch (error) {
            console.error('Error deleting franchisee:', error);
            throw new Error('Failed to delete franchisee.');
        }
    }
}
