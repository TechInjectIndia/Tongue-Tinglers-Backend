import RepoProvider from "apps/RepoProvider";
import { sequelize } from "config";
import { Model, DataTypes } from "sequelize";

class CampaignQuestionModel extends Model {
    public static initModel() {
        CampaignQuestionModel.init(
            {
                campaignId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "CampaignAdModel", // Ensure this matches the actual table name
                        key: "id",
                    },
                },
                questionId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "QuestionModel", // Ensure this matches the actual table name
                        key: "id",
                    },
                },
            },
            {
                sequelize,
                tableName: "campaign_questions", // Junction table name
                timestamps: false, // Optional, as it's purely relational
            }
        );
        return CampaignQuestionModel;
    }

    public static hook() {
        CampaignQuestionModel.addHook(
            "afterCreate",
            async (instance, options) => {
                await RepoProvider.LogRepo.logModelAction(
                    "create",
                    "Campaign Question",
                    instance,
                    options
                );
            }
        );

        // After Update Hook - Log the updated fields of the Campaign Question
        CampaignQuestionModel.addHook(
            "afterUpdate",
            async (instance, options) => {
                // Now call logModelAction as before
                await RepoProvider.LogRepo.logModelAction(
                    "update",
                    "Campaign Question",
                    instance,
                    options
                );
            }
        );

        // After Destroy Hook - Log the deletion of the Campaign Question
        CampaignQuestionModel.addHook(
            "afterDestroy",
            async (instance, options) => {
                await RepoProvider.LogRepo.logModelAction(
                    "delete",
                    "Campaign Question",
                    instance,
                    options
                );
            }
        );
    }
}

export { CampaignQuestionModel };
