import { DataTypes, Model } from 'sequelize';
import { ICreateRawMaterialPrice, IRawMaterialPrice } from '../models/IRawMaterial';
import { sequelize } from 'config';


class RawMaterialPriceTable extends Model<IRawMaterialPrice,ICreateRawMaterialPrice> { }

RawMaterialPriceTable.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        price: {
            type: DataTypes.DOUBLE(10, 2),
            allowNull: false,
        },
        moq: {
            type: DataTypes.DOUBLE(10, 2),
            allowNull: false,
        },
        supplierId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        rawMaterialId: {
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
        tableName: 'raw-materials-prices',
        timestamps: true,
        paranoid: true,
    },
);


export { RawMaterialPriceTable };