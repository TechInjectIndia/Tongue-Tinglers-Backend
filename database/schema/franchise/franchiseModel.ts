import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";

import { UserModel } from "../user/user.model";
import { FRANCHISE_STATUS, Franchise } from "../../../interfaces";

import { RegionModel } from "./RegionsModel";
import {
    OrganizationModel,
} from "../../../apps/organization/database/organization_schema";
import franchise from "../../../apps/franchise/api/franchise";

const { STRING, INTEGER, DATE, NOW, ARRAY, ENUM } = DataTypes;

// Franchisee creation attributes, making 'id' optional for creation
interface FranchiseeCreationAttributes extends Optional<Franchise, "id" | "createdAt" | "updatedAt" | "deletedAt"> {
}

// Franchisee class model for the Sequelize ORM
class FranchiseModel extends Model<Franchise, FranchiseeCreationAttributes> implements Franchise {
    public organizationId: number;
    public id: number;
    public location: number;
    public sm: number[];
    public pocName: string;
    public pocEmail: string;
    public pocPhoneNumber: string;
    public users: number[];
    public regionId: number;
    public area: string;
    public agreementIds: number[];
    public paymentIds: number[];
    public status: FRANCHISE_STATUS;
    public establishedDate: Date;

    public createdBy: number;
    public updatedBy: number | null;
    public deletedBy: number | null;

    public createdAt: Date;
    public deletedAt: Date | null;
    public updatedAt: Date | null;
    public affiliateId: number;


    public static associate() {

        this.belongsTo(RegionModel, {
            foreignKey: "regionId",
            as: "Region",
        });
        this.belongsTo(OrganizationModel, {
            foreignKey: "organizationId",
            as: "organization",
        });

        this.belongsTo(UserModel, {
            foreignKey: "createdBy",
            as: "createdByUser",
        });

        // Updated by a user
        this.belongsTo(UserModel, {
            foreignKey: "updatedBy",
            as: "updatedByUser",
        });

        // Deleted by a user (soft delete)
        this.belongsTo(UserModel, {
            foreignKey: "deletedBy",
            as: "deletedByUser",
        });

    }


}

FranchiseModel.init(
    {
        id: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        affiliateId: {
            type: INTEGER,
            allowNull: true,
        },
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
            allowNull: true,  // Array of numbers for 'sm' field
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
            allowNull: true,  // Array of user IDs (nullable)
        },
        organizationId: {
            type: INTEGER, allowNull: false,
        },
        regionId: {
            type: INTEGER,
            allowNull: false,
        },
        area: {
            type: STRING,
            allowNull: false,
        },
        agreementIds: {
            type: ARRAY(INTEGER),
            allowNull: true,  // Array of agreement IDs
        },
        paymentIds: {
            type: ARRAY(INTEGER),
            allowNull: true,  // Array of payment IDs
        },
        status: {
            type: ENUM(...Object.values(FRANCHISE_STATUS)), // Use values from FRANCHISE_STATUS enum
            allowNull: false,
        },
        establishedDate: {
            type: DATE,
            allowNull: false,  // Franchisee's establishment date
        },
        createdBy: {
            type: INTEGER,
            allowNull: false,  // User ID of the creator
        },
        updatedBy: {
            type: INTEGER,
            allowNull: true,  // Nullable if not updated
        },
        deletedBy: {
            type: INTEGER,
            allowNull: true,  // Nullable for soft delete
        },
    },
    {
        sequelize,
        tableName: "franchisees",  // Use a table name that makes sense
        timestamps: true,  // Enable automatic timestamps
        paranoid: true,  // Enable soft deletes
        comment: "Table to store franchisee organizations",  // Comment for the table
    },
);

FranchiseModel.associate();

export { FranchiseModel };

