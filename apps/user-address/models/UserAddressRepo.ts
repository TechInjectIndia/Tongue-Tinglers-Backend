import { UserAddressModel } from "../../../database/schema";
import { UserAddressAttributes, IUserAddressPayload } from "../../../interfaces"; // Ensure these interfaces are defined
import IUserAddressController from '../controllers/controller/IUserAddressController'; // Ensure this interface is correctly defined
import { TListFilters } from "../../../types";

export class UserAddressRepo implements IUserAddressController<UserAddressAttributes, TListFilters> {
    /**
     * Create a new user address
     * @param payload - Data for creating a new user address
     * @returns The newly created user address
     */
    public async create(payload: IUserAddressPayload): Promise<UserAddressAttributes> {
        try {
            const newUserAddress = await UserAddressModel.create(payload);
            return newUserAddress.get() as UserAddressAttributes;
        } catch (error) {
            throw new Error(`Error creating user address: ${(error as Error).message}`);
        }
    }

    public async list(userId: string): Promise<UserAddressAttributes[]> {
        const data = await UserAddressModel.findAll({
            where: {
                userId
            },
        });
        return data;
    }

    /**
     * Find a user address by ID
     * @param id - The ID of the user address
     * @returns The user address or null if not found
     */
    public async findById(id: string, userId: string): Promise<UserAddressAttributes | null> {
        try {
            const userAddress = await UserAddressModel.findOne({
                where: {
                    id,
                    userId
                }
            });
            return userAddress ? (userAddress.get() as UserAddressAttributes) : null;
        } catch (error) {
            throw new Error(`Error fetching user address: ${(error as Error).message}`);
        }
    }

    /**
     * Update a user address by ID
     * @param id - The ID of the user address
     * @param payload - The data to update
     * @returns The updated user address or null if not found
     */
    public async updateById(id: string, payload: Partial<IUserAddressPayload>): Promise<UserAddressAttributes | null> {
        try {
            const userAddress = await UserAddressModel.findByPk(id);
            if (!userAddress) {
                return null; // Address not found
            }

            const updatedUserAddress = await userAddress.update(payload);
            return updatedUserAddress.get() as UserAddressAttributes;
        } catch (error) {
            throw new Error(`Error updating user address: ${(error as Error).message}`);
        }
    }

    /**
     * Delete a user address by ID
     * @param id - The ID of the user address
     * @returns True if deletion was successful, false if not found
     */
    public async deleteById(id: string): Promise<boolean> {
        try {
            const userAddress = await UserAddressModel.findByPk(id);
            if (!userAddress) {
                return false; // Address not found
            }

            await userAddress.destroy();
            return true;
        } catch (error) {
            throw new Error(`Error deleting user address: ${(error as Error).message}`);
        }
    }
}
