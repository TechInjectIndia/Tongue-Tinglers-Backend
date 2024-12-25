import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../../config";

class CampaignQuestionModel extends Model {
    public static initModel(){
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
}



export { CampaignQuestionModel };
