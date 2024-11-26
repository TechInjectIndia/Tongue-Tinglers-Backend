import { ICommissionController } from "../../commission/controllers/ICommissionController";
import { PostgresCommisionController } from "../../commission/controllers/PostgresCommissionController";

export class ControllerProvider {

    /* fields */
    static _commissionController: ICommissionController;


    /* properties */
    static get commissionController(): ICommissionController {
        if (!this._commissionController) {
            this._commissionController = new PostgresCommisionController();
        }
        return this._commissionController;
    }
}