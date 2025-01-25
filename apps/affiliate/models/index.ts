import { Op } from "sequelize";

import { ParsedAffiliate, AffiliatePayload } from "../interface/Affiliate";
import { TListFilters } from "apps/common/models/common";
import { AffiliateModel } from "./affiliateModel";
import { UserModel } from "apps/user/models/UserTable";
import { SocialMediaDetailsModel } from "apps/lead/models/smDetailsTable";
import { OrganizationModel } from "apps/organization/models/OrganizationTable";
import { ParseAffiliate } from "../parser/affilateParser";

export class AffiliateRepo {
    constructor() { }

    public async get(id: number): Promise<ParsedAffiliate | null> {
        const data = await AffiliateModel.findOne({
            where: {
                id,
            },
            include: [
                { model: UserModel, as: "user", attributes: ['id', 'firstName', 'lastName', 'email'] },
                { model: SocialMediaDetailsModel, as: 'sm' },
                { model: OrganizationModel, as: 'organisation'}
            ]
        });
        return ParseAffiliate(data)
    }

    public async list(filters: TListFilters): Promise<ParsedAffiliate[]> {
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
                { model: UserModel, as: "user", attributes: ['id', 'firstName', 'lastName', 'email'] },
                { model: SocialMediaDetailsModel, as: 'sm' },
                { model: OrganizationModel, as: 'organisation', attributes: ['id'] }
            ]
        });
        return data.map((data) => ParseAffiliate(data))
    }

    public async create(data: AffiliatePayload): Promise<AffiliatePayload> {
        const response = await AffiliateModel.create(data);
        return response.dataValues;
    }

    public async update(id: number, data: AffiliatePayload): Promise<[affectedCount: number]> {
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

    public async getAffiliateByUserId(userId: number): Promise<AffiliatePayload[] | null> {
        const data = await AffiliateModel.findAll({
            where: {
                userId,
            },
            include: [
                { model: UserModel, as: "user", attributes: ['id', 'firstName', 'lastName', 'email'] },
                { model: SocialMediaDetailsModel, as: 'sm' },
                { model: OrganizationModel, as: 'organisation'}
            ]
        });
        return data;
    }
}
