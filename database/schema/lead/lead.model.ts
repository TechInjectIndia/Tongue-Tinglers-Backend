import { DataTypes, INTEGER, Model, Optional } from "sequelize";
import {
    Affiliate,
    ExtraFields,
    FollowDetails,
    FranchiseModels,
    ILead,
    LeadAddress,
    UserDetails,
} from "../../../interfaces";
import { sequelize } from "../../../config";
import { UserModel } from "../user/user.model";
import { CampaignAdModel } from "../campaign-ui/campaignAdModel";
import { AssignModel } from "./assigneeModels";
import RepoProvider from "../../../apps/RepoProvider";
import { FollowDetailsModel } from "../../../apps/follow-details/model/followDetailModel";
import { LeadTable, Note, LeadStatus, LeadSource, ITrackable } from "../../../apps/lead/interface/lead";

const { STRING, TEXT, DATE, JSONB, ENUM, NOW } = DataTypes;

interface LeadCreationAttributes
    extends Optional<LeadTable, "id" | "createdAt" | "updatedAt" | "deletedAt"> { }

class LeadsModel extends Model<LeadTable, LeadCreationAttributes> implements LeadTable {
    public followDetails?: FollowDetails[];
    public assignedUser: number;
    public id!: number;
    public campaignId: number;
    public firstName!: string;
    public status!: LeadStatus;
    public lastName!: string;
    public phoneNumber!: string;
    public email!: string;
    public address!: LeadAddress;
    public additionalInfo!: string | null;
    public source!: LeadSource;
    public sourceInfo!: string | null;
    public referBy!: number;
    public logs: Record<string, ITrackable[]>;
    public notes: Note[] | null;
    public proposalModalId: number | null;
    public amount: number | null;
    public franchiseModals: number[];
    public affiliate: number[];
    public marketing: number[];
    public other: Array<ExtraFields> | null;
    public createdBy!: number;
    public updatedBy!: number | null;
    public deletedBy!: number | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;

    public addFollowDetail!: (details: FollowDetailsModel | number) => Promise<void>;
    public addFollowDetails!: (details: Array<FollowDetailsModel | number>) => Promise<void>;
    public setFollowDetailses!: (details: Array<FollowDetailsModel | number>) => Promise<void>;
    public getFollowDetailses!: () => Promise<FollowDetailsModel[]>;
    public removeFollowDetails!: (details: FollowDetailsModel | number) => Promise<void>;
    public removeFollowDetailses!: (details: Array<FollowDetailsModel | number>) => Promise<void>;


    public static associate() {
        this.belongsTo(UserModel, {
            foreignKey: "createdBy",
            as: "creator",
        });
        this.belongsTo(UserModel, {
            foreignKey: "updatedBy",
            as: "updater",
        });
        this.belongsTo(UserModel, {
            foreignKey: "deletedBy",
            as: "deleter",
        });
        this.belongsTo(UserModel, {
            foreignKey: "assignedUser",
            as: "assignee",
        });
        this.belongsTo(CampaignAdModel, {
            foreignKey: "campaignId",
            as: "campaign_ad",
        });
        this.belongsToMany(FollowDetailsModel, {
            through: "followDetailsJoin", // Join table name
            foreignKey: "leadId", // Foreign key in the join table
            otherKey: "follow_details_id", // Other foreign key in the join table
            as: "followDetails", // Alias for the relationship
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
                logs: {
                    type: JSONB,
                    allowNull: true,
                },
                source: {
                    type: ENUM(...Object.values(LeadSource)),
                    allowNull: false,
                },
                sourceInfo: {
                    type: STRING,
                    allowNull: true,
                },
                referBy: {
                    type: INTEGER,
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
