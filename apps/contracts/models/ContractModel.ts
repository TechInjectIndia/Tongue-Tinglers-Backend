import { Op } from "sequelize";
import {
    TContract,
    TQueryFilters,
    TContractsList,
    TContractPayload,
} from "../../../types";
import {
    CONTRACT_PAYMENT_STATUS,
    ContractPaymentDetails,
} from "../../../interfaces";
import { ContractModel } from "../../../database/schema";
import IContractsController from "../controllers/controller/IContractsController";

export class ContractRepo
    implements IContractsController<TContract, TQueryFilters>
{
    constructor() {}

    public async getContractByDocId(docId: string): Promise<TContract | null> {
        try {
            const contract = await ContractModel.findOne({
                where: {
                    signedDocs: {
                        [Op.contains]: [{ docId }] as any,
                    },
                },
            });

            return contract;
        } catch (error) {
            console.error("Error fetching contract by docId:", error);
            throw error;
        }
    }

    public async updatePaymentStatus(
        contractId: string,
        payment: ContractPaymentDetails[]
    ): Promise<any> {
        try {
            const contract = await ContractModel.findByPk(contractId);
            if (!contract) {
                throw new Error("Contract not found");
            }

            await contract.update({
                payment,
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
        contractId: string,
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

    public async create(data: TContractPayload): Promise<TContract> {
        const response = await ContractModel.create(data);
        return response.get();
    }

    public async getPaymentById(paymentId: string): Promise<TContract | null> {
        const contract = await ContractModel.findOne({
            where: {
                signedDocs: {
                    [Op.contains]: [{ paymentId }] as any,
                },
            },
        });

        return contract;
    }

    public async get(id: string): Promise<TContract | null> {
        const data = await ContractModel.findOne({
            where: { id },
        });
        return data ? data.get() : null;
    }

    public async list(filters: TQueryFilters): Promise<TContractsList> {
        const total = await ContractModel.count({
            where: {
                templateId: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await ContractModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                templateId: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async update(
        id: string,
        data: Partial<TContract>
    ): Promise<[affectedCount: number]> {
        const response = await ContractModel.update(data, {
            where: { id },
        });
        return response;
    }

    public async updatePayment(
        contractId: string,
        paymentData: ContractPaymentDetails[]
    ): Promise<boolean> {
        const [affectedCount] = await ContractModel.update(
            { payment: paymentData },
            { where: { id: contractId } }
        );

        return affectedCount > 0;
    }

    public async delete(ids: string[]): Promise<number> {
        const response = await ContractModel.destroy({
            where: { id: ids },
        });
        return response;
    }
}
