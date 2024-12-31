import { DataTypes, INTEGER, Model, Optional } from "sequelize";

import RepoProvider from "../../RepoProvider";
import { FollowDetailsModel } from "../../follow-details/model/followDetailModel";
import { ExtraFields, ITrackable, LeadAddress, LeadSource, LeadStatus, LeadTable, Note } from "../interface/lead";
import { FollowDetails } from "apps/follow-details/interface/followDetails";
import { UserModel } from "apps/user/models/UserTable";
import { CampaignAdModel } from "apps/campaign/models/CampaignModel";
import { sequelize } from "config";

const { STRING, TEXT, DATE, JSONB, ENUM, NOW } = DataTypes;

interface LeadCreationAttributes
    extends Optional<LeadTable, "id" | "createdAt" | "updatedAt" | "deletedAt"> { }

class LeadsModel extends Model<LeadTable, LeadCreationAttributes> implements LeadTable {
    status: LeadStatus;
    source: LeadSource;
    sourceInfo: string;
    campaignId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: LeadAddress;
    additionalInfo: string;
    followDetails?: FollowDetails[];
    referBy: number;
    notes: Note[];
    proposalModalId: number;
    amount: number;
    franchiseModals: number[];
    affiliate: number[];
    marketing: number[];
    other: ExtraFields[];
    assignedUser: number;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;


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
                source: {
                    type: ENUM(...Object.values(LeadSource)),
                    allowNull: false,
                },
                sourceInfo: {
                    type: STRING,
                    allowNull: true,
                },
                // followDetails: {
                //     type: DataTypes.ARRAY(INTEGER),
                //     allowNull: true,
                // },
                referBy: {
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
