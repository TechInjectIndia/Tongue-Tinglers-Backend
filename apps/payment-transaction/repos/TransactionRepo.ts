import { Op } from "sequelize";

import { ITransactionRepo } from "./ITransactionRepo";
import {
    TransactionModel,
} from "../../../database/schema/payment-transaction/PaymentTransactionModel";
import {TransactionFilter} from "../interface/transaction"
import {Pagination} from "../../common/models/common";
class TransactionRepo implements ITransactionRepo {
    async getAll(
        page: number,
        limit: number,
        search: string,
        filters: TransactionFilter,
    ): Promise<Pagination<any>> {
        try {
            const offset = (page - 1) * limit;

            const query: any = {};

            // Add search functionality
            if (search) {
                query[Op.or] = [
                    { name: { [Op.iLike]: `%${search}%` } },
                    { description: { [Op.iLike]: `%${search}%` } },
                ];
            }

            // Add entity_type filter
            if (filters.entity) {
                query.entity = filters.entity;
            }

            // Add status filter
            if (filters.status) {
                query.status = filters.status;
            }

            // Add minAmount and maxAmount filters
            if (filters.minAmount || filters.maxAmount) {
                query.amount = {};
                if (filters.minAmount) {
                    query.amount[Op.gte] = filters.minAmount; // Greater than or equal to minAmount
                }
                if (filters.maxAmount) {
                    query.amount[Op.lte] = filters.maxAmount; // Less than or equal to maxAmount
                }
            }

            const { rows: products, count: total } =
                await TransactionModel.findAndCountAll({
                    where: query,
                    offset,
                    limit,
                }).then((res) => {
                    return {
                        rows: res.rows.map((product) => product.toJSON()),
                        count: res.count,
                    };
                });

            const totalPages = Math.ceil(total / limit);

            return { data: products, total, totalPages };
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export { TransactionRepo };
