import {
    FranchiseModels,
    FranchiseModelsList, TPayloadFranchiseModel
} from "../interface/franchiseModel";

const { Op } = require("sequelize");

import { TListFilters } from "../../../types";

import { getUserName } from "../../common/utils/commonUtils";
import sequelize from "sequelize";
import { FranchiseLeadModel } from "./FranchiseModelTable";
import { UserModel } from "apps/user/models/UserTable";
import { LogModel } from "apps/logs/models/LogsTable";


export class FranchiseModelRepo {
    constructor() {}

    public async get(id: number): Promise<FranchiseModels | null> {
        const data = await FranchiseLeadModel.findOne({
            where: {
                id,
            },
            include:[
                {
                    model: LogModel,
                    as: 'logs',
                    where:{ model: 'Franchise Model'}
                }
            ]
        });
        return data;
    }

    public async list(filters: TListFilters): Promise<FranchiseModelsList> {
        const total = await FranchiseLeadModel.count({
            where: {
                title: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await FranchiseLeadModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                title: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async create(
        data: TPayloadFranchiseModel,
        userId: number
    ): Promise<FranchiseModels> {
        // Fetch user data from UserModel
        const user = await UserModel.findByPk(userId);

        if (!user) {
            throw new Error(`User with ID ${userId} not found.`);
        }

        // Use user data (e.g., userName) when creating the record
        const response = await FranchiseLeadModel.create(data, {
            userId: user.id,
            userName: getUserName(user),
        });

        return response;
    }

    public async update(id: number, data: TPayloadFranchiseModel, userId: number): Promise<[affectedCount: number]> {
        const franchiseLead = await FranchiseLeadModel.findByPk(id);
        const user = await UserModel.findByPk(userId);
        if (!franchiseLead) {
            throw new Error("Franchise Lead not found");
        }
        if (!user) {
            throw new Error(`User with ID ${userId} not found.`);
        }
        franchiseLead.set(data);
        await franchiseLead.save({
            userId: user.id,
            userName: user.firstName,
        });
        // Return affected count
        return [1];
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await FranchiseLeadModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
