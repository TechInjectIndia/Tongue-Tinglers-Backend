import {DataTypes, Model} from "sequelize";
import {sequelize} from "../../../config";

class CampaignProposalsModel extends Model {
    static initModel() {
        CampaignProposalsModel.init(
            {
                campaignId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "campaigns",
                        key: "id",
                    },
                },
                proposalId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "proposals",
                        key: "id",
                    },
                },
            },
            {
                sequelize,
                tableName: "campaign_proposals",
                timestamps: false,
            }
        );
        return  CampaignProposalsModel;
    }
}



export {CampaignProposalsModel};
