import ProductsController, {IProductsController} from "./products";

export class Controllers {

    private static _productsController: IProductsController;

    static get productsController(): IProductsController {
        if (!this._productsController) {
            this._productsController = new ProductsController();
        }
        return this._productsController;
    }
}
