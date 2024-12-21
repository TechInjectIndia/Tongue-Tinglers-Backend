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
    ITrackable,
} from "../../../interfaces";
import { ContractModel, UserModel } from "../../../database/schema";
import IContractsController from "../controllers/controller/IContractsController";
import { getUserName } from "../../common/utils/commonUtils";

export class ContractRepo
{
    constructor() {}

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

    public async getContractByDocId(docId: number): Promise<TContract | null> {
        try {
            const contract = await ContractModel.findOne({
                where: {
                    signedDocs: {
                        [Op.contains]: [{ docId }] as any,
                    },
                },
            });

            return contract ? contract : null;
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
    ): Promise<TContract | null> {
        try {
            const contract = await ContractModel.findOne({
                where: {
                    payment: {
                        [Op.contains]: [{ paymentId }] as any,
                    },
                },
            });

            return contract;
            return contract;
        } catch (error) {
            console.error("Error fetching contract by paymentId:", error);
            throw error;
        }
    }

    public async updateContractDoc(
        contractId: number,
        docData: any
    ): Promise<TContract> {
        const [affectedCount, updatedContracts] = await ContractModel.update(
            { signedDocs: docData },
            { where: { id: contractId }, returning: true }
        );

        if (affectedCount === 0) {
            console.log(Error(`Contract with ID ${contractId} not found`));
            return null;
        }

        return updatedContracts[0] as TContract;
    }

    public async create(data: TContractPayload, userId: number): Promise<TContract> {
        const user = await UserModel.findByPk(userId);
        if(!user){
            throw new Error(`User with ID ${userId} not found.`);
        }
        const response = await ContractModel.create(data, {
            userId: user.id,
            userName: getUserName(user),
        });
        return response.get();
    }

    public async getPaymentById(paymentId: string): Promise<TContract | null> {
        const data = await ContractModel.findOne({
            where: {
                payment: {
                    paymentId: paymentId,
                },
            },
        });
        return data ? data.get() : null;
    }

    public async get(id: number): Promise<TContract | null> {
        const data = await ContractModel.findOne({
            where: { id },
        });
        return data ? data : null;
    }

    public async list(filters: TListFiltersContract): Promise<TContractsList> {
        console.log("contract list ",filters);
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

        if (filters?.search && filters?.search !== '') {
            where.templateId = {
                [Op.like]: `%${filters.search}%`,
            };
        }

        // Filter for min_price and max_price
    if (filters?.filters.min_price !== undefined && filters?.filters.min_price !== null) {
        where.amount = { [Op.gte]: filters.filters.min_price };
    }
    if (filters?.filters.max_price !== undefined && filters?.filters.max_price !== null) {
        where.amount = { ...where.amount, [Op.lte]: filters.filters.max_price };
    }

    // Filter for due_date
    if (filters?.filters.due_date) {
        where.dueDate = filters.filters.due_date;  // Assuming it's a direct match, you can adjust the condition if needed (e.g., range).
    }

    // Filter for region
    if (filters?.filters.region) {
        where.region = filters.filters.region;
    }

    // Filter for assignee
    if (filters?.filters.assignee) {
        where.assigneeId = filters.filters.assignee;  // Assuming assignee is identified by an ID
    }
        
        console.log(where);
        const total = await ContractModel.count({
            where: where
        });
        const data = await ContractModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: where
        });
        return { total, data };
    }

    public async update(
        id: number,
        data: Partial<TContract>
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
}
