import {Op} from "sequelize";
import IBaseRepo from '../controllers/controller/IController';
import { TListFilters } from 'apps/common/models/common';
import {
    ProposalModelsList,
    ProposalPayload,
    ProposalTable
} from '../interface/proposal';
import {ProposalModel} from "./ProposalModelTable";
import { UserModel } from "apps/user/models/UserTable";
import { getUserName } from "apps/common/utils/commonUtils";
import { LogModel } from "apps/logs/models/LogsTable";

export class ProposalModelRepo implements IBaseRepo<ProposalTable, TListFilters> {
    constructor() { }

    public async get(id: number): Promise<ProposalTable | null> {
        const data = await ProposalModel.findOne({
            where: {
                id,
            },
            include: [
                {
                    model:LogModel,
                    as: 'logs',
                    where: {model: 'Proposal Model'}
                }
            ]
        });
        return data;
    }

    public async list(filters: TListFilters): Promise<ProposalModelsList> {
        const total = await ProposalModel.count({
            where: {
                title: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });
        const data = await ProposalModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                title: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async create(data: ProposalPayload, userId: number): Promise<ProposalTable> {
        const user = await UserModel.findByPk(userId);
        if(!user){
            throw new Error("User not found");
        }
        const response = await ProposalModel.create(data, {
            userId: userId,
            userName: getUserName(user)
        });
        return response;
    }

    public async update(id: number, data: ProposalPayload): Promise<[affectedCount: number]> {
        const proposalModal = await ProposalModel.findByPk(id);
        if (!proposalModal) {
        throw new Error("Proposal Modal not found");
        }
        proposalModal.set(data);
        await proposalModal.save();
        return [1];
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await ProposalModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
