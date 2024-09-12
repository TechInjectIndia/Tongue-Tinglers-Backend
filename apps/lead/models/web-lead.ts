const { Op } = require("sequelize");
import {
    TLead,
    TLeadPayload,
} from "../../../types/lead";
import { LeadsModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IWebLeadController';

export class LeadRepo implements IBaseRepo<TLead> {
    constructor() { }

    public async getLeadByAttr(whereName: any, whereVal: any, getAttributes: any = '[*]'): Promise<TLead> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await LeadsModel.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

    public async create(data: TLeadPayload): Promise<TLead> {
        const response = await LeadsModel.create(data);
        return response;
    }
}
