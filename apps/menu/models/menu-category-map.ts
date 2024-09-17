const { Op } = require("sequelize");
import {
    TMenuCategoryRelation,
    TMenuFilters,
    TPayloadMenuCategoryRelation,
} from "../../../types/menu";
import { MenuCategoryMapModel } from "../../../database/schema";

import IBaseRepo from '../controllers/controller/IMenuCategoryMapController';

export class MenuCategoryMapRepo implements IBaseRepo<TMenuCategoryRelation, TMenuFilters> {
    constructor() { }

    public async assign(data: TPayloadMenuCategoryRelation): Promise<TMenuCategoryRelation> {
        const response = await MenuCategoryMapModel.create(data);
        return response;
    }

    public async get(menuId: number, categoryId: number): Promise<TMenuCategoryRelation | null> {
        const response = await MenuCategoryMapModel.findOne({
            where: {
                menuId: menuId,
                categoryId: categoryId,
            },
        });
        return response;
    }

    public async unassign(menuId: number, categoryId: number): Promise<number> {
        const response = await MenuCategoryMapModel.destroy({
            where: {
                menuId: menuId,
                categoryId: categoryId,
            },
        });
        return response;
    }
}
