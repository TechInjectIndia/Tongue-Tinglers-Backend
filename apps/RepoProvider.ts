import { FranchiseRepo } from "./franchise/Repos/FranchiseRepo";
import { IFranchiseRepo } from "./franchise/Repos/IFranchiseRepo";
import {
    Address,
    BaseAddress,
    TListFilters,
    TListFiltersRegions,
} from "../types";
import IAddress from "./address/controllers/IAddressController";
import { AddressRepo } from "./address/models/AddressRepo";
import IRegionRepo from "./region/controllers/controller/IRegionController";
import { IRegion, SocialMediaDetails } from "../interfaces";
import { RegionRepo } from "./region/models/RegionRepo";
import ISocialMediaDetailsRepo
    from "./affiliate/controllers/controller/ISocialMediaController";
import { SocialMediaDetailsRepo } from "./affiliate/models/smDetailsRepo";
import { IProductRepo } from "./product/repos/IProductRepo";
import { ProductRepo } from "./product/repos/productRepo";

export default class RepoProvider {
    private static _franchiseRepo: IFranchiseRepo;
    private static _addressRepo: IAddress<BaseAddress, Address, TListFilters>;
    private static _regionRepo: IRegionRepo<IRegion, TListFiltersRegions>;
    private static _smRepo: ISocialMediaDetailsRepo<SocialMediaDetails>;
    private static _productRepo: IProductRepo;

    static get franchise() {
        if (!this._franchiseRepo) {
            this._franchiseRepo = new FranchiseRepo();
        }
        return this._franchiseRepo;
    }

    static get address() {
        if (!this._addressRepo) {
            this._addressRepo = new AddressRepo();
        }
        return this._addressRepo;
    }

    static get region() {
        if (!this._regionRepo) {
            this._regionRepo = new RegionRepo();
        }
        return this._regionRepo;
    }

    static get smRepo() {
        if (!this._smRepo) {
            this._smRepo = new SocialMediaDetailsRepo();
        }
        return this._smRepo;
    }

    static get ProductRepo() {
        if (!this._productRepo) {
            this._productRepo = new ProductRepo();
        }
        return this._productRepo;
    }


}
