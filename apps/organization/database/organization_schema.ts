import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import {
    BUSINESS_TYPE,
    IOrganization,
    ORGANIZATION_TYPE,
} from "../../../interfaces/organization";
import { AddressModel, UserModel } from "../../../database/schema";

const { STRING, INTEGER, DATE, NOW, ARRAY, ENUM } = DataTypes;

interface OrganizationCreationAttributes
    extends Optional<
        IOrganization,
        "id" | "createdAt" | "updatedAt" | "deletedAt"
    > {
}

class OrganizationTableModel
    extends Model<IOrganization, OrganizationCreationAttributes>
    implements IOrganization {
    public rootUserId: number | null;
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
    public shippingAddressId: Array<number>;
    public type: ORGANIZATION_TYPE;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date | null;
    public readonly deletedAt!: Date | null;

    public static associate() {
        // Belongs to a billing address
        this.belongsTo(AddressModel, {
            foreignKey: "billingAddressId",
            as: "billingAddress",
        });

        // Belongs to a root user
        this.belongsTo(UserModel, {
            foreignKey: "rootUserId",
            as: "rootUser",
        });

        // Has many shipping addresses (if stored separately)
        this.hasMany(AddressModel, {
            foreignKey: "organizationId",
            as: "shippingAddresses",
        });

        // Belongs to a master franchise (if applicable)
        this.belongsTo(OrganizationTableModel, {
            foreignKey: "masterFranchiseId",
            as: "masterFranchise",
        });

        // Created by a user
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

OrganizationTableModel.init({
        id: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        rootUserId: {
            type: INTEGER,
            allowNull: true,
        },
        name: {
            type: STRING,
            allowNull: false,
        },
        contactPersonName: {
            type: STRING,
            allowNull: false,
        },
        contactNumber: {
            type: STRING,
            allowNull: false,
        },
        contactEmail: {
            type: STRING,
            allowNull: false,
        },
        pan: {
            type: STRING,
            allowNull: true,
        },
        gst: {
            type: STRING,
            allowNull: true,
        },
        bankName: {
            type: STRING,
            allowNull: false,
        },
        bankAccountNumber: {
            type: STRING,
            allowNull: false,
        },
        bankIFSCCode: {
            type: STRING,
            allowNull: false,
        },
        masterFranchiseId: {
            type: INTEGER,
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
        deletedBy: {
            type: INTEGER,
            allowNull: true,
        },
        billingAddressId: {
            type: INTEGER,
            allowNull: false,
        },
        businessType: {
            type: ENUM(...Object.values(BUSINESS_TYPE)),
            allowNull: false,
        },
        shippingAddressId: {
            type: ARRAY(INTEGER),
            allowNull: false,
        },
        type: {
            type: ENUM(...Object.values(ORGANIZATION_TYPE)),
            allowNull: false,
        },
        createdAt: {
            type: DATE,
            allowNull: false,
            defaultValue: NOW,
        },
        updatedAt: {
            type: DATE,
            allowNull: true,
        },
        deletedAt: {
            type: DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "organizations",
        timestamps: true,
        paranoid: true,
        comment: "Table to store organizations",
    },
);

OrganizationTableModel.associate();

export { OrganizationTableModel };
