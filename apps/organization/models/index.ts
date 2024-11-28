import { Op } from "sequelize";
import { TListFilters } from "../../../types";
import { AddressModel } from "../../../database/schema";
import IBaseRepo from "../controllers/controller/IController";
import {
    IOrganization, IOrganizationPayload, IOrganizationPayloadData,
} from "../../../interfaces/organization";
import { OrganizationTableModel } from "../database/organization_schema";
import { AddressRepo } from "../../address/models";


export class OrganizationRepo
    implements IBaseRepo<IOrganizationPayloadData, TListFilters> {
    constructor() {
    }

    async create(payload: IOrganizationPayloadData): Promise<boolean> {

        const billingAddressId = (await new AddressRepo().create(payload.billingAddress)).id;
        const shippingAddressIds = await Promise.all(
            payload.shippingAddress.map(async (addressId) => {
                return (await new AddressRepo().create(addressId)).id; // You can also customize the address object if needed
            }),
        );

        const organization = {
            billingAddressId: billingAddressId,
            businessType: payload.businessType,
            deletedBy: null,
            shippingAddressId: shippingAddressIds,
            type: payload.type,
            updatedBy: null,
            name: payload.name,
            contactPersonName: payload.contactPersonName,
            contactNumber: payload.contactNumber,
            contactEmail: payload.contactEmail,
            pan: payload.pan,
            gst: payload.gst,
            bankName: payload.bankName,
            bankAccountNumber: payload.bankAccountNumber,
            bankIFSCCode: payload.bankIFSCCode,
            masterFranchiseId: payload.masterFranchiseId,
            rootUserId: payload.rootUserId,
        };

        return await OrganizationTableModel.create(organization);

    }

    public async get(id: number): Promise<IOrganization | null> {
        const data = await OrganizationTableModel.findOne({
            where: { id },
            include: [
                {
                    model: AddressModel,
                    as: "address",
                    attributes: [
                        "user_id",
                        "street",
                        "city",
                        "state",
                        "postalCode",
                        "country",
                    ],
                },
            ],
        });
        return data;
    }

    public async update(
        id: number,
        data: any,
    ): Promise<[affectedCount: number]> {
        const response = await OrganizationTableModel.update(data, {
            where: { id },
        });
        return response;
    }

    public async delete(id: any): Promise<number> {
        try {
            const deletedCount = await OrganizationTableModel.destroy({
                where: {
                    id: id,
                },
            });
            return deletedCount;
        } catch (error) {
            console.error("Error deleting Organization:", error);
            throw new Error("Failed to delete Organization"); // Rethrow or handle as needed
        }
    }

    public async list(filters: any): Promise<any> {
        const total = await OrganizationTableModel.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });

        const data = await OrganizationTableModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
            include: [
                {
                    model: AddressModel,
                    as: "address",
                    attributes: [
                        "user_id",
                        "street",
                        "city",
                        "state",
                        "postalCode",
                        "country",
                    ],
                },
            ],
        });

        return { total, data };
    }
}
