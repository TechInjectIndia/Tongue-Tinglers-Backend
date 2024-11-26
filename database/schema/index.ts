// Admin model starts
export * from "./user/user.model";
export * from "./user/address";
export * from "./user/userAddressModel";
export * from "./admin-roles";
export * from "./admin-permissions";
// Admin model ends

// ecommerce model starts
export * from "./ecommerce/category.model";
export * from "./ecommerce/category_image.model";
export * from "./ecommerce/order.model";
export * from "./ecommerce/order_item.model";
export * from "./ecommerce/shippingActivity";
export * from "./ecommerce/product.model";
export * from "./ecommerce/product_category_map.model";
export * from "./ecommerce/product_image.model";
export * from "./ecommerce/tag.model";
export * from "./ecommerce/tag_image.model";
export * from "./ecommerce/taxes";
export * from "./ecommerce/stockModel";
export * from "./ecommerce/vendorsModel";
export * from "./ecommerce/cartModel";
export * from "./ecommerce/CartItemModel";
export * from "./user/userAddressModel";
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
export * from "./campaign-ui/questionModel";

export * from "./files/fileModel";
export * from "./files/emailModel";
export * from "./files/galleryModel";

export * from "./franchise/franchiseeModel";
export * from "./franchise/franchiseLocationModel";
export * from "./franchise/pdiModel";
export * from "./franchise/RegionsModel";
export * from "./franchise/AreaModel";
export * from "./franchise/smDetailsModel";

// --- Sequelize Associations Setup --- //

import { CampaignAdModel } from "./campaign-ui/campaignAdModel";
// import { questionModel } from "./campaign-ui/questionModel";
import { FranchiseLocationModel } from "./franchise/franchiseLocationModel";
import { FranchiseeModel } from "./franchise/franchiseeModel";
import { AffiliateModel } from "./lead/affiliateModels";
import { SocialMediaDetailsModel } from "./lead/smDetailsModel";
import { SocialMediaDetailsFranchiseModel } from "./franchise/smDetailsModel";
import { AssignModel } from "./lead/assigneeModels";
import { LeadsModel } from "./lead/lead.model";
import { UserModel } from "./user/user.model";
import { UserAddressModel } from "./user/userAddressModel";
import { RegionModel } from "./franchise/RegionsModel";
import { ProposalLeadModels } from "./lead/proposalModels";

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

CampaignAdModel.hasOne(RegionModel, {
    foreignKey: "regionId",
    as: "region",
});

CampaignAdModel.hasOne(AffiliateModel, {
    foreignKey: "affiliateId",
    as: "affiliate",
});

CampaignAdModel.hasMany(ProposalLeadModels, {
    foreignKey: "proposalIds",
    as: "proposals",
});

// Establish association with FranchiseLocationModel
FranchiseeModel.hasOne(FranchiseLocationModel, {
    foreignKey: "franchiseeId",
    as: "franchiseLocation",
});

FranchiseLocationModel.belongsTo(FranchiseeModel, {
    foreignKey: "franchiseeId",
    as: "franchisee",
});
// Establish association with FranchiseLocationModel

// Establish association with SocialMediaDetailsFranchiseModel
FranchiseeModel.hasMany(SocialMediaDetailsFranchiseModel, {
    foreignKey: "franchiseeId",
    as: "socialMediaDetails",
});

SocialMediaDetailsFranchiseModel.belongsTo(FranchiseeModel, {
    foreignKey: "franchiseeId",
    as: "franchisee",
});
// Establish association with SocialMediaDetailsFranchiseModel

UserModel.hasMany(UserAddressModel, { foreignKey: "userId", as: "address" });

UserModel.hasMany(AssignModel, {
    foreignKey: "assignedTo",
    as: "assignmentsAsAssignedTo",
});
UserModel.hasMany(AssignModel, {
    foreignKey: "assignedBy",
    as: "assignmentsAsAssignedBy",
});

AssignModel.belongsTo(UserModel, {
    foreignKey: "assignedTo",
    as: "assignedUser",
});
AssignModel.belongsTo(UserModel, {
    foreignKey: "assignedBy",
    as: "assignerUser",
});

// Establish association with AssignModel
LeadsModel.hasMany(AssignModel, {
    foreignKey: "leadId",
    as: "assign",
});

AssignModel.belongsTo(LeadsModel, {
    foreignKey: "leadId",
    as: "lead",
});
// Establish association with AssignModel

// Establish association with AffiliateModel
AffiliateModel.hasMany(SocialMediaDetailsModel, {
    foreignKey: "affiliateId",
    as: "sm",
});
SocialMediaDetailsModel.belongsTo(AffiliateModel, {
    foreignKey: "affiliateId",
    as: "affiliate",
});
// Establish association with AffiliateModel

import { ProductsModel } from "./ecommerce/product.model";
import { ProductCategoryModel } from "./ecommerce/category.model";
import { ProductCategoryMapModel } from "./ecommerce/product_category_map.model";

ProductCategoryModel.belongsToMany(ProductsModel, {
    through: ProductCategoryMapModel,
    foreignKey: "categoryId",
    otherKey: "productId",
    as: "products", // Ensure this alias matches
});

ProductsModel.belongsToMany(ProductCategoryModel, {
    through: ProductCategoryMapModel,
    foreignKey: "productId",
    otherKey: "categoryId",
    as: "categories", // Ensure this alias matches
});

import { RetortProductsModel } from "./retort/retort-product";
import { RetortProductCategoryModel } from "./retort/retort-category";
import { RetortProductCategoryMapModel } from "./retort/retort-product_category_map";

RetortProductCategoryModel.belongsToMany(RetortProductsModel, {
    through: RetortProductCategoryMapModel,
    foreignKey: "categoryId",
    otherKey: "productId",
    as: "products", // Ensure this alias matches
});

RetortProductsModel.belongsToMany(RetortProductCategoryModel, {
    through: RetortProductCategoryMapModel,
    foreignKey: "productId",
    otherKey: "categoryId",
    as: "categories", // Ensure this alias matches
});

console.log("Associations initialized successfully.");
