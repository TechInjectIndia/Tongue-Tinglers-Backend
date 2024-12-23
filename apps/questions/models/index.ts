import { Op } from "sequelize";
import {
    TListFilters,
} from "../../../types";
import {
    TQuestionList,
    TPayloadQuestion,
    IQuestion,
} from "../../../interfaces";
import { questionModel, UserModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IController';
import { getUserName } from "../../common/utils/commonUtils";

export class QuestionRepo {
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
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });
        const data = await questionModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                question: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async create(data: TPayloadQuestion, user_id: number): Promise<IQuestion> {
        const user = await UserModel.findByPk(user_id);
        if(!user){
            throw new Error(`User with ID ${user_id} not found.`);
        }
        const response = await questionModel.create(data, {
            userId: user.id,
            userName: getUserName(user),
        });
        return response;
    }

    public async update(id: number, data: TPayloadQuestion, userId: number): Promise<[affectedCount: number]> {
        const question = await questionModel.findByPk(id);
        if (!question) {
            throw new Error(`Question with ID ${id} not found.`);
        }
        const user = await UserModel.findByPk(userId);
        if(!user){
            throw new Error(`User with ID ${userId} not found.`);
        }
        question.set(data);
        question.save({
            userId: user.id,
            userName: getUserName(user),
        })
        return [1]
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
