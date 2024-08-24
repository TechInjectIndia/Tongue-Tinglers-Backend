import {Op} from "sequelize";
import {
    TTag,
    TTagFilters,
    TTagsList,
    TAddTag,
} from "../../../types/ecommerce";
import { Tag } from "../../../database/schema";

export class TagModel {
    constructor() { }

    public async getTagByName(name: string): Promise<TTag | any> {
        const data = await Tag.findOne({
            where: {
                name,
            },
        });
        return data;
    }

    public async getTagById(id: number): Promise<TTag | any> {
        const data = await Tag.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TTagFilters): Promise<TTagsList | any> {
        const total = await Tag.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await Tag.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async create(data: TAddTag): Promise<TTag | any> {
        const response = await Tag.create(data);
        return response;
    }

    public async update(id: number, data: TAddTag): Promise<TTag | any> {
        const response = await Tag.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<TTag | any> {
        const response = await Tag.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
