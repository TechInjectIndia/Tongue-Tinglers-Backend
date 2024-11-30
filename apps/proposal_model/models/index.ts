const { Op } = require("sequelize");
import {
    ProposalModels,
    ProposalModelsList,
    TPayloadProposalModel,
} from "../../../interfaces";
import {
    TListFilters,
} from "../../../types";
import { ProposalLeadModels } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IController';

export class ProposalModelRepo implements IBaseRepo<ProposalModels, TListFilters> {
    constructor() { }

    public async get(id: number): Promise<ProposalModels | null> {
        const data = await ProposalLeadModels.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TListFilters): Promise<ProposalModelsList> {
        const total = await ProposalLeadModels.count({
            where: {
                title: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });
        const data = await ProposalLeadModels.findAll({
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

    public async create(data: TPayloadProposalModel): Promise<ProposalModels> {

        const response = await ProposalLeadModels.create(data);
        return response;
    }

    public async update(id: number, data: TPayloadProposalModel): Promise<[affectedCount: number]> {
        return await ProposalLeadModels.update(data, {
            where: {
                id: id,
            },
        });
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await ProposalLeadModels.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
