import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { BUSINESS_TYPE, IOrganization, ORGANIZATION_TYPE } from "../../../interfaces/organization";
import { AddressModel, UserModel } from "../../../database/schema";
import {DocumentModel} from "../../../database/schema/documents/documentModel";
import RepoProvider from "../../RepoProvider";
 // Ensure this path is correct

const { STRING, INTEGER, DATE, NOW, ENUM } = DataTypes;

interface OrganizationCreationAttributes extends Optional<IOrganization, "id" | "createdAt" | "updatedAt" | "deletedAt"> { }

class OrganizationModel extends Model<IOrganization, OrganizationCreationAttributes> implements IOrganization {
    public rootUser: number | null;
    public id!: number;
    public name: string;
    public contactPersonName: string;
    public contactNumber: string;
    public contactEmail: string;
    public pan: string | null;
    public gst: string | null;
    public bankName: string;
    public bankAccountNumber: string;
    public bankIFSCCode: string;
    public masterFranchiseId: number | null;
    public createdBy!: number;
    public updatedBy!: number | null;
    public deletedBy!: number | null;
    public billingAddressId: number;
    public businessType: BUSINESS_TYPE;

    public type: ORGANIZATION_TYPE;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date | null;
    public readonly deletedAt!: Date | null;


    // Mixin methods for associations
    public addShippingAddress!: (address: AddressModel | number) => Promise<void>;
    public addShippingAddresses!: (addresses: Array<AddressModel | number>) => Promise<void>;
    public setShippingAddresses!: (addresses: Array<AddressModel | number>) => Promise<void>;
    public getShippingAddresses!: () => Promise<AddressModel[]>;
    public removeShippingAddress!: (address: AddressModel | number) => Promise<void>;
    public removeShippingAddresses!: (addresses: Array<AddressModel | number>) => Promise<void>;


    // Mixin for Documents
    public getOrganizationDocuments!: () => Promise<DocumentModel[]>;
    public addOrganizationDocument!: (document: DocumentModel | number) => Promise<void>;
    public addOrganizationDocuments!: (documents: Array<DocumentModel | number>) => Promise<void>;
    public setOrganizationDocuments!: (documents: Array<DocumentModel | number>) => Promise<void>;
    public removeOrganizationDocument!: (document: DocumentModel | number) => Promise<void>;
    public removeOrganizationDocuments!: (documents: Array<DocumentModel | number>) => Promise<void>;


    // Add the association function
    public static associate() {
        // One-to-one association for billing address
        this.belongsTo(AddressModel, {
            foreignKey: "billingAddressId",
            as: "billingAddress", // Alias for billing address
        });

        // Many-to-many association for shipping addresses
        this.belongsToMany(AddressModel, {
            through: "OrganizationAddresses", // Join table name
            foreignKey: "organizationId",
            otherKey: "shippingAddressId",
            as: "shippingAddresses", // Alias for shipping addresses
        });

        // Other associations
        this.belongsTo(UserModel, { foreignKey: "rootUser", as: "user" });
        this.belongsTo(OrganizationModel, { foreignKey: "masterFranchiseId", as: "masterFranchise" });
        this.belongsTo(UserModel, { foreignKey: "createdBy", as: "createdByUser" });
        this.belongsTo(UserModel, { foreignKey: "updatedBy", as: "updatedByUser" });
        this.belongsTo(UserModel, { foreignKey: "deletedBy", as: "deletedByUser" });

        this.hasMany(DocumentModel, {
            foreignKey: "entity_id",
            as: "organizationDocuments",
            scope: { entity_type: "organization" },
        });
    }

    static initModel() {
        OrganizationModel.init(
            {
                id: { type: INTEGER, autoIncrement: true, primaryKey: true },
                rootUser: { type: INTEGER, allowNull: true },
                name: { type: STRING, allowNull: false },
                contactPersonName: { type: STRING, allowNull: false },
                contactNumber: { type: STRING, allowNull: false },
                contactEmail: { type: STRING, allowNull: false },
                pan: { type: STRING, allowNull: true },
                gst: { type: STRING, allowNull: true },
                bankName: { type: STRING, allowNull: false },
                bankAccountNumber: { type: STRING, allowNull: false },
                bankIFSCCode: { type: STRING, allowNull: false },
                masterFranchiseId: { type: INTEGER, allowNull: true },
                createdBy: { type: INTEGER, allowNull: false },
                updatedBy: { type: INTEGER, allowNull: true },
                deletedBy: { type: INTEGER, allowNull: true },
                billingAddressId: { type: INTEGER, allowNull: false },
                businessType: { type: ENUM(...Object.values(BUSINESS_TYPE)), allowNull: false },
                type: { type: ENUM(...Object.values(ORGANIZATION_TYPE)), allowNull: false },
                createdAt: { type: DATE, allowNull: false, defaultValue: NOW },
                updatedAt: { type: DATE, allowNull: true },
                deletedAt: { type: DATE, allowNull: true },
            },
            {
                sequelize,
                tableName: "organizations",
                timestamps: true,
                paranoid: true,
                comment: "Table to store organizations",
            }
        );
        return OrganizationModel;
    }

    public static hook() {
        OrganizationModel.addHook("afterCreate", async (instance, options) => {
                    await RepoProvider.LogRepo.logModelAction(
                        "create",
                        "Organization",
                        instance,
                        options
                    );
                });
        
                // After Update Hook - Log the updated fields of the Organization
                OrganizationModel.addHook("afterUpdate", async (instance, options) => {
                    // Now call logModelAction as before
                    await RepoProvider.LogRepo.logModelAction(
                        "update",
                        "Organization",
                        instance,
                        options
                    );
                });
        
                // After Destroy Hook - Log the deletion of the Organization
                OrganizationModel.addHook("afterDestroy", async (instance, options) => {
                    await RepoProvider.LogRepo.logModelAction(
                        "delete",
                        "Organization",
                        instance,
                        options
                    );
                });
    }
}



export { OrganizationModel };
