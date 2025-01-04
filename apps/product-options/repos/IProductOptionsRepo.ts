import {
    BaseProductOptions,
    ParsedProductOptions, ProductOptions
} from 'apps/product/interface/ProductOptions';
import {Pagination} from "../../common/models/common";


export interface IProductOptionsRepo {
    create(productOptions: BaseProductOptions, createdBy:number): Promise<ProductOptions | null>;

    update(productOptions: ProductOptions): Promise<ProductOptions>;

    delete(id: number): Promise<ProductOptions>;

    getById(id: number): Promise<ParsedProductOptions>;

    getAll(page: number, limit: number, search: string, filters: object): Promise<Pagination<ProductOptions>>;

    updatePrice(payload): Promise<ProductOptions>;

    updateStock(payload): Promise<ProductOptions>;

    updateStatus(payload): Promise<ProductOptions>;

    getByProductId(id: number): Promise<ProductOptions[]>
}
