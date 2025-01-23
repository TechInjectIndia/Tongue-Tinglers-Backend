import {
    BaseProduct,
    CHANGE_STATUS,
    IProductTable,
    ParsedProduct
} from "apps/product/interface/Product";
import {Pagination} from "../../common/models/common";


export interface IProductRepo {
    create(product: BaseProduct, createdBy:number): Promise<IProductTable | null>;

    update(product: IProductTable): Promise<IProductTable>;

    delete(id: number): Promise<IProductTable>;

    getById(id: number): Promise<ParsedProduct | null> ;

    getAll(page: number, limit: number, search: string, filters: object): Promise<Pagination<ParsedProduct>>;

    changeStatus(payload: CHANGE_STATUS): Promise<IProductTable>;

    getAllProductBySamplekit(page: number,limit: number): Promise<Pagination<ParsedProduct>>

    getAllProductIncludeSampleKit(page: number, limit: number): Promise<Pagination<ParsedProduct>>
}