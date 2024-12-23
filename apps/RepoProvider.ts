import { AgreementDocRepo } from './agreement-docs/repos/agreementDocRepo';
import { IAgreementDocRepo } from './agreement-docs/repos/IAgreementDocRepo';
import { DocumentRepo } from './documents/repos/documentRepo';
import { IDocumentRepo } from './documents/repos/IDocumentRepo';
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
import ISocialMediaDetailsRepo from "./affiliate/controllers/controller/ISocialMediaController";
import { SocialMediaDetailsRepo } from "./affiliate/models/smDetailsRepo";
import { IProductRepo } from "./product/repos/IProductRepo";
import { ProductRepo } from "./product/repos/productRepo";
import { IOptionsRepo } from "./options/repos/IOptionsRepo";
import { OptionsRepo } from "./options/repos/optionsRepo";
import { IOptionsValueRepo } from "./optionsValue/repos/IOptionsValueRepo";
import { OptionsValueRepo } from "./optionsValue/repos/optionsValueRepo";
import { IProductOptionsRepo } from "./product-options/repos/IProductOptionsRepo";
import { ProductOptionRepo } from "./product-options/repos/productOptionsRepo";
import { ICartProductRepo } from "./cart-products/repos/ICartProductRepo";
import { CartProductRepo } from "./cart-products/repos/cartProductRepo";
import { ICartDetailRepo } from "./cart-details/repos/ICartDetailRepo";
import { CartDetailRepo } from "./cart-details/repos/cartDetailRepo";
import { IOrderItemRepo } from "./order-items/repos/IOrderItemRepo";
import { OrderItemRepo } from "./order-items/repos/orderItemRepo";
import { IProductsCategoryRepo } from "./products-category/repos/IProductsCategoryRepo";
import { ProductsCategoryRepo } from "./products-category/repos/productsCategoryRepo";
import { RazorpayRepo } from "./razorpay/Repos/RazorapayRepo";
import { IRazorpayRepo } from "./razorpay/Repos/IRazorpayRepo";
import { IOrderRepo } from "./order/repos/IOrderRepo";
import { OrderRepo } from "./order/repos/orderRepo";
import { ILogsRepo } from "./logs/repos/ILogsRepo";
import { LogsRepo } from "./logs/repos/LogsRepo";
import { ICommissionRepo } from "./commission/repositories/ICommissionRepo";
import { PostgresCommissionRepo } from "./commission/repositories/PostgresCommissionRepo";

export default class RepoProvider {
  private static _franchiseRepo: IFranchiseRepo;
  private static _addressRepo: IAddress<BaseAddress, Address, TListFilters>;
  private static _regionRepo: IRegionRepo<IRegion, TListFiltersRegions>;
  private static _smRepo: ISocialMediaDetailsRepo<SocialMediaDetails>;
  private static _productRepo: IProductRepo;
  private static _optionsRepo: IOptionsRepo;
  private static _optionsValueRepo: IOptionsValueRepo;
  private static _productOptionsRepo: IProductOptionsRepo;
  private static _cartProductRepo: ICartProductRepo;
  private static _cartDetailRepo: ICartDetailRepo;
  private static _orderItemRepo: IOrderItemRepo;
  private static _productsCategoryRepo: IProductsCategoryRepo;
  private static _razorpayRepo: IRazorpayRepo;
  private static _orderRepo: IOrderRepo;
  private static _logsRepo: ILogsRepo;
  static _commissionRepo: ICommissionRepo;
  private static _documentRepo: IDocumentRepo;
  private static _agreementDocRepo: IAgreementDocRepo

  /* properties */
  static get commissionRepo(): ICommissionRepo {
    if (!this._commissionRepo) {
      this._commissionRepo = new PostgresCommissionRepo();
    }
    return this._commissionRepo;
  }

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

  static get optionsRepo() {
    if (!this._optionsRepo) {
      this._optionsRepo = new OptionsRepo();
    }
    return this._optionsRepo;
  }

  static get optionsValueRepo() {
    if (!this._optionsValueRepo) {
      this._optionsValueRepo = new OptionsValueRepo();
    }
    return this._optionsValueRepo;
  }

  static get productOptionsRepo() {
    if (!this._productOptionsRepo) {
      this._productOptionsRepo = new ProductOptionRepo();
    }
    return this._productOptionsRepo;
  }

  static get cartProductRepo() {
    if (!this._cartProductRepo) {
      this._cartProductRepo = new CartProductRepo();
    }
    return this._cartProductRepo;
  }

  static get cartDetailRepo() {
    if (!this._cartDetailRepo) {
      this._cartDetailRepo = new CartDetailRepo();
    }
    return this._cartDetailRepo;
  }

  static get orderItemRepo() {
    if (!this._orderItemRepo) {
      this._orderItemRepo = new OrderItemRepo();
    }
    return this._orderItemRepo;
  }

  static get productsCategoryRepo() {
    if (!this._productsCategoryRepo) {
      this._productsCategoryRepo = new ProductsCategoryRepo();
    }
    return this._productsCategoryRepo;
  }

  static get razorpayRepo() {
    if (!this._razorpayRepo) {
      this._razorpayRepo = new RazorpayRepo();
    }
    return this._razorpayRepo;
  }

  static get orderRepo() {
    if (!this._orderRepo) {
      this._orderRepo = new OrderRepo();
    }
    return this._orderRepo;
  }

  static get LogRepo() {
    if (!this._logsRepo) {
      this._logsRepo = new LogsRepo();
    }
    return this._logsRepo;
  }

  static get documentRepo() {
    if (!this._documentRepo) {
      this._documentRepo = new DocumentRepo();
    }
    return this._documentRepo;
  }

  static get agreementDocRepo() {
    if (!this._agreementDocRepo) {
      this._agreementDocRepo = new AgreementDocRepo();
    }
    return this._agreementDocRepo;
  }
}
