import { Op } from "sequelize";
import {
    TLeadPayload,
    TLeadsList,
    TLeadStatus,
    TListFilters,
    TListFiltersAreas,
} from "../../../types";
import { ILead } from "../../../interfaces"; // Use the LeadStatus
import {
    AssignModel,
    CampaignAdModel,
    LeadsModel,
    UserModel
} from "../../../database/schema";
// enum from interfaces
import { createLeadsResponse } from "../../../libraries";
import { handleError } from "../../common/utils/HelperMethods";
import { getUserName } from "../../common/utils/commonUtils";
import { parseLead } from "../parser/leadParser";
import moment from "moment";

export class LeadRepo {
    constructor() {
    }

    // Update the status of a lead
    public async updateStatus(
        id: number,
        data: TLeadStatus
    ): Promise<[affectedCount: number]> {
        const response = await LeadsModel.update(data, {
            where: { id },
        });
        return response;
    }

    // Get lead status by any attribute
    public async getLeadStatus(
        whereName: keyof ILead,
        whereVal: any,
        getAttributes: any = ["*"]
    ): Promise<TLeadStatus | null> {
        const whereAttributes = { [whereName]: whereVal };
        const data = await LeadsModel.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes,
        });
        return data as TLeadStatus | null;
    }

    // Get lead by attribute
    public async getLeadByAttr(
        whereName: keyof ILead,
        whereVal: any,
        getAttributes: any = ["*"],
        options?: { transaction?: any }
    ): Promise<any | null> {
        const { transaction } = options || {};
        const whereAttributes = { [whereName]: whereVal };
        const data = await LeadsModel.findOne({
            where: whereAttributes,
            include: [
                {
                    model: UserModel,
                    as: "creator",
                },
                {
                    model: UserModel,
                    as: "updater",
                },
                {
                    model: UserModel,
                    as: "deleter",
                },
                {
                    model: CampaignAdModel,
                    as: "campaign_ad",
                },
                {
                    model: UserModel,
                    as: "assignee",
                },

            ],
            transaction
        });
        return parseLead(data.toJSON());
    }

    // Get lead by ID
    public async get(id: number, options?: { transaction?: any }): Promise<ILead> {
        try {
            const { transaction } = options || {};
            const data = await LeadsModel.findOne({
                raw: true,
                where: { id },
                transaction
            });
            // console.dir(data.toJSON(), { depth: true });

            return data;


        }
        catch (error: any) {
            handleError(error, id)
        }
    }

    // Get lead by ID and status
    public async getLeadByStatus(id: number): Promise<ILead | null> {
        const data = await LeadsModel.findOne({
            raw: true,
            where: {
                id: id,
            },
        });
        return data as ILead | null;
    }

    // Check if lead exists with a specific email and exclude a specific ID
    public async checkLeadExist(
        email: string,
        excludeId: number
    ): Promise<ILead | null> {
        const data = await LeadsModel.findOne({
            where: {
                email: email,
                id: { [Op.ne]: excludeId },
            },
        });
        return data as ILead | null;
    }

    // List leads with filters
    public async list(filters: TListFiltersAreas): Promise<TLeadsList> {
        const where: any = {};

        const validStatuses = [
            "new",
            "contacted",
            "qualified",
            "proposal-sent",
            "negotiation",
            "converted",
            "followed-up",
            "lost",
        ]; // Replace with your actual enum values
        const validSources = [
            "admin",
            "search",
            "content",
            "email-marketing",
            "paid",
            "social-media",
            "event",
            "referral",
        ];
        if (
            filters?.filters.status &&
            validStatuses.includes(filters.filters.status)
        ) {
            where.status = filters.filters.status;
        }
        if (
            filters?.filters.source &&
            validSources.includes(filters.filters.source)
        ) {
            where.source = filters.filters.source;
        }

        // Add dynamic filters
        if (filters?.filters.region) {
            where.region = {
                [Op.iLike]: `%${filters.filters.region}%`,
            };
        }
        const include: any[] = [];
        if (filters?.filters.campaign) {
            include.push({
                model: CampaignAdModel, // Replace with your actual Campaign
                // model
                as: "campaign_ad", // Alias defined in the relationship
                where: {
                    name: {
                        [Op.iLike]: `%${filters.filters.campaign}%`, // Search
                        // by
                        // campaign
                        // name
                    },
                },
                required: true, // Ensures only matching leads are included
            });
        }
        if (filters?.filters.assignee) {
            where.assignee = {
                [Op.iLike]: `%${filters.filters.assignee}%`,
            };
        }
        if (filters?.filters.date) {
            const date = moment(filters.filters.date); // Parse the given date
            where.created_at = {
                [Op.between]: [
                    date.startOf('day').toDate(), // Start of the day (00:00)
                    date.endOf('day').toDate(),   // End of the day (23:59:59)
                ],
            };// Adjust for exact or range
        }
        if (filters?.filters.affiliate) {
            where.affiliate = {
                [Op.iLike]: `%${filters.filters.affiliate}%`,
            };
        }
        if (filters?.filters.minAmount || filters?.filters.maxAmount) {
            where.amount = {};

            if (filters?.filters.minAmount) {
                where.amount[Op.gte] = filters?.filters.minAmount; // Minimum amount
            }

            if (filters?.filters.maxAmount) {
                where.amount[Op.lte] = filters?.filters.maxAmount; // Maximum amount
            }
        }
        console.log(where);
        const total = await LeadsModel.count({
            where: where,
            include: include,
        });

        const data = await LeadsModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: where,
            include: include
        });

        return { total, data } as TLeadsList;
    }

    // Create a new lead
    public async create(data: TLeadPayload, userId: number): Promise<ILead | null> {
        try {
            const user = await UserModel.findByPk(userId);
            if (!user) {
                throw new Error(`User with ID ${userId} not found.`);
            }
            const leadData: TLeadPayload = {
                ...data,
                // Ensure logs is kept as an array
                logs: data.logs, // Assuming logs is already of type
                // ITrackable[]
            };
            return LeadsModel.create(leadData, {
                userId: user.id,
                userName: getUserName(user),
            });
        }
        catch (error) {
            handleError(error, data)
            const message = `${error.message ?? ''}: error while creating lead`
            // todo @sunil getHandledErrorDTO(message, error)
            return null
        }
    }

    // Update lead information
    public async update(
        id: number,
        data: TLeadPayload
    ): Promise<[affectedCount: number]> {
        const lead = await LeadsModel.findByPk(id);
        if (!lead) {
            throw new Error("Lead not found");
        }
        lead.set(data);
        await lead.save();
        return [1];
    }

    // Assign a lead to a user
    public async assignLeadToUser(
        id: number,
        data: any
    ): Promise<[affectedCount: number]> {
        try {
            const response = await LeadsModel.update(data, {
                where: { id },
            });

            return response;
        }
        catch (error) {
            console.error("Error updating lead:", error);
            throw new Error("Failed to assign lead to user"); // Rethrow or
            // handle as
            // needed
        }
    }

    // Delete leads by an array of IDs
    public async delete(ids: number[]): Promise<number> {
        try {
            const deletedCount = await LeadsModel.destroy({
                where: {
                    id: ids,
                },
            });
            return deletedCount;
        }
        catch (error) {
            console.error("Error deleting leads:", error);
            throw new Error("Failed to delete leads"); // Rethrow or handle as
            // needed
        }
    }

    // Search leads with filters
    public async searchLead(filters: TListFilters): Promise<any> {
        const total = await LeadsModel.count({
            where: {
                [Op.or]: [
                    // { id: { [Op.like]: `%${filters.search}%` } },
                    { firstName: { [Op.iLike]: `%${filters.search}%` } },
                    { lastName: { [Op.iLike]: `%${filters.search}%` } },
                    { email: { [Op.iLike]: `%${filters.search}%` } },
                ],
            },
        });

        const leads = await LeadsModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                [Op.or]: [
                    // { id: { [Op.like]: Number(`%${filters.search}%`) } },
                    { firstName: { [Op.iLike]: `%${filters.search}%` } },
                    { lastName: { [Op.iLike]: `%${filters.search}%` } },
                    { email: { [Op.iLike]: `%${filters.search}%` } },
                ],
            },
            include: [
                {
                    model: AssignModel,
                    as: "assign",
                    attributes: ["assignedTo", "assignedBy", "assignedDate"],
                    include: [
                        {
                            model: UserModel,
                            as: "assignedUser", // Use the alias for assignedTo
                            attributes: ["id"],
                        },
                        {
                            model: UserModel,
                            as: "assignerUser", // Use the alias for assignedBy
                            attributes: ["id"],
                        },
                    ],
                },
            ],
        });

        const data = createLeadsResponse(leads);

        return { total, data };
    }
}
