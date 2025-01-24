import { RegionModel } from "apps/region/models/RegionTable";
import { AgreementDocModel } from "apps/agreement-docs/model/agreementDocModel";

import { CampaignAdModel } from "apps/campaign/models/CampaignModel";
import { AddressModel } from "apps/address/models/AddressTable";
import { UserModel } from "apps/user/models/UserTable";
import { DocumentModel } from "apps/documents/models/DocumentTable";
import { FranchiseModel } from "apps/franchise/models/FranchiseTable";
import { LeadsModel } from "apps/lead/models/LeadTable";
import { ContractModel } from "apps/contracts/models/ContractTable";
import { IChecklistModel } from "apps/ichecklist/model/CheckListTable";
import { CampaignQuestionModel } from "apps/campaign/models/CampaignQuestionModel";
import { QuestionModel } from "apps/questions/models/QuestionModel";
import { ProposalModel } from "apps/proposal_model/models/ProposalModelTable";
import {
    CampaignProposalsModel
} from "apps/campaign/models/CampaignProposalsModel";
import {
    FranchiseLeadModel
} from "apps/franchise_model/models/FranchiseModelTable";
import { OptionsModel } from "apps/options/models/optionTable";
import { AreaModel } from "apps/area/models/AreaTable";
import { AssignModel } from "apps/lead/models/AssignTable";
import { CommissionTable } from "apps/commission/model/CommmisionTable";
import { AffiliateModel } from "apps/affiliate/models/affiliateModel";
import { PdiCheckpointModel } from "apps/pdi-checkpoint/model/PdiCheckPointTable";
import {
    ProductVariationsModel
} from "../product-options/models/ProductVariationTable";
import { FollowDetailsModel } from "apps/follow-details/model/followDetailModel";
import {
    CommissionEntityMappingModel
} from "../commission/model/CommissionEntityMappingTable";
import { CartDetailsModel } from "apps/cart-details/models/CartDetailTable";
import {
    ProductsCategoryModel
} from "apps/products-category/models/ProductCategoryTable";
import {ProductModel} from "apps/product/model/productTable";
import {OrderModel} from "apps/order/models/OrderTable";
import {NotesModel} from "apps/order/models/NotesTable";
import {OrderItemsModel} from "apps/order-items/models/OrderItemsTable";
import {CartProductModel} from "../cart-products/model/CartProductTable";
import {handleError} from "apps/common/utils/HelperMethods";
import {ItemStockModel} from "../pet-pooja/models/stock";
import {OrganizationModel} from "../organization/models/OrganizationTable";
import { PdiModel } from "apps/pdi/model/PdiTable";
import { FileModel } from "apps/files/models/FileTable";
import { PendingOrderModel } from "apps/pending-orders/models/PendingOrderTable";
import { RPOrderTable } from "apps/rp-order/models/RPOrderTable";

import { B2CUserAddressModel } from "apps/b2c-users-address/models/B2CUserAddressTable";
import {
    FactoryGateTable
} from "../inventory/factory_gates/database/FactoryGateTable";
import {
    StorageLocationTable
} from "../inventory/storage_locations/database/StorageLocationTable";
import {ItemUnitTable} from "../inventory/item_unit/database/ItemUnitTable";
import {
    ItemCategoryTable
} from "../inventory/item_category/database/ItemCategoryTable";
import {SupplierTable} from "../inventory/supplier/database/SupplierTable";
import {
    RawMaterialPriceTable
} from "../inventory/raw_material/database/RawMaterialPriceTable";
import {
    RawMaterialHoldTable
} from "../inventory/raw_material_stock/database/RawMaterialHoldTable";
import {
    RawMaterialRejectionTable
} from "../inventory/raw_material_stock/database/RawMaterialRejectionTable";
import {
    RawMaterialStockInTable
} from "../inventory/raw_material_stock/database/RawMaterialStockInTable";
import {
    RawMaterialStockTable
} from "../inventory/raw_material_stock/database/RawMaterialStockTable";
import {
    RawMaterialTable
} from "../inventory/raw_material/database/RawMaterialTable";
import {DebitNoteTable} from "../inventory/debit_note/database/DebitNoteTable";
import {
    PurchaseInvoiceTable
} from "../inventory/purchase_invoice/database/PurchaseInvoiceTable";
import { CommissionVoucherModel } from "apps/commission/model/CommissionVoucherTable";
import { TaxRateModel } from "apps/tax-rate/models/TaxRateTable";
import CommissionPayoutModel from "../commission/model/CommissionPayoutTable";

