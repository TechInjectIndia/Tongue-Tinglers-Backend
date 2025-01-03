import { ParsedProductOptions } from 'apps/product/interface/ProductOptions';
import { BaseProductOptions, Pagination, ProductOptions, PRODUCT_OPTIONS_STATUS} from '../../../interfaces/product-options';

export interface IProductOptionsRepo {
    create(productOptions: BaseProductOptions): Promise<ProductOptions | null>;

    update(productOptions: ProductOptions): Promise<ProductOptions>;

    delete(id: number): Promise<ProductOptions>;

    getById(id: number): Promise<ParsedProductOptions>;

    getAll(page: number, limit: number, search: string, filters: object): Promise<Pagination<ProductOptions>>;

    updatePrice(payload): Promise<ProductOptions>;

    updateStock(payload): Promise<ProductOptions>;

    updateStatus(payload): Promise<ProductOptions>;

    getByProductId(id: number): Promise<ProductOptions[]>
}