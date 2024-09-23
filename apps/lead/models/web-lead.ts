const { Op } = require("sequelize");
import {
    TLeadPayload,
} from "../../../types/lead";
import {
    ILead,
} from "../../../interfaces";
import { LeadsModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IWebLeadController';

export class LeadRepo implements IBaseRepo<ILead> {
    constructor() { }

    public async getLeadByAttr(whereName: any, whereVal: any, getAttributes: any = '[*]'): Promise<ILead> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await LeadsModel.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

    public async create(data: TLeadPayload): Promise<ILead> {
        const response = await LeadsModel.create(data);
        return response;
    }
}
