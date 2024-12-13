import { Pagination } from "../../../interfaces/products";

export interface ITransactionRepo {
    getAll(
        page: number,
        limit: number,
        search: string,
        filters: object,
    ): Promise<Pagination<any>>;


}
