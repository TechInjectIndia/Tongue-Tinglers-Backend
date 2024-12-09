import { BaseProduct, CHANGE_STATUS, Pagination, Product, PRODUCTS_TYPE} from '../../../interfaces/products';

export interface IProductRepo {
    create(product: BaseProduct): Promise<Product | null>;

    update(product: Product): Promise<Product>;

    delete(id: number): Promise<Product>;

    getById(id: number): Promise<Product>;

    getAll(page: number, limit: number, search: string, filters: object): Promise<Pagination<Product>>;

    changeStatus(payload: CHANGE_STATUS): Promise<Product>;
}