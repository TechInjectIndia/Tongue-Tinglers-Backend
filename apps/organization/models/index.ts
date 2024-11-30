import { Op } from "sequelize";
import {
    TListFilters,
    TListFiltersCampaigns,
    TPayloadAddressUser,
} from "../../../types";
import {
    TCampaignList,
    TPayloadCampaign,
    ICampaign,
    IQuestion,
} from "../../../interfaces";
import {
    AddressModel,
    CampaignAdModel,
    questionModel,
} from "../../../database/schema";
import IBaseRepo from "../controllers/controller/IController";
import {
    IOrganization,
    IOrganizationPayload,
    TOrganization,
} from "../../../interfaces/organization";
import { OrganizationTableModel } from "../database/organization_schema";
import { AddressRepo } from "../../../apps/address/models";

export class OrganizationRepo
    implements IBaseRepo<IOrganization, TListFilters>
{
    constructor() {}

    public async create(data: TOrganization): Promise<any> {
        const address = await new AddressRepo().createForUser({
            city: data.city,
            country: data.country,
            postalCode: data.postalCode,
            state: data.state,
            street: data.street,
            user_id: data.createdBy,
        });

        const organization = {
            name: data.name,
            contactPersonName: data.contactPersonName,
            contactNumber: data.contactNumber,
            contactEmail: data.contactEmail,
            addressId: address.id,
            pan: data.pan,
            gst: data.gst,
            bankName: data.bankName,
            bankAccountNumber: data.bankAccountNumber,
            bankIFSCCode: data.bankIFSCCode,
            masterFranchiseId: data.masterFranchiseId,
            createdBy: data.createdBy,
            rootUserId: data.rootUserId,
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
        data: any
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
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });

        const data = await OrganizationTableModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                name: {
                    [Op.iLike]: `%${filters.search}%`,
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
