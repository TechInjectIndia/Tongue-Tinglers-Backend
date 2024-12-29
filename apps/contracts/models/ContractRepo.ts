import { Op } from "sequelize";

import {
    TContract,
    TQueryFilters,
    TContractsList,
    TContractPayload,
    TListFiltersContract,
} from "../../../types";
import {
    CONTRACT_PAYMENT_STATUS,
    CONTRACT_STATUS,
    ContractPaymentDetails,
    Pagination,
} from "../../../interfaces";
import { CampaignAdModel, ContractModel, LeadsModel, UserModel } from "../../../database/schema";
import { getUserName } from "../../common/utils/commonUtils";
import moment from "moment";
import { OrganizationModel } from "../../organization/database/organization_schema";
import { ContractsPayload, ParsedContract, PartialContractsUpdate } from "../interface/contracts";
import { ITrackable } from "../../lead/interface/lead";
import {parseContract} from "../parser/contractParser"
export class ContractRepo {
    constructor() { }

    // Method to fetch associated contracts
    public async getAssociatedContracts(
        contractIds: string[]
    ): Promise<ContractModel[]> {
        if (!contractIds || contractIds.length === 0) {
            return [];
        }

        const contracts = await ContractModel.findAll({
            where: {
                id: {
                    [Op.in]: contractIds, // Use Op.in to match multiple IDs
                },
            },
            include: [{
                model: LeadsModel,
                as: "lead",
                include: [{
                    model: CampaignAdModel,
                    as: 'campaign_ad'
                }]
            }],
        });

        return contracts;
    }

    public async getAssociatedContractsByLeadId(
        leadId: number
    ): Promise<number[]> {
        const contracts = await ContractModel.findAll({
            where: { leadId: leadId },
            attributes: ["id"], // Select only the 'id' attribute
        });

        // Map to extract only the 'id' attribute
        return contracts ? contracts.map((contract) => contract.id) : null;
    }

    public async getContractByDocId(docId: number): Promise<ParsedContract | null> {
        try {
            const contract = await ContractModel.findOne({
                where: {
                    signedDocs: {
                        [Op.contains]: [{ docId }] as any,
                    },
                },
                include: [{
                    model: LeadsModel,
                    as: "lead",
                    include: [{
                        model: CampaignAdModel,
                        as: 'campaign_ad'
                    }]
                }],
            });

            return parseContract(contract)
        } catch (error) {
            console.error("Error fetching contract by docId:", error);
            throw error;
        }
    }

    public async updatePaymentStatus(
        contractId: number,
        payment: ContractPaymentDetails[],
        status: CONTRACT_STATUS
    ): Promise<any> {
        try {
            const contract = await ContractModel.findByPk(contractId);
            if (!contract) {
                throw new Error("Contract not found");
            }

            await contract.update({
                payment,
                status,
            });
        } catch (error) {
            console.error("Error updating payment status:", error);
            throw error;
        }
    }

    public async getContractByPaymentId(
        paymentId: string
    ): Promise<ParsedContract | null> {
        try {
            const contract = await ContractModel.findOne({
                where: {
                    payment: {
                        [Op.contains]: [{ paymentId }] as any,
                    },
                },
                include: [{
                    model: LeadsModel,
                    as: "lead",
                    include: [{
                        model: CampaignAdModel,
                        as: 'campaign_ad'
                    }]
                }],
            });

            return parseContract(contract);
        } catch (error) {
            console.error("Error fetching contract by paymentId:", error);
            throw error;
        }
    }

    public async updateContractDoc(
        contractId: number,
        docData: any
    ): Promise<ParsedContract> {
        const [affectedCount, updatedContracts] = await ContractModel.update(
            { signedDocs: docData },
            { where: { id: contractId }, returning: true }
        );

        if (affectedCount === 0) {
            console.log(Error(`Contract with ID ${contractId} not found`));
            return null;
        }

        return parseContract(updatedContracts[0])
    }

    public async create(
        data: ContractsPayload,
        userId: number,
        options?: { transaction?: any }
    ): Promise<ParsedContract> {
        const { transaction } = options || {};
        console.log('userId: ', userId);
        const user = await UserModel.findByPk(userId);
        console.log('user: ', user);
        if (!user) {
            throw new Error(`User with ID ${userId} not found.`);
        }
        console.log('data: ', data);
        const response = await ContractModel.create(data, {
            userId: user.id,
            userName: getUserName(user),
            transaction,
        });
        return parseContract(response);
    }

