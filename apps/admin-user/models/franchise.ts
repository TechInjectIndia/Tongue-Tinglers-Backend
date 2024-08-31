const { Op } = require("sequelize");
import {
    TListFilters,
    TFranchisee,
    TAddFranchisee,
    TEditFranchisee,
} from "../../../types";
import { User as UserModel } from "../../../database/schema";

export class Admin {
    constructor() { }
    
    public async getDeletedFranchisees(filters: TListFilters): Promise<any | null> {
        const total = await UserModel.count({
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
                user_type: 'Franchise',
                deletedAt: { [Op.not]: null },
            },
            paranoid: false,
        });
        const data = await UserModel.findAll({
            attributes: [
                "id",
                "email",
                "full_name",
                "contact_number",
                "phone_code",
                "address",
                "last_login_at",
                "last_login_ip",
                "createdAt",
                "active",
            ],
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
                user_type: 'Franchise',
                deletedAt: { [Op.not]: null },
            },
            paranoid: false,
        });
        return { total, data };
    }

    public async getFranchisees(filters: TListFilters): Promise<any | null> {
        const total = await UserModel.count({
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
                user_type: 'Franchise'
            },
        });
        const data = await UserModel.findAll({
            attributes: [
                "id",
                "email",
                "full_name",
                "contact_number",
                "phone_code",
                "address",
                "last_login_at",
                "last_login_ip",
                "createdAt",
                "active",
            ],
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
                user_type: 'Franchise'
            },
        });
        return { total, data };
    }

    public async addFranchisee(data: TAddFranchisee): Promise<TFranchisee | any> {
        return await UserModel.create({...data, user_type: 'Franchise'});
    }

    public async editFranchisee(
        id: number,
        data: TEditFranchisee
    ): Promise<TFranchisee | any> {
        return await UserModel.update(data, {
            where: {
                id,
            },
        });
    }
    
    public async getFranchiseeByEmail(email: string): Promise<TFranchisee | any> {
        const data = await UserModel.findOne({
            attributes: [
                "id",
                "email",
                "full_name",
                "contact_number",
                "phone_code",
                "address",
                "last_login_at",
                "last_login_ip",
                "createdAt",
                "active",
            ],
            where: {
                email,
                user_type: 'Franchise'
            },
        });
        return data;
    }

    public async getFranchiseeById(id: number): Promise<TFranchisee | any> {
        const data = await UserModel.findOne({
            attributes: [
                "id",
                "email",
                "full_name",
                "contact_number",
                "phone_code",
                "address",
                "last_login_at",
                "last_login_ip",
                "createdAt",
                "active",
            ],
            where: {
                id,
                user_type: 'Franchise'
            },
        });
        return data;
    }

    public async deleteFranchisee(ids: number[]): Promise<TFranchisee | any> {
        const response = await UserModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
