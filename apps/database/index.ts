import { AddressModel } from "apps/address/models/AddressTable";
import { AffiliateModel } from "apps/affiliate/models/affiliateModel";
import { AgreementDocModel } from "apps/agreement-docs/model/agreementDocModel";
import { AreaModel } from "apps/area/models/AreaTable";
import { CampaignAdModel } from "apps/campaign/models/CampaignModel";
import { CampaignQuestionModel } from "apps/campaign/models/CampaignQuestionModel";
import { handleError } from "apps/common/utils/HelperMethods";
import { ContractModel } from "apps/contracts/models/ContractTable";
import { DocumentModel } from "apps/documents/models/DocumentTable";
import { FollowDetailsModel } from "apps/follow-details/model/followDetailModel";
import { FranchiseModel } from "apps/franchise/models/FranchiseTable";
import { FranchiseLeadModel } from "apps/franchise_model/models/FranchiseModelTable";
import { IChecklistModel } from "apps/ichecklist/model/CheckListTable";
import { AssignModel } from "apps/lead/models/AssignTable";
import { LeadsModel } from "apps/lead/models/LeadTable";
import { OptionsModel } from "apps/options/models/optionTable";
import { OrganizationModel } from "apps/organization/models/OrganizationTable";
import { PdiCheckpointModel } from "apps/pdi-checkpoint/model/PdiCheckPointTable";
import { QuestionModel } from "apps/questions/models/QuestionModel";
import { RegionModel } from "apps/region/models/RegionTable";
import { UserModel } from "apps/user/models/UserTable";
import { ProductOptionsModel } from "database/schema/product-options/productOptionsModel";


// Initialize Models
const models = {
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
    AreaModel: AreaModel.initModel(),
    OptionsModel: OptionsModel.initModel(),
    FranchiseLeadModel: FranchiseLeadModel.initModel(),
    PdiCheckPoints: PdiCheckpointModel.initModel(),
    IChecklistModel: IChecklistModel.initModel(),
    Variations: ProductOptionsModel.initModel(),

    Affiliate: AffiliateModel.initModel(),
    QuestionModel: QuestionModel.initModel(),
    CampaignQuestionModel: CampaignQuestionModel.initModel(),
    FollowDetailModel: FollowDetailsModel.initModel(),
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