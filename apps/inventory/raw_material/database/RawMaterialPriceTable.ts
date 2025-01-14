import { DataTypes, Model } from 'sequelize';
import { ICreateRawMaterialPrice, IRawMaterialPrice } from '../models/IRawMaterial';
import { sequelize } from 'config/database';
import { SupplierTable } from 'apps/inventory/supplier/database/SupplierTable';


class RawMaterialPriceTable extends Model<IRawMaterialPrice, ICreateRawMaterialPrice> {
    declare supplier: SupplierTable;



    static initModel() {
        RawMaterialPriceTable.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                price: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },
                moq: {
                    type: DataTypes.DOUBLE(10, 2),
                    allowNull: false,
                },
                supplierId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                rawMaterialId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                createdBy: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                updatedBy: {
                    type: DataTypes.INTEGER,
                },
                updatedAt: {
                    type: DataTypes.DATE,
                },
                deletedBy: {
                    type: DataTypes.INTEGER,
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
        return RawMaterialPriceTable;
    }

}

export { RawMaterialPriceTable };