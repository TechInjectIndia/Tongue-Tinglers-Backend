import { Op } from "sequelize";
import {
    TListFilters
} from "../../../types";
import {
    TVendorList,
    TPayloadVendor,
    TVendorFilters,
    IVendorAttributes,
} from "../../../interfaces";
import { VendorModel } from "../../../database/schema"; // Make sure this imports your actual Vendor model
import IBaseRepo from '../controllers/controller/IVendorController'; // Ensure this interface is correctly defined

export class VendorRepo implements IBaseRepo<IVendorAttributes, TListFilters> {
    constructor() { }

    /**
     * Fetch a vendor by ID
     * @param id - The ID of the vendor
     * @returns Promise<IVendorAttributes | null>
     */
    public async get(id: number): Promise<IVendorAttributes | null> {
        try {
            const vendor = await VendorModel.findOne({ where: { id } });
            return vendor ? (vendor.get() as IVendorAttributes) : null; // Use IVendorAttributes type for return
        } catch (error) {
            // Handle error appropriately, e.g., log it or throw it
            throw new Error(`Error fetching vendor: ${error.message}`);
        }
    }

    public async getVendorByAttr(whereName: string, whereVal: any, getAttributes: string[] = ['*']): Promise<IVendorAttributes | null> {
        const whereAttributes = { [whereName]: whereVal };
        const data = await VendorModel.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data as IVendorAttributes | null; // Ensure return type matches
    }

    public async list(filters: TVendorFilters): Promise<TVendorList> {
        const total = await VendorModel.count({
            where: {
                first_name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });

        // Ensure that sorting is defined, or provide a default value
        const order: any = filters.sorting ? [filters.sorting] : ['first_name', 'ASC']; // Default sorting

        const data = await VendorModel.findAll({
            order: order,
            where: {
                first_name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });

        return { total, data }; // Ensure this structure matches TVendorList
    }

    public async create(data: TPayloadVendor): Promise<IVendorAttributes> {
        const response = await VendorModel.create(data);
        return response.get() as IVendorAttributes; // Return the created vendor as TVendor type
    }

    public async update(id: number, data: TPayloadVendor): Promise<number> {
        const [affectedCount] = await VendorModel.update(data, {
            where: {
                id,
            },
        });
        return affectedCount; // Return affected count directly
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await VendorModel.destroy({
            where: {
                id: ids,
            },
        });
        return response; // Return the number of deleted rows
    }
}
