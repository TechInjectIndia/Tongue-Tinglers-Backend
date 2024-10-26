import { FranchiseeModel } from "../../../database/schema"; // Adjust import path as necessary
import { Op } from "sequelize";
import { FranchiseeAttributes } from "../../../interfaces";
import IFranchiseeController from '../controllers/controller/IFranchiseeController';

export class FranchiseeRepo implements IFranchiseeController<FranchiseeAttributes> {
    // Create a new franchisee
    public async createFranchisee(franchiseeData: FranchiseeAttributes): Promise<FranchiseeAttributes> {
        try {
            const newFranchisee = await FranchiseeModel.create(franchiseeData);
            return newFranchisee;
        } catch (error) {
            console.error('Error creating franchisee:', error);
            throw new Error('Failed to create franchisee.');
        }
    }

    // Retrieve all franchisees
    public async getAllFranchisees(): Promise<FranchiseeAttributes[]> {
        try {
            const franchisees = await FranchiseeModel.findAll();
            return franchisees;
        } catch (error) {
            console.error('Error fetching franchisees:', error);
            throw new Error('Failed to fetch franchisees.');
        }
    }

    // Retrieve a franchisee by ID
    public async getFranchiseeById(franchiseeId: string): Promise<FranchiseeAttributes | null> {
        try {
            const franchisee = await FranchiseeModel.findByPk(franchiseeId);
            return franchisee;
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
