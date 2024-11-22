// models/VendorModel.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../../config";
import { IVendorAttributes } from "../../../interfaces";

interface IVendorCreationAttributes extends Optional<IVendorAttributes, 'id'> { }

class VendorModel extends Model<IVendorAttributes, IVendorCreationAttributes> implements IVendorAttributes {
    public id!: number;
    public company_name!: string;
    public gst_number!: string;
    public company_address!: string;
    public company_email!: string;
    public company_phone!: string;
    public first_name!: string;
    public last_name!: string;
    public email!: string;
    public phone!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
        // Define associations here if needed
    }
}

VendorModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true, 
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gst_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company_address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        company_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company_phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        sequelize,
        tableName: 'vendors',
        timestamps: true,
    }
);

export { VendorModel };
