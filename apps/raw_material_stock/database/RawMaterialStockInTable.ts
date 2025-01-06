import { DataTypes, Model } from 'sequelize';
import { IRawMaterialStockIn } from '../models/IRawMaterialStockIn';
import { sequelize } from 'config';


class RawMaterialStockInTable extends Model<IRawMaterialStockIn> { }

RawMaterialStockInTable.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        rawMaterialId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        supplierId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        unitCost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        qty: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        factoryGateId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        storageLocationId: {
            type: DataTypes.BIGINT,
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
        tableName: 'raw-material-stock-in',
        timestamps: true,
        paranoid: true,
    },
);


export { RawMaterialStockInTable };