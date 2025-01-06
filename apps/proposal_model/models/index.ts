import {Op} from "sequelize";
import IBaseRepo from '../controllers/controller/IController';
import { TListFilters } from 'apps/common/models/common';
import {
    ProposalModelsList,
    ProposalPayload,
    ProposalTable
} from '../interface/proposal';
import {ProposalModel} from "./ProposalModelTable";

export class ProposalModelRepo implements IBaseRepo<ProposalTable, TListFilters> {
    constructor() { }

    public async get(id: number): Promise<ProposalTable | null> {
        const data = await ProposalModel.findOne({
            where: {
                id,
            },
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

    public async create(data: ProposalPayload): Promise<ProposalTable> {
        const response = await ProposalModel.create(data);
        return response;
    }

    public async update(id: number, data: ProposalPayload): Promise<[affectedCount: number]> {
        return await ProposalModel.update(data, {
            where: {
                id: id,
            },
        });
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
