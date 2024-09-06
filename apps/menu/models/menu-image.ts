const { Op } = require("sequelize");
import {
    TMenuImage,
    TAddMenuImage,
    TMenuImageFilters,
    TMenuImagesList,
    TEditMenuImage,
} from "../../../types/menu";
import { MenuImageModel } from "../../../database/schema";

import IBaseRepo from '../controllers/controller/IMenuImagesController';

export class MenuImageRepo implements IBaseRepo<TMenuImage, TMenuImageFilters> {
    constructor() { }

    public async get(id: number): Promise<TMenuImage | null> {
        const data = await MenuImageModel.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TMenuImageFilters): Promise<TMenuImagesList> {
        const total = await MenuImageModel.count({
            where: {
                fileName: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await MenuImageModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                fileName: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async create(data: TAddMenuImage): Promise<TMenuImage> {
        const response = await MenuImageModel.create(data);
        return response;
    }

    public async update(id: number, data: TEditMenuImage): Promise<[affectedCount: number]> {
        const response = await MenuImageModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await MenuImageModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
