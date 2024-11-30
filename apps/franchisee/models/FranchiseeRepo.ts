import { FranchiseeModel } from "../../../database/schema";
import { RegionModel } from "../../../database/schema";
import { FRANCHISE_STATUS, FranchiseDetails, Franchisee } from "../../../interfaces";


import IFranchiseeController from '../controllers/controller/IFranchiseeController';

export class FranchiseeRepo implements IFranchiseeController<Franchisee, FranchiseDetails> {
    // Create a new franchisee
    public async createFranchisee(franchiseeData: FranchiseDetails): Promise<Franchisee> {
        try {

            const franchise: Franchisee = {
                location: 0,
                sm: [],
                pocName: "",
                pocEmail: "",
                pocPhoneNumber: "",
                users: [],
                regionId: 0,
                area: "",
                agreementIds: [],
                paymentIds: [],
                status: FRANCHISE_STATUS.Active,
                establishedDate: undefined,
                id: 0,
                createdAt: undefined,
                createdBy: 0,
                updatedBy: 0,
                deletedBy: 0,
                updatedAt: undefined,
                deletedAt: undefined
            }
            const newFranchisee = await FranchiseeModel.create(franchise);
            return newFranchisee.toJSON();
        } catch (error) {
            console.error('Error creating franchisee:', error);
            throw new Error('Failed to create franchisee.');
        }
    }

    // Retrieve all franchisees
    public async getAllFranchisees(franchiseType: string): Promise<Franchisee[]> {
        try {
            const whereClause = franchiseType ? { franchiseType } : {};
            let franchisees: any;
            if (franchiseType == '') {
                franchisees = await FranchiseeModel.findAll({
                    include: [
                        { model: RegionModel, as: 'region' },

                    ]
                });
            } else {
                franchisees = await FranchiseeModel.findAll({
                    where: whereClause,
                    include: [
                        { model: RegionModel, as: 'region' },

                    ]
                });
            }

            return franchisees;
        } catch (error) {
            console.error('Error fetching franchisees:', error);
            throw new Error('Failed to fetch franchisees.');
        }
    }

    // Retrieve a franchisee by ID
    public async getFranchiseeById(franchiseeId: number): Promise<Franchisee> {
        try {
            const franchisee = await FranchiseeModel.findOne({
                where: { id: franchiseeId },
                include: [
                    { model: RegionModel, as: 'region' },

                ]
            });



            // Include contracts in the result
            return {
                ...franchisee.toJSON(),
            };


            return null;
        } catch (error) {
            console.error('Error fetching franchisee by ID:', error);
            throw new Error('Failed to fetch franchisee by ID.');
        }
    }

    // Retrieve a franchisee by ID
    public async getFranchiseeByUserId(userId: number): Promise<Franchisee | null> {
        try {
            const franchisee = await FranchiseeModel.findOne({
                raw: true,

            });
            return franchisee;
        } catch (error) {
            console.error('Error fetching franchisee by ID:', error);
            throw new Error('Failed to fetch franchisee by ID.');
        }
    }

    // Update a franchisee by ID
    public async updateFranchisee(franchiseeId: number, franchiseeData: Partial<Franchisee>): Promise<Franchisee | null> {
        try {
            await FranchiseeModel.update(franchiseeData, { where: { id: franchiseeId } });
            return await this.getFranchiseeById(franchiseeId); // Return the updated franchisee
        } catch (error) {
            console.error('Error updating franchisee:', error);
            throw new Error('Failed to update franchisee.');
        }
    }

    // Delete a franchisee by ID
    public async deleteFranchisee(franchiseeId: number): Promise<boolean> {
        try {
            const result = await FranchiseeModel.destroy({ where: { id: franchiseeId } });
            return result > 0; // Return true if a franchisee was deleted
        } catch (error) {
            console.error('Error deleting franchisee:', error);
            throw new Error('Failed to delete franchisee.');
        }
    }
}
