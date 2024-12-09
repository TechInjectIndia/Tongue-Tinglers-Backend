import { ICommissionRepo } from "../../commission/repositories/ICommissionRepo";
import { PostgresCommissionRepo } from "../../commission/repositories/PostgresCommissionRepo";

export class RepoProvider {

    /* fields */
    static _commissionRepo: ICommissionRepo;


    /* properties */
    static get commissionRepo(): ICommissionRepo {
        if (!this._commissionRepo) {
            this._commissionRepo = new PostgresCommissionRepo();
        }
        return this._commissionRepo;
    }
}