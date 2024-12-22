import { DataTypes, INTEGER, Model, Optional } from "sequelize";
import {
    Affiliate,
    ExtraFields,
    FollowDetails,
    FranchiseModels,
    ILead,
    ITrackable,
    LeadAddress,
    LeadSource,
    LeadStatus,
    Note,
    UserDetails,
} from "../../../interfaces";
import { sequelize } from "../../../config";
import { UserModel } from "../user/user.model";
import { CampaignAdModel } from "../campaign-ui/campaignAdModel";
import { AssignModel } from "./assigneeModels";
import RepoProvider from "../../../apps/RepoProvider";

const { STRING, TEXT, DATE, JSONB, ENUM, NOW } = DataTypes;

interface LeadCreationAttributes
    extends Optional<ILead, "id" | "createdAt" | "updatedAt" | "deletedAt"> { }

class LeadsModel extends Model<ILead, LeadCreationAttributes> implements ILead {
    public assignedUser: number;
    public id!: number;
    public campaignId?: number;
    public firstName!: string;
    public status!: LeadStatus;
    public lastName!: string;
    public phoneNumber!: string;
    public email!: string;
    public address!: LeadAddress;
    public additionalInfo!: string | null;
    public source!: LeadSource;
    public sourceInfo!: string | null;
    public followDetails!: FollowDetails[] | null;
    public referBy!: UserDetails;
    public logs!: Record<string, ITrackable[]>;
    public notes!: Note[] | null;
    public proposalModalId?: number | null;
    public amount?: number | null;
    public franchiseModals: Array<FranchiseModels> | null;
    public affiliate: Array<Affiliate> | null;
    public marketing: Array<string> | null;
    public other: Array<ExtraFields> | null;
    public createdBy!: number;
    public updatedBy!: number | null;
    public deletedBy!: number | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;

    public static associate() {
        LeadsModel.belongsTo(UserModel, {
            foreignKey: "createdBy",
            as: "creator",
        });
        LeadsModel.belongsTo(UserModel, {
            foreignKey: "updatedBy",
            as: "updater",
        });
        LeadsModel.belongsTo(UserModel, {
            foreignKey: "deletedBy",
            as: "deleter",
        });
        LeadsModel.belongsTo(UserModel, {
            foreignKey: "assignedUser",
            as: "assignee",
        });
        LeadsModel.belongsTo(CampaignAdModel, {
            foreignKey: "campaignId",
            as: "campaign_ad",
        });
    }

    public static initModel() {
        LeadsModel.init(
            {
                id: {
                    type: INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                campaignId: {
                    type: INTEGER,
                    references: {
                        model: "campaigns",
                        key: "id",
                    },
                    allowNull: true,
                },
                firstName: {
                    type: STRING,
                    allowNull: false,
                },
                lastName: {
                    type: STRING,
                    allowNull: false,
                },
                email: {
                    type: STRING,
                    allowNull: false,
                },
                phoneNumber: {
                    type: STRING,
                    allowNull: false,
                },
                address: {
                    type: JSONB,
                    allowNull: false,
                },
                additionalInfo: {
                    type: TEXT,
                    allowNull: true,
                },
                status: {
                    type: ENUM(...Object.values(LeadStatus)),
                    allowNull: false,
                },
                source: {
                    type: ENUM(...Object.values(LeadSource)),
                    allowNull: false,
                },
                sourceInfo: {
                    type: STRING,
                    allowNull: true,
                },
                followDetails: {
                    type: JSONB,
                    allowNull: true,
                },
                referBy: {
                    type: JSONB,
                    allowNull: true,
                },
                logs: {
                    type: JSONB,
                    allowNull: true,
                },
                notes: {
                    type: JSONB,
                    allowNull: true,
                },
                proposalModalId: {
                    type: INTEGER,
                    allowNull: true,
                },
                amount: {
                    type: INTEGER,
                    allowNull: true,
                },
                franchiseModals: {
                    type: JSONB,
                    allowNull: true,
                },
                affiliate: {
                    type: JSONB,
                    allowNull: true,
                },
                marketing: {
                    type: JSONB,
                    allowNull: true,
                },
                other: {
                    type: JSONB,
                    allowNull: true,
                },
                createdBy: {
                    type: INTEGER,
                    allowNull: false,
                },
                updatedBy: {
                    type: INTEGER,
                    allowNull: true,
                },
                assignedUser: {
                    type: INTEGER,
                    allowNull: true,
                },
                deletedBy: {
                    type: INTEGER,
                    allowNull: true,
                },
                createdAt: {
                    type: DATE,
                    allowNull: false,
                    defaultValue: NOW,
                    field: "created_at",
                },
                updatedAt: {
                    type: DATE,
                    allowNull: false,
                    defaultValue: NOW,
                    field: "updated_at",
                },
                deletedAt: {
                    type: DATE,
                    allowNull: true,
                    defaultValue: null,
                    field: "deleted_at",
                },
            },
            {
                sequelize,
                tableName: "leads",
                timestamps: true,
                paranoid: true,
            }
        );
        return LeadsModel;
    }

    public static hook() {
        LeadsModel.addHook("afterCreate", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "create",
                "Leads",
                instance,
                options
            );
        });

        // After Update Hook - Log the updated fields of the Leads
        LeadsModel.addHook("afterUpdate", async (instance, options) => {
            // Now call logModelAction as before
            await RepoProvider.LogRepo.logModelAction(
                "update",
                "Leads",
                instance,
                options
            );
        });

        // After Destroy Hook - Log the deletion of the Leads
        LeadsModel.addHook("afterDestroy", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "delete",
                "Leads",
                instance,
                options
            );
        });
    }
}

export { LeadsModel };
