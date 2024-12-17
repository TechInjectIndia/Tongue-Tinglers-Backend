import { ProductModel } from '../../../database/schema/product/productModel';
import { BaseProduct, CHANGE_STATUS, Pagination, ParsedProduct, Product, PRODUCTS_TYPE} from '../../../interfaces/products';

export interface IProductRepo {
    create(product: BaseProduct): Promise<Product | null>;

    update(product: Product): Promise<Product>;

    delete(id: number): Promise<Product>;

    getById(id: number): Promise<ParsedProduct>;

    getAll(page: number, limit: number, search: string, filters: object): Promise<Pagination<ParsedProduct>>;

    changeStatus(payload: CHANGE_STATUS): Promise<Product>;
}