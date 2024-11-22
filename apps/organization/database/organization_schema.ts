import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { IOrganization } from "../../../interfaces/organization";
import { AddressModel } from "../../../database/schema";

const { STRING, INTEGER, DATE, NOW, } = DataTypes;

interface OrganizationCreationAttributes extends Optional<IOrganization, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> { }

class OrganizationTableModel extends Model<IOrganization, OrganizationCreationAttributes> implements IOrganization {
    public id!: number;
    public prospectId: number;
    public name: string;
    public contactPersonName: string;
    public contactNumber: string;
    public contactEmail: string;
    /* Address is separate a table  */
    public addressId: number;
    public pan: string | null;
    public gst: string | null;
    public bankName: string;
    public bankAccountNumber: string;
    public bankIFSCCode: string;
    public masterFranchiseId: number | null;

    public createdBy!: number;
    public updatedBy!: number | null;
    public deletedBy!: number | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;

    public static associate() {
        this.belongsTo(AddressModel, { foreignKey: 'addressId', as: 'address', });
    }
}

OrganizationTableModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    prospectId: {
        type: INTEGER,
        allowNull: false,
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

    addressId: {
        type: INTEGER,
        references: {
            model: AddressModel,
            key: 'id',
        },
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
        type: STRING,
        allowNull: true,
    },

    createdBy: {
        type: INTEGER,
        allowNull: false,
        comment: 'User who created the campaign',
    },
    updatedBy: {
        type: INTEGER,
        allowNull: true,
        comment: 'User who last updated the campaign',
    },
    deletedBy: {
        type: INTEGER,
        allowNull: true,
        comment: 'User who deleted the campaign (if soft deleted)',
    },
    createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
        comment: 'Timestamp when the campaign was created',
    },
    updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
        comment: 'Timestamp when the campaign was last updated',
    },
    deletedAt: {
        type: DATE,
        allowNull: true,
        comment: 'Timestamp when the campaign was deleted (if soft deleted)',
    },
}, {
    sequelize,
    tableName: 'organizations',
    timestamps: true,
    paranoid: true,
    comment: 'Table to store organizations',
});

OrganizationTableModel.associate();

export { OrganizationTableModel };
