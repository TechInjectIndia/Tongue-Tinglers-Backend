const { Op } = require("sequelize");
import {
    ExtraFields,
    TPayloadFranchiseModel,
} from "../../../interfaces";
import {
    TListFilters,
} from "../../../types";
import { ExtraFieldsModel } from "../../../database/schema"; // Ensure this points to the correct model
import IExtraFieldController from '../controllers/controller/IExtraFieldController';

export class ExtraFieldRepo implements IExtraFieldController<ExtraFields, TListFilters> {
    constructor() { }

    public async get(id: number): Promise<ExtraFields | null> {
        return await ExtraFieldsModel.findOne({
            where: { id },
        });
    }

    public async create(data: TPayloadFranchiseModel): Promise<ExtraFields> {
        return await ExtraFieldsModel.create(data);
    }

    public async deleteByFranchiseModelId(franchiseModelId: number): Promise<number> {
        return await ExtraFieldsModel.destroy({
            where: { franchiseModelId },
        });
    }
}
