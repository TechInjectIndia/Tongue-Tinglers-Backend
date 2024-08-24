import {Op} from "sequelize";
import {
    TListFilters,
    TFranchisee,
    TAddFranchisee,
    TEditFranchisee,
    TEditFranchiseeProfile,
} from "../../../types";
import { Admin as AdminModel, Roles, Permissions, Franchisee } from "../../../database/schema";

export class Admin {
    constructor() { }

    public async getDeletedFranchisees(filters: TListFilters): Promise<any | null> {
        const total = await Franchisee.count({
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
                deletedAt: { [Op.not]: null },
            },
            paranoid: false,
        });
        const data = await Franchisee.findAll({
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
                deletedAt: { [Op.not]: null },
            },
            paranoid: false,
        });
        return { total, data };
    }

    public async getFranchisees(filters: TListFilters): Promise<any | null> {
        const total = await Franchisee.count({
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await Franchisee.findAll({
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
            },
        });
        return { total, data };
    }

    public async addFranchisee(data: TAddFranchisee): Promise<TFranchisee | any> {
        return await Franchisee.create(data);
    }

    public async editFranchisee(
        id: number,
        data: TEditFranchisee
    ): Promise<TFranchisee | any> {
        return await Franchisee.update(data, {
            where: {
                id,
            },
        });
    }

    public async getFranchiseeByEmail(email: string): Promise<TFranchisee | any> {
        const data = await Franchisee.findOne({
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
            },
        });
        return data;
    }

    public async getFranchiseeById(id: number): Promise<TFranchisee | any> {
        const data = await Franchisee.findOne({
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
            },
        });
        return data;
    }

    public async deleteFranchisee(ids: number[]): Promise<TFranchisee | any> {
        const response = await Franchisee.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