    public async getPaymentById(paymentId: string): Promise<ParsedContract | null> {
        const data = await ContractModel.findOne({
            where: {
                payment: {
                    paymentId: paymentId,
                },
            },
            include: [{
                model: LeadsModel,
                as: "lead",
                include: [{
                    model: CampaignAdModel,
                    as: 'campaign_ad'
                }]
            }],
        });
        return data ? parseContract(data) : null;
    }

    public async get(
        id: number,
        options?: { transaction?: any }
    ): Promise<ParsedContract | null> {
        const { transaction } = options || {};
        const data = await ContractModel.findOne({
            where: { id },
            include: [{
                model: LeadsModel,
                as: "lead",
                include: [{
                    model: CampaignAdModel,
                    as: 'campaign_ad'
                }]
            }],
            transaction,
        });
        return data ? parseContract(data) : null;
    }

    public async list(filters: TListFiltersContract): Promise<any> {
        console.log("contract list ", filters);
        const where: any = {};
        const validStatuses = Object.values(CONTRACT_STATUS).filter(
            (status) => status === filters.filters?.status
        );
        console.log(validStatuses);

        if (
            filters?.filters.status &&
            validStatuses.includes(filters.filters.status)
        ) {
            where.status = filters.filters.status;
        }

        if (filters?.search && filters?.search !== "") {
            where.templateId = {
                [Op.like]: `%${filters.search}%`,
            };
        }

        // Filter for min_price and max_price
        if (filters?.filters.minPrice || filters?.filters.maxPrice) {
            where.amount = {};

            if (filters?.filters.minPrice) {
                where.amount[Op.gte] = filters?.filters.minPrice; // Minimum amount
            }

            if (filters?.filters.maxPrice) {
                where.amount[Op.lte] = filters?.filters.maxPrice; // Maximum amount
            }
        }

        // Filter for due_date
        if (filters?.filters.dueDate) {
            const date = moment(filters.filters.dueDate); // Parse the given date
            where.dueDate = {
                [Op.between]: [
                    date.startOf("day").toDate(), // Start of the day (00:00)
                    date.endOf("day").toDate(), // End of the day (23:59:59)
                ],
            }; // Adjust for exact or range
        }

        // Filter for region
        if (filters?.filters.region) {
            where.region = filters.filters.region;
        }

        // Filter for assignee
        if (filters?.filters.assignee) {
            where.createdBy = filters.filters.assignee; // Assuming assignee is identified by an ID
        }

        if (filters?.filters.zohoTemplate) {
            where.templateId = filters.filters.zohoTemplate; // Assuming assignee is identified by an ID
        }

        console.log(where);
        const total = await ContractModel.count({
            where: where,
        });
        const data = await ContractModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: where,
            include: [{
                model: LeadsModel,
                as: "lead",
                include: [{
                    model: CampaignAdModel,
                    as: 'campaign_ad'
                }]
            },{
                model: OrganizationModel,
                as: 'organization',
            }],
        });
        const parsedData: ParsedContract[] = await Promise.all(data.map((contract) => parseContract(contract)));
        return { total,data: parsedData}
    }

    public async update(
        id: number,
        data: Partial<ContractsPayload>
    ): Promise<[affectedCount: number]> {
        const response = await ContractModel.update(data, {
            where: { id },
        });
        return response;
    }

    public async updatePayment(
        contractId: number,
        paymentData: ContractPaymentDetails[],
        logs: ITrackable[],
        status: CONTRACT_STATUS
    ): Promise<boolean> {
        const [affectedCount] = await ContractModel.update(
            { payment: paymentData, logs: logs, status: status },
            { where: { id: contractId } }
        );

        return affectedCount > 0;
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await ContractModel.destroy({
            where: { id: ids },
        });
        return response;
    }

    public async updatePartialContract(contractId: number, payload: PartialContractsUpdate): Promise<boolean> {
        const [affectedCount] = await ContractModel.update(payload, {
            where: { id: contractId },
        });
        return affectedCount > 0;
    }
}

