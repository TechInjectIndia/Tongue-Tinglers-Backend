const { Op } = require("sequelize");

import { CampaignModel } from "../../../database/schema";
import { EmailModel } from "../../../database/schema";
import { SubscriberModel } from "../../../database/schema";
import { TQueryFilters } from "../../../types";
import { TCampaign, TCampaignsList, TAddCampaign, TEditCampaign } from "../../../types/crm/crm";
import IBaseRepo from '../controllers/controller/ICampaignController';

export class CampaignRepo implements IBaseRepo<TCampaign, TQueryFilters> {
    constructor() { }

    public async getAllSubscribersByCampaignId(campaignId: number): Promise<TCampaign[] | null> {
        const data = await CampaignModel.findAll({
            where: {
                id: campaignId,
            },
            include: [{
                model: EmailModel,
                attributes: ['subscriberId', 'status', 'sentAt'],
                include: [{
                    model: SubscriberModel,
                    attributes: ['name', 'email'],
                }]

            }]
        });
        return data;
    }

    public async get(id: number): Promise<TCampaign | null> {
        const data = await CampaignModel.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TQueryFilters): Promise<TCampaignsList> {
        const total = await CampaignModel.count({
            where: {
                name: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });
        const data = await CampaignModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                name: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async create(data: TAddCampaign): Promise<TCampaign> {
        const response = await CampaignModel.create(data);
        return response;
    }

    public async update(id: number, data: TEditCampaign): Promise<[affectedCount: number]> {
        const response = await CampaignModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await CampaignModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
