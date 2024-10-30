// Admin model starts
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
export * from "./ecommerce/product.model";
export * from "./ecommerce/product_category_map.model";
export * from "./ecommerce/product_image.model";
export * from "./ecommerce/tag.model";
export * from "./ecommerce/tag_image.model";
export * from "./ecommerce/taxes";
export * from "./ecommerce/stockModel";
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
export * from "./lead/franchiseModels";
export * from "./lead/proposalModels";
// crm model ends

export * from "./campaign-ui/campaignAdModel";
export * from "./campaign-ui/campaignSubmissions";
export * from "./campaign-ui/questionModel";

export * from "./files/fileModel";
export * from "./files/emailModel";
export * from "./files/galleryModel";

export * from "./franchise/franchiseeModel";
export * from "./franchise/pdiModel";
export * from "./regions";

// --- Sequelize Associations Setup --- //

// import { CampaignAdModel } from "./campaign-ui/campaignAdModel";
// import { questionModel } from "./campaign-ui/questionModel";

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

console.log("Associations initialized successfully.");

