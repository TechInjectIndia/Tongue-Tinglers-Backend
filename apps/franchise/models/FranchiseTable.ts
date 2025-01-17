import { DataTypes, Model, Optional } from "sequelize";

import { DocumentModel } from "apps/documents/models/DocumentTable";
import { Franchise, FRANCHISE_STATUS } from "../interface/Franchise";
import { RegionModel } from "apps/region/models/RegionTable";
import { OrganizationModel } from "apps/organization/models/OrganizationTable";
import { AddressModel } from "apps/address/models/AddressTable";
import { UserModel } from "apps/user/models/UserTable";
import { sequelize } from "config";
import RepoProvider from "apps/RepoProvider";



const { STRING, INTEGER, DATE, NOW, ARRAY, ENUM } = DataTypes;

// Franchisee creation attributes, making 'id' optional for creation
interface FranchiseeCreationAttributes
    extends Optional<
        Franchise,
        "id" | "createdAt" | "updatedAt" | "deletedAt"
    > {}

// Franchisee class model for the Sequelize ORM
class FranchiseModel
    extends Model<Franchise, FranchiseeCreationAttributes>
    implements Franchise
{
    public organizationId: number;
    public id: number;
    public location: number;
    public sm: number[];
    public pocName: string;
    public pocEmail: string;
    public pocPhoneNumber: string;
    public users: number[];
    public regionId: number;
    public area: string | null;
    public agreementIds: string[];
    public paymentIds: string[];
    public status: FRANCHISE_STATUS;
    public establishedDate: Date;
    public assignedUser: number | null

    public createdBy: number;
    public updatedBy: number | null;
    public deletedBy: number | null;

    public createdAt: Date;
    public deletedAt: Date | null;
    public updatedAt: Date | null;
    // public affiliateId: number;

    // Mixin for Documents
    public getFranchiseDocuments!: () => Promise<DocumentModel[]>;
    public addFranchiseDocument!: (
        document: DocumentModel | number
    ) => Promise<void>;
    public addFranchiseDocuments!: (
        documents: Array<DocumentModel | number>
    ) => Promise<void>;
    public setFranchiseDocuments!: (
        documents: Array<DocumentModel | number>
    ) => Promise<void>;
    public removeFranchiseDocument!: (
        document: DocumentModel | number
    ) => Promise<void>;
    public removeFranchiseDocuments!: (
        documents: Array<DocumentModel | number>
    ) => Promise<void>;

    // Associations
    public static associate() {
        FranchiseModel.hasMany(DocumentModel, {
            foreignKey: "entity_id",
            as: "franchiseDocuments",
            scope: { entity_type: "franchise" },
        });

        // I think we dont need this todo @Nitesh confirm!!!
        FranchiseModel.belongsTo(RegionModel, {
            foreignKey: "regionId",
            as: "region",
        });

        FranchiseModel.belongsTo(AddressModel, {
            foreignKey: "location",
            as: "address",
        });
        FranchiseModel.belongsTo(OrganizationModel, {
            foreignKey: "organizationId",
            as: "organization",
        });

        FranchiseModel.belongsTo(UserModel, {
            foreignKey: "createdBy",
            as: "createdByUser",
        });

        FranchiseModel.belongsTo(UserModel, {
            foreignKey: "assignUser",
            as: "assignuser",
        });

        // Updated by a user
        FranchiseModel.belongsTo(UserModel, {
            foreignKey: "updatedBy",
            as: "updatedByUser",
        });

        // Deleted by a user (soft delete)
        FranchiseModel.belongsTo(UserModel, {
            foreignKey: "deletedBy",
            as: "deletedByUser",
        });

        DocumentModel.belongsTo(FranchiseModel, {
            foreignKey: "entity_id",
            as: "franchise",
            scope: { entity_type: "franchise" },
        });
    }

    static initModel() {
        FranchiseModel.init(
            {
                id: {
                    type: INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                // affiliateId: {
                    // type: INTEGER,
                    // allowNull: true,
                // },
                createdAt: {
                    type: DATE,
                    allowNull: false,
                    defaultValue: NOW,
                },
                updatedAt: {
                    type: DATE,
                    allowNull: true,
                    defaultValue: null,
                },
                deletedAt: {
                    type: DATE,
                    allowNull: true,
                    defaultValue: null,
                },
                location: {
                    type: INTEGER,
                    allowNull: false,
                },
                sm: {
                    type: ARRAY(INTEGER),
                    allowNull: true, // Array of numbers for 'sm' field
                },
                pocName: {
                    type: STRING,
                    allowNull: false,
                },
                pocEmail: {
                    type: STRING,
                    allowNull: false,
                },
                pocPhoneNumber: {
                    type: STRING,
                    allowNull: false,
                },
                users: {
                    type: ARRAY(INTEGER),
                    allowNull: true, // Array of user IDs (nullable)
                },
                organizationId: {
                    type: INTEGER,
                    allowNull: true,
                },
                regionId: {
                    type: INTEGER,
                    allowNull: false,
                },
                area: {
                    type: STRING,
                    allowNull: true,
                },
                agreementIds: {
                    type: ARRAY(STRING),
                    allowNull: true, // Array of agreement IDs
                },
                paymentIds: {
                    type: ARRAY(STRING),
                    allowNull: true, // Array of payment IDs
                },
                status: {
                    type: ENUM(...Object.values(FRANCHISE_STATUS)), // Use values from
                    // FRANCHISE_STATUS
                    // enum
                    allowNull: false,
                },
                establishedDate: {
                    type: DATE,
                    allowNull: false, // Franchisee's establishment date
                },
                assignedUser:{
                                    type: INTEGER,
                                    allowNull: true,
                                },
                createdBy: {
                    type: INTEGER,
                    allowNull: false, // User ID of the creator
                },
                updatedBy: {
                    type: INTEGER,
                    allowNull: true, // Nullable if not updated
                },
                deletedBy: {
                    type: INTEGER,
                    allowNull: true, // Nullable for soft delete
                },
            },
            {
                sequelize,
                tableName: "franchises", // Use a table name that makes sense
                timestamps: true, // Enable automatic timestamps
                paranoid: true, // Enable soft deletes
                comment: "Table to store franchisee organizations", // Comment for the
                // table
            }
        );
        return FranchiseModel;
    }

    public static hook() {
        FranchiseModel.addHook("afterCreate", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "create",
                "FranchiseModel",
                instance,
                options
            );
        });

        // After Update Hook - Log the updated fields of the FranchiseModel
        FranchiseModel.addHook("afterUpdate", async (instance, options) => {
            // Now call logModelAction as before
            await RepoProvider.LogRepo.logModelAction(
                "update",
                "FranchiseModel",
                instance,
                options
            );
        });

        // After Destroy Hook - Log the deletion of the FranchiseModel
        FranchiseModel.addHook("afterDestroy", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "delete",
                "FranchiseModel",
                instance,
                options
            );
        });
    }
}

export { FranchiseModel };
