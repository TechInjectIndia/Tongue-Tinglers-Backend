import { Op } from "sequelize";
import {
    TContract,
    TQueryFilters,
    TContractsList,
    TAddContract,
} from "../../../types";
import { ContractPaymentDetails } from "../../../interfaces";
import { ContractModel } from "../../../database/schema";
import IContractsController from '../controllers/controller/IContractsController';

export class ContractRepo implements IContractsController<TContract, TQueryFilters> {
    constructor() { }

    public async create(data: TAddContract): Promise<TContract> {
        const response = await ContractModel.create(data);
        return response.get();
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

        return affectedCount > 0; // Returns true if the update was successful
    }

    public async delete(ids: string[]): Promise<number> {
        const response = await ContractModel.destroy({
            where: { id: ids },
        });
        return response;
    }
}