const m = [
     ProposalModel,
     AreaModel,
     RegionModel,
     AddressModel,
     UserModel,
     DocumentModel,
     OrganizationModel,
     FranchiseModel,
     CampaignAdModel,
     AgreementDocModel,
     LeadsModel,
     ContractModel,
     AssignModel,
     OptionsModel,
     FranchiseLeadModel,
     PdiCheckpointModel,
     IChecklistModel,
     ProductVariationsModel,
     AffiliateModel,
     QuestionModel,
     CampaignQuestionModel,
     FollowDetailsModel,
     CommissionEntityMappingModel,
     CommissionTable,
     CartDetailsModel,
     ProductsCategoryModel,
     ProductModel,
     OrderModel,
     NotesModel,
     OrderItemsModel,
     CartProductModel,
     ItemStockModel,
     CampaignProposalsModel,
    CommissionVoucherModel,
     FactoryGateTable,
     StorageLocationTable,
     ItemUnitTable,
     ItemCategoryTable,
     SupplierTable,
     RawMaterialPriceTable,
     RawMaterialHoldTable,
     RawMaterialRejectionTable,
     RawMaterialStockInTable,
     RawMaterialStockTable,
     RawMaterialTable,
     DebitNoteTable,
     PurchaseInvoiceTable,
     PdiModel,
     FileModel,
     PendingOrderModel,
     RPOrderTable,
     B2CUserAddressModel,
     TaxRateModel
];

console.log(m)

const models = {
    ProposalModel: ProposalModel.initModel(),
    AreaModel: AreaModel.initModel(),
    RegionModel: RegionModel.initModel(),
    AddressModel: AddressModel.initModel(),
    UserModel: UserModel.initModel(),
    Document: DocumentModel.initModel(),
    Organization: OrganizationModel.initModel(),
    Franchise: FranchiseModel.initModel(),
    Campaign: CampaignAdModel.initModel(),
    Agreement: AgreementDocModel.initModel(),
    Leads: LeadsModel.initModel(),
    ContractModel: ContractModel.initModel(),
    AssignModel: AssignModel.initModel(), //depends on Lead & User model
    OptionsModel: OptionsModel.initModel(),
    FranchiseLeadModel: FranchiseLeadModel.initModel(),
    PdiCheckPoints: PdiCheckpointModel.initModel(),
    IChecklistModel: IChecklistModel.initModel(),
    Variations: ProductVariationsModel.initModel(),
    Affiliate: AffiliateModel.initModel(),
    QuestionModel: QuestionModel.initModel(),
    CampaignQuestionModel: CampaignQuestionModel.initModel(),
    FollowDetailModel: FollowDetailsModel.initModel(),
    CommissionEntityMap: CommissionEntityMappingModel.initModel(),
    Commission: CommissionTable.initModel(),
    CartDetails: CartDetailsModel.initModel(),
    ProductCategory: ProductsCategoryModel.initModel(),
    Product: ProductModel.initModel(),
    Order: OrderModel.initModel(),
    Notes: NotesModel.initModel(),
    OrderItem: OrderItemsModel.initModel(),
    Cart: CartProductModel.initModel(),
    ItemStockModel: ItemStockModel.initModel(),
    CampaignProposalsModel: CampaignProposalsModel.initModel(),
    CommissionVoucherModel:CommissionVoucherModel.initModel(),

    /* inventory */


    FactoryGateModel: FactoryGateTable.initModel(),
    StorageLocationModel: StorageLocationTable.initModel(),
    ItemUnitModel: ItemUnitTable.initModel(),
    ItemCategoryModel: ItemCategoryTable.initModel(),
    SupplierModel: SupplierTable.initModel(),
    RawMaterialPrice: RawMaterialPriceTable.initModel(),
    RawMaterialHold: RawMaterialHoldTable.initModel(),
    RawMaterialRejected: RawMaterialRejectionTable.initModel(),
    RawMaterialStockIn: RawMaterialStockInTable.initModel(),
    RawMaterialStock: RawMaterialStockTable.initModel(),
    RawMaterialModel: RawMaterialTable.initModel(),
    DebitNoteModel: DebitNoteTable.initModel(),
    PurchaseInvoiceModel: PurchaseInvoiceTable.initModel(),


    PDI: PdiModel.initModel(),
    File: FileModel.initModel(),
    PendingOrder: PendingOrderModel.initModel(),
    RPOrderTable:RPOrderTable.initModel(),
    B2CUserAddress: B2CUserAddressModel.initModel(),
    TaxRate: TaxRateModel.initModel(),
    CommissionPayoutModel: CommissionPayoutModel.initModel()
};

let currentModel: string = null;

try {
    // Initialize Associations
    Object.keys(models).forEach((modelName) => {
        currentModel = modelName;

        if (models[modelName].associate) {
            models[modelName].associate();
        }

        if (models[modelName].hook) {
            models[modelName].hook();
        }
    });
    console.log("Associations initialized successfully.");
}
catch (e) {
    handleError(e, currentModel)
}
