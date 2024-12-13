const { Op } = require("sequelize");
import {
    SeoImage,
    TPayloadFranchiseModel,
} from "../../../interfaces";
import {
    TListFilters,
} from "../../../types";
import { SeoImageModel } from "../../../database/schema";
import IImageController from '../controllers/controller/IImageController';

export class ImageRepo implements IImageController<SeoImage, TListFilters> {
    constructor() { }

    public async get(id: number): Promise<SeoImage | null> {
        return await SeoImageModel.findOne({
            where: { id },
        });
    }

    public async create(data: TPayloadFranchiseModel): Promise<SeoImage> {
        return await SeoImageModel.create(data);
    }

    public async update(id: number, data: SeoImage): Promise<[number, SeoImage[]]> {
        return await SeoImageModel.update(data, {
            where: { id },
            returning: true, // Optional: returns the updated rows
        });
    }

    public async deleteByFranchiseModelId(franchiseModelId: number): Promise<number> {
        return await SeoImageModel.destroy({
            where: { franchiseModelId },
        });
    }
}
