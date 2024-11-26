import { ICommissionController } from "../../commission/controllers/ICommissionController";
import { PostgresCommissionController } from "../../commission/controllers/PostgresCommissionController";

export class ControllerProvider {

    /* fields */
    static _commissionController: ICommissionController;


    /* properties */
    static get commissionController(): ICommissionController {
        if (!this._commissionController) {
            this._commissionController = new PostgresCommissionController();
        }
        return this._commissionController;
    }
}