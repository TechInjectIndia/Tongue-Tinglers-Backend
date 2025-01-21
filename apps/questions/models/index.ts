import { Op } from "sequelize";
import {
    TListFilters,
} from "../../../types";
import { IQuestion, TPayloadQuestion, TQuestionList } from "../interface/Question";
import { QuestionModel } from "./QuestionModel";
import { UserModel } from "apps/user/models/UserTable";
import { getUserName } from "apps/common/utils/commonUtils";
import { LogModel } from "apps/logs/models/LogsTable";


export class QuestionRepo {
    constructor() { }

    public async get(id: number): Promise<IQuestion | null> {
        const data = await QuestionModel.findOne({
            where: {
                id,
            },
            include:[
                {
                    model: LogModel,
                    as: 'logs',
                    where:{model: 'Questions'}
                }
            ]
        });
        return data;
    }

    public async list(filters: TListFilters): Promise<TQuestionList> {
        const total = await QuestionModel.count({
            where: {
                question: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });
        const data = await QuestionModel.findAll({
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
        const response = await QuestionModel.create(data, {
            userId: user.id,
            userName: getUserName(user),
        });
        return response;
    }

    public async update(id: number, data: TPayloadQuestion, userId: number): Promise<[affectedCount: number]> {
        const question = await QuestionModel.findByPk(id);
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
        const response = await QuestionModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
