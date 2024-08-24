import ProductsController, {IBaseController} from "./products";
import {TProduct} from "../../../types/ecommerce";

export class Controllers {

    private static _productsController: IBaseController<TProduct>;

    static get productsController(): IBaseController<TProduct> {
        if (!this._productsController) {
            this._productsController = new ProductsController();
        }
        return this._productsController;
    }
}
