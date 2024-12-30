import { DataTypes, DATE, ENUM, FLOAT, INTEGER, JSONB, Model, Optional, STRING } from "sequelize";

import { CONTRACT_PAYMENT_STATUS, CONTRACT_STATUS, ContractTable, SignDoc } from "../interface/Contract";
import { ITrackable, Note } from "apps/lead/interface/lead";
import { UserModel } from "apps/user/models/UserTable";
import { LeadsModel } from "apps/lead/models/LeadTable";
import { OrganizationModel } from "apps/organization/models/OrganizationTable";
import { sequelize } from "config";
import RepoProvider from "apps/RepoProvider";


interface ContractCreationAttributes
    extends Optional<ContractTable, "id" | "createdAt" | "updatedAt"> { }

class ContractModel
    extends Model<ContractTable, ContractCreationAttributes>
    implements ContractTable {
    signedDocs: SignDoc[];
    public id!: number;
    public status!: CONTRACT_STATUS;
    public proposalData: number | null;
    public terminationDetails: null | {
        UserDetails: number;
        reason: string;
        date: Date;
    };
    public payment!:
        | null
        | {
            paymentId: string;
            amount: number;
            date: Date;
            status: CONTRACT_PAYMENT_STATUS;
            additionalInfo: string;
        }[];
    public leadId!: number | null;
    public templateId!: string | null;
    public amount!: number;
    public signedDate!: Date | null;
    public dueDate!: Date;
    public validity!: {
        to: Date;
        from: Date;
    };
    public notes: Note[] | null;
    public additionalInfo!: string | null;
    public logs: ITrackable[] | null;
  
    public createdBy!: number;
    public updatedBy!: number | null;
    public deletedBy!: number | null;
    public deletedAt!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate() {
        this.belongsTo(UserModel, {
            foreignKey: "userId",
            as: "user",
            constraints: false,
        });
        this.belongsTo(LeadsModel, {
            foreignKey: "leadId",
            as: "lead",
            constraints: false,
        });
        this.belongsTo(OrganizationModel, {
            foreignKey: "organizationId",
            as: "organization",
            constraints: false,
        });
    }
    public static initModel() {
        ContractModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                status: {
                    type: ENUM,
                    values: [...Object.values(CONTRACT_STATUS)],
                    allowNull: false,
                },
                proposalData: {
                    type: JSONB,
                    allowNull: true,
                },
                organizationId: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                terminationDetails: {
                    type: JSONB,
                    allowNull: true,
                },
                payment: {
                    type: JSONB,
                    allowNull: true,
                },
                leadId: {
                    type: INTEGER,
                    allowNull: true,
                },
                templateId: {
                    type: STRING,
                    allowNull: true,
                },
                amount: {
                    type: FLOAT,
                    allowNull: true,
                },
                signedDate: {
                    type: DATE,
                    allowNull: true,
                },
                dueDate: {
                    type: DATE,
                    allowNull: false,
                },
                validity: {
                    type: JSONB,
                    allowNull: false,
                },

                signedDocs: {
                    type: JSONB,
                    allowNull: true,
                },
                notes: {
                    type: JSONB,
                    allowNull: true,
                },
                additionalInfo: {
                    type: STRING,
                    allowNull: true,
                    defaultValue: "",
                },
                createdBy: {
                    type: INTEGER,
                    allowNull: false,
                },
                deletedAt: {
                    type: DATE,
                    allowNull: true,
                },
                updatedBy: {
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
                    defaultValue: DataTypes.NOW,
                    field: "created_at",
                },
                updatedAt: {
                    type: DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                    field: "updated_at",
                },
            },
            {
                sequelize,
                tableName: "contracts",
                timestamps: true,
            }
        );
        return ContractModel;
    }

    public static hook() {
        ContractModel.addHook("afterCreate", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "create",
                "Contracts",
                instance,
                options
            );
        });

        // After Update Hook - Log the updated fields of the Contracts
        ContractModel.addHook("afterUpdate", async (instance, options) => {
            // Now call logModelAction as before
            await RepoProvider.LogRepo.logModelAction(
                "update",
                "Contracts",
                instance,
                options
            );
        });

        // After Destroy Hook - Log the deletion of the Contracts
        ContractModel.addHook("afterDestroy", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "delete",
                "Contracts",
                instance,
                options
            );
        });
    }

    organizationId: number | null;
}

export { ContractModel };
