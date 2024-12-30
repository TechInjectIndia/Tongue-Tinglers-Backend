const { Op } = require("sequelize");
import { ExtraFields } from 'apps/lead/interface/lead';
 // Ensure this points to the correct model
import IExtraFieldController from '../controllers/controller/IExtraFieldController';
import { TListFilters } from 'apps/common/models/common';
import { ExtraFieldsModel } from 'apps/lead/models/ExtraFieldTable';
import { TPayloadFranchiseModel } from '../interface/franchiseModel';

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
