const { Op } = require("sequelize");
import {
    TPayments,
    TPaymentsFilters,
    TPaymentssList,
    TAddPayments,
} from "../../../types/payments";
import { Payments } from "../../../database/schema";

export class PaymentsModel {
    constructor() { }

    public async getPaymentsByAttr(whereName: any, whereVal: any, getAttributes: any = '*'): Promise<TPayments | any> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await Payments.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

    public async list(filters: TPaymentsFilters): Promise<TPaymentssList | any> {
        const total = await Payments.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await Payments.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async add(data: TAddPayments): Promise<TPayments | any> {
        const response = await Payments.create(data);
        return response;
    }

    public async update(id: number, data: TAddPayments): Promise<TPayments | any> {
        const response = await Payments.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<TPayments | any> {
        const response = await Payments.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
