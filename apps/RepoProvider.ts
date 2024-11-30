import { FranchiseRepo } from "./franchise/Repos/FranchiseRepo";
import { IFranchiseRepo } from "./franchise/Repos/IFranchiseRepo";

export default class RepoProvider {
    private static _franchiseRepo: IFranchiseRepo;


    static get franchise() {
        if (!this._franchiseRepo) {
            this._franchiseRepo = new FranchiseRepo();
        }
        return this._franchiseRepo;
    }


}
