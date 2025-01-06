import {Op} from "sequelize";

import IBaseRepo from '../controllers/controller/IController';
import {Affiliate, ParsedAffiliate} from "../interface/affiliate";
import { TListFilters } from "apps/common/models/common";
import { AffiliateModel } from "./affiliateModel";
import { UserModel } from "apps/user/models/UserTable";
import { SocialMediaDetailsModel } from "apps/lead/models/smDetailsTable";

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

    public async list(filters: TListFilters): Promise<any> {
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

    public async create(data: Affiliate): Promise<Affiliate> {
        const response = await AffiliateModel.create(data);
        return response.dataValues;
    }

    public async update(id: number, data: Affiliate): Promise<[affectedCount: number]> {
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
