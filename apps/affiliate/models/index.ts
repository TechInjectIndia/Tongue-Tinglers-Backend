import {Op} from "sequelize";

import {
    Affiliate,
    AffiliatesList,
    TPayloadAffiliate,
} from "../../../interfaces";
import {
    TListFilters,
} from "../../../types";
import { AffiliateModel, UserModel } from "../../../database/schema";
import { SocialMediaDetailsModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IController';

export class AffiliateRepo implements IBaseRepo<Affiliate, TListFilters> {
    constructor() { }

    public async get(id: number): Promise<Affiliate | null> {
        const data = await AffiliateModel.findOne({
            where: {
                id,
            },
            include: [
                {model: UserModel, as: "user", attributes: ['id', 'firstName', 'lastName', 'email']},
                { model: SocialMediaDetailsModel, as: 'sm' },
            ]
        });
        return data;
    }

    public async list(filters: TListFilters): Promise<AffiliatesList> {
        const whereCondition: any = {}; // Initialize where condition

        // Apply search filter
        if (filters.search) {
            whereCondition[Op.or] = [
                { type: { [Op.iLike]: `%${filters.search}%` } }, // Search by type
                { codes: { [Op.iLike]: `%${filters.search}%` } }, // Search by codes (if serialized as a string)
            ];
        }
        
        const total = await AffiliateModel.count({
            where: whereCondition,
           
        });
        const data = await AffiliateModel.findAll({
            where: whereCondition,
            include: [
                {model: UserModel, as: "user", attributes: ['id', 'firstName', 'lastName', 'email']},
                { model: SocialMediaDetailsModel, as: 'sm' },
            ]
        });
        return { total, data };
    }

    public async create(data: TPayloadAffiliate): Promise<Affiliate> {
        const response = await AffiliateModel.create(data);
        return response.dataValues;
    }

    public async update(id: number, data: TPayloadAffiliate): Promise<[affectedCount: number]> {
        return await AffiliateModel.update(data, {
            where: {
                id: id,
            },
        });
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await AffiliateModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }

    public async getAffiliateByUserId(userId: number): Promise<Affiliate[] | null> {
        const data = await AffiliateModel.findAll({
            where: {
                userId,
            },
            include: [
                {model: UserModel, as: "user", attributes: ['id', 'firstName', 'lastName', 'email']},
                { model: SocialMediaDetailsModel, as: 'sm' },
            ]
        });
        return data;
    }
}
