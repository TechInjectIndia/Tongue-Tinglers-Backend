import {Pagination} from "../../common/models/common";


export interface ITransactionRepo {
    getAll(
        page: number,
        limit: number,
        search: string,
        filters: object,
    ): Promise<Pagination<any>>;


}
