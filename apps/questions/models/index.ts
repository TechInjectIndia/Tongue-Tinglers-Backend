import { Op } from "sequelize";
import {
    TListFilters,
} from "../../../types";
import {
    TQuestionList,
    TPayloadQuestion,
    IQuestion,
} from "../../../interfaces";
import { questionModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IController';

export class QuestionRepo implements IBaseRepo<IQuestion, TListFilters> {
    constructor() { }

    public async get(id: number): Promise<IQuestion | null> {
        const data = await questionModel.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TListFilters): Promise<TQuestionList> {
        const total = await questionModel.count({
            where: {
                question: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await questionModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                question: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async create(data: TPayloadQuestion): Promise<IQuestion> {
        const response = await questionModel.create(data);
        return response;
    }

    public async update(id: number, data: TPayloadQuestion): Promise<[affectedCount: number]> {
        return await questionModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await questionModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
