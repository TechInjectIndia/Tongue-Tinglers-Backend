import { Op } from "sequelize";
import {
    TContract,
    TQueryFilters,
    TContractsList,
    TContractPayload,
} from "../../../types";
import { ContractPaymentDetails } from "../../../interfaces";
import { ContractModel } from "../../../database/schema";
import IContractsController from '../controllers/controller/IContractsController';

export class ContractRepo implements IContractsController<TContract, TQueryFilters> {
    constructor() { }

    public async updateContractDoc(contractId: string, docData: any): Promise<TContract> {
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
        const data = await ContractModel.findOne({
            where: {
                payment: {
                    paymentId: paymentId
                }
            }
        });
        return data ? data.get() : null;
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

    public async update(id: string, data: Partial<TContract>): Promise<[affectedCount: number]> {
        const response = await ContractModel.update(data, {
            where: { id },
        });
        return response;
    }

    public async updatePayment(contractId: string, paymentData: ContractPaymentDetails): Promise<boolean> {
        const [affectedCount] = await ContractModel.update(
            { payment: paymentData },
            { where: { id: contractId } }
        );

        return affectedCount > 0;
    }

    public async updatePaymentStatus(paymentId: string, newStatus: ContractPaymentDetails): Promise<boolean> {
        try {
            const contract = await ContractModel.findOne({
                where: {
                    'payment.paymentId': paymentId
                },
                attributes: ['payment']
            });

            if (contract && contract.payment) {
                contract.payment.status = newStatus.status;

                const [affectedCount] = await ContractModel.update(
                    { payment: contract.payment },
                    { where: { 'payment.paymentId': paymentId } }
                );

                return affectedCount > 0;
            }

            return false;
        } catch (error) {
            console.error('Error updating payment status:', error);
            return false;
        }
    }


    public async delete(ids: string[]): Promise<number> {
        const response = await ContractModel.destroy({
            where: { id: ids },
        });
        return response;
    }
}
