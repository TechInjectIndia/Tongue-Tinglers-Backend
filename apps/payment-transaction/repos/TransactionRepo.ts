import { Op } from "sequelize";
import { Pagination } from "../../../interfaces";
import { ITransactionRepo } from "./ITransactionRepo";
import {
    TransactionModel,
} from "../../../database/schema/payment-transaction/PaymentTransactionModel";

class TransactionRepo implements ITransactionRepo {
    async getAll(
        page: number,
        limit: number,
        search: string,
        filters: object,
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

            // Add filters
            if (filters) {
                Object.assign(query, filters);
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
