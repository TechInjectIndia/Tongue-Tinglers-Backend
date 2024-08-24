import {Op} from "sequelize";
import {
    TFollowUp,
    TFollowUpFilters,
    TFollowUpsList,
    TAddFollowUp,
} from "../../../types/lead/followup";
import { FollowUps } from "../../../database/schema";

export class FollowUpsModel {
    constructor() { }

    public async getFollowUpById(id: number): Promise<TFollowUp | any> {
        const data = await FollowUps.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TFollowUpFilters): Promise<TFollowUpsList | any> {
        const total = await FollowUps.count({
            where: {
                title: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await FollowUps.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                title: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async add(data: TAddFollowUp): Promise<TFollowUp | any> {
        const response = await FollowUps.create(data);
        return response;
    }

    public async update(id: number, data: TAddFollowUp): Promise<TFollowUp | any> {
        const response = await FollowUps.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<TFollowUp | any> {
        const response = await FollowUps.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
