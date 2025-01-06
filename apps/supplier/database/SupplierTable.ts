import { DataTypes, Model } from 'sequelize';
import { ISupplier, ICreateSupplier } from '../models/ISupplier';
import { SUPPLIER_STAUS } from '../models/SupplierMisc';
import { sequelize } from 'config';


class SupplierTable extends Model<ISupplier, ICreateSupplier> { }

SupplierTable.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(SUPPLIER_STAUS)),
            allowNull: false,
        },

        createdBy: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedBy: {
            type: DataTypes.BIGINT,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
        deletedBy: {
            type: DataTypes.BIGINT,
        },
        deletedAt: {
            type: DataTypes.DATE,
        }
    },
    {
        sequelize: sequelize,
        tableName: 'suppliers',
        timestamps: true,
        paranoid: true,
    },
);

export { SupplierTable };