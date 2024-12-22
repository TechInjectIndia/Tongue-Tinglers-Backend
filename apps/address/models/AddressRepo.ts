import IUserAddressController from "../controllers/IAddressController"; // Ensure this interface is correctly defined
import { Address, BaseAddress, TListFilters } from "../../../types";
import { AddressModel } from "../../../database/schema";
import {parseAddress} from "../parser/addressParser"

export class AddressRepo implements IUserAddressController<BaseAddress, Address, TListFilters> {
    public async list(filters: TListFilters = {
        offset: 0,
        limit: 0,
    }): Promise<Address[]> {
        try {
            const {
                limit = 10,
                offset = 0,
            } = filters;


            const userAddresses = await AddressModel.findAll({
                limit,
                offset,

            }).then((res) => {
                return res.map((address) => parseAddress(address.toJSON()));
            })

            return userAddresses;
        } catch (error) {
            throw new Error(`Error fetching user addresses: ${(error as Error).message}`);
        }
    }

    /**
     * Create a new user address
     * @param payload - Data to create the address
     * @returns The newly created user address
     */
    public async create(payload: BaseAddress, options?: { transaction?: any }): Promise<Address> {
        try {
            const { transaction } = options || {};
            const newUserAddress = await AddressModel.create(payload, {transaction});
            return newUserAddress.toJSON();
        } catch (error) {
            throw new Error(`Error creating user address: ${(error as Error).message}`);
        }
    }

    /**
     * Find a user address by ID
     * @param id - The ID of the user address
     * @returns The user address or null if not found
     */
    public async findById(id: number): Promise<Address | null> {
        try {
            const userAddress = await AddressModel.findByPk(id).then((address) => {
                return parseAddress(address.toJSON());
            });
            return userAddress;
        } catch (error) {
            throw new Error(`Error fetching user address: ${(error as Error).message}`);
        }
    }

    /**
     * Update a user address by ID
     * @param id - The ID of the user address
     * @param payload - The data to update the address with
     * @returns The updated user address or null if not found
     */
    public async updateById(id: number, payload: Partial<BaseAddress>): Promise<Address | null> {
        try {
            const userAddress = await AddressModel.findByPk(id);
            if (!userAddress) return null; // Address not found

            const updatedUserAddress = await userAddress.update(payload);
            return updatedUserAddress.get() as Address;
        } catch (error) {
            throw new Error(`Error updating user address: ${(error as Error).message}`);
        }
    }

    /**
     * Delete a user address by ID
     * @param id - The ID of the user address
     * @returns True if deletion was successful, false if not found
     */
    public async deleteById(id: number): Promise<boolean> {
        try {
            const userAddress = await AddressModel.findByPk(id);
            if (!userAddress) return false; // Address not found

            await userAddress.destroy();
            return true;
        } catch (error) {
            throw new Error(`Error deleting user address: ${(error as Error).message}`);
        }
    }
}
