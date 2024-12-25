// Admin model starts
import {UserModel} from "./user/user.model";
import { CampaignAdModel } from "./campaign-ui/campaignAdModel";

import { FranchiseModel } from "./franchise/franchiseModel";
import { AssignModel } from "./lead/assigneeModels";
import { LeadsModel } from "./lead/lead.model";

import {
    AgreementDocModel
} from "../../apps/agreement-docs/model/agreementDocModel";
import { RetortProductCategoryModel } from "./retort/retort-category";
import {
    OrganizationModel
} from "../../apps/organization/database/organization_schema";
import { DocumentModel } from "./documents/documentModel";

import { handleError } from "../../apps/common/utils/HelperMethods";
import { CampaignSubmissions } from "./campaign-ui/campaignSubmissions";
import { ContractModel } from "./contracts";
import { OrdersModel } from "./ecommerce/order.model";
import { ShippingHistoryModel } from "./ecommerce/shippingActivity";
import { ItemStockModel } from "./petpooja/stock";
import { AreaModel } from "./franchise/AreaModel";
import { OptionsModel } from "./options/optionModel";
import { FranchiseLeadModel } from "./lead/franchiseModels";
import { IChecklistModel } from "./franchise/iChecklist";
import { ProductOptionsModel } from "./product-options/productOptionsModel";
import { PdiCheckpointModel } from "./franchise/pdiCheckPointModel";
import { AffiliateModel } from "./lead/affiliateModels";
import {QuestionModel} from "./campaign-ui/QuestionModel";
import {CampaignQuestionModel} from "./campaign-ui/CampaignQuestionModel";

export * from "./user/user.model";
export * from "./user/address";
export * from "./admin-roles";
export * from "./admin-permissions";
// Admin model ends

// ecommerce model starts
export * from "./ecommerce/category.model";
export * from "./ecommerce/category_image.model";
export * from "./ecommerce/order.model";
export * from "./ecommerce/order_item.model";
export * from "./ecommerce/shippingActivity";
export * from "./ecommerce/product_category_map.model";
export * from "./ecommerce/product_image.model";
export * from "./ecommerce/tag.model";
export * from "./ecommerce/tag_image.model";
export * from "./ecommerce/taxes";
export * from "./ecommerce/stockModel";
export * from "./ecommerce/vendorsModel";
export * from "./ecommerce/cartModel";
export * from "./ecommerce/CartItemModel";

// ecommerce model ends

// retort model starts
export * from "./retort/retort-category";
export * from "./retort/retort-category_image";
export * from "./retort/retort-product";
export * from "./retort/retort-product_category_map";
export * from "./retort/retort-product_image";
// retort model ends

// lead model starts
export * from "./lead/lead.model";
// lead model ends

export * from "./payments/payments";
export * from "./reviews/reviews";
export * from "./testimonials/testimonials";

export * from "./menu/menu";
export * from "./menu/menu-category";
export * from "./menu/menu-category_map";
export * from "./menu/menu-product";

export * from "./settings";
export * from "./petpooja/stock";
export * from "./contracts";
export * from "./token";

// crm model starts
export * from "./crm";
export * from "./lead/affiliateModels";
export * from "./lead/smDetailsModel";
export * from "./lead/franchiseModels";
export * from "./lead/extraFieldsModel";
export * from "./lead/SeoImageModel";
export * from "./lead/proposalModels";
export * from "./lead/assigneeModels";
// crm model ends

export * from "./campaign-ui/campaignAdModel";
export * from "./campaign-ui/campaignSubmissions";
export * from "./campaign-ui/QuestionModel";

export * from "./files/fileModel";
export * from "./files/emailModel";
export * from "./files/galleryModel";

export * from "./franchise/franchiseModel";
export * from "./franchise/pdiModel";
export * from "./franchise/RegionsModel";
export * from "./franchise/AreaModel";


// --- Sequelize Associations Setup --- //
const m = [
    UserModel,
    DocumentModel,
    OrganizationModel,
    FranchiseModel,
    CampaignAdModel,
    AgreementDocModel,
    LeadsModel,
    CampaignSubmissions,
    ContractModel,
    RetortProductCategoryModel,
    OrdersModel,
    ShippingHistoryModel,
    ItemStockModel,
    AssignModel,
    AreaModel,
    OptionsModel,
    FranchiseLeadModel,
    IChecklistModel,
    CampaignQuestionModel,
    QuestionModel,
    CampaignAdModel
]

console.log(m)

// Initialize Models
const models = {
    UserModel: UserModel.initModel(),
    Document: DocumentModel.initModel(),
    Organization: OrganizationModel.initModel(),
    Franchise: FranchiseModel.initModel(),
    Campaign: CampaignAdModel.initModel(),
    Agreement: AgreementDocModel.initModel(),
    Leads: LeadsModel.initModel(),
    CampaignSubmissions: CampaignSubmissions.initModel(),
    ContractModel: ContractModel.initModel(),
    RetortProductCategoryModel: RetortProductCategoryModel.initModel(),
    OrdersModel: OrdersModel.initModel(),
    ShippingHistoryModel: ShippingHistoryModel.initModel(),
    ItemStockModel: ItemStockModel.initModel(),
    AssignModel: AssignModel.initModel(), //depends on Lead & User model
    AreaModel: AreaModel.initModel(),
    OptionsModel: OptionsModel.initModel(),
    FranchiseLeadModel: FranchiseLeadModel.initModel(),
    PdiCheckPoints: PdiCheckpointModel.initModel(),IChecklistModel: IChecklistModel.initModel(),
    Variations: ProductOptionsModel.initModel(),
    CampaignSubmission: CampaignSubmissions.initModel(),
    Affiliate: AffiliateModel.initModel(),
    QuestionModel: QuestionModel.initModel(),
    CampaignQuestionModel: CampaignQuestionModel.initModel()
};

console.log(Object.keys(models).join(" "))

// Establish association with CampaignAdModel

// CampaignAdModel.belongsToMany(questionModel, {
//     through: 'CampaignQuestions',
//     foreignKey: 'campaignId',
//     otherKey: 'questionId',
//     as: 'questions',
// });

// questionModel.belongsToMany(CampaignAdModel, {
//     through: 'CampaignQuestions',
//     foreignKey: 'questionId',
//     otherKey: 'campaignId',
//     as: 'campaigns',
// });


// Establish association with FranchiseLocationModel
// FranchiseeModel.hasOne(addressmodel, {
//     foreignKey: "franchiseeId",
//     as: "franchiseLocation",
// });

// FranchiseLocationModel.belongsTo(FranchiseeModel, {
//     foreignKey: "franchiseeId",
//     as: "franchisee",
// });
// Establish association with FranchiseLocationModel

// Establish association with SocialMediaDetailsFranchiseModel
// FranchiseeModel.hasMany(SocialMediaDetailsFranchiseModel, {
//     foreignKey: "franchiseeId",
//     as: "socialMediaDetails",
// });

// SocialMediaDetailsFranchiseModel.belongsTo(FranchiseeModel, {
//     foreignKey: "franchiseeId",
//     as: "franchisee",
// });
// Establish association with SocialMediaDetailsFranchiseModel

// UserModel.hasMany(UserAddressModel, { foreignKey: "userId", as: "address" });


// Establish association with AssignModel

// Establish association with AffiliateModel
// AffiliateModel.hasMany(SocialMediaDetailsModel, {
//     foreignKey: "affiliateId",
//     as: "sm",
// });
// SocialMediaDetailsModel.belongsTo(AffiliateModel, {
//     foreignKey: "affiliateId",
//     as: "affiliate",
// });
// // Establish association with AffiliateModel


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


