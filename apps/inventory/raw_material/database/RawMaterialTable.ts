import { DataTypes, Model } from 'sequelize';
import { IRawMaterial, ICreateRawMaterial } from '../models/IRawMaterial';
import { RAW_MATERIAL_STAUS } from '../models/RawMaterialMisc';
import { ItemUnitTable } from '../../item_unit/database/ItemUnitTable';
import { ItemCategoryTable } from '../../item_category/database/ItemCategoryTable';
import { RawMaterialPriceTable } from './RawMaterialPriceTable';
import { sequelize } from 'config/database';
import { SupplierTable } from 'apps/inventory/supplier/database/SupplierTable';
import { RawMaterialRejectionTable } from 'apps/inventory/raw_material_stock/database/RawMaterialRejectionTable';
import { RawMaterialHoldTable } from 'apps/inventory/raw_material_stock/database/RawMaterialHoldTable';
import { RawMaterialStockInTable } from 'apps/inventory/raw_material_stock/database/RawMaterialStockInTable';
import { StorageLocationTable } from 'apps/inventory/storage_locations/database/StorageLocationTable';
import { FactoryGateTable } from 'apps/inventory/factory_gates/database/FactoryGateTable';
import { RawMaterialStockTable } from 'apps/inventory/raw_material_stock/database/RawMaterialStockTable';


class RawMaterialTable extends Model<IRawMaterial, ICreateRawMaterial> {
    declare unit: ItemUnitTable;
    declare category: ItemCategoryTable;
    declare prices: RawMaterialPriceTable[];

    static initModel() {
        RawMaterialTable.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                categoryId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                unitId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                msq: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                sku: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },

                hsn: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },

                gstPercentage: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },


                status: {
                    type: DataTypes.ENUM(...Object.values(RAW_MATERIAL_STAUS)),
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
                tableName: 'raw-materials',
                timestamps: true,
                paranoid: true,
            },
        );
        return RawMaterialTable;
    }

    public static associate() {
        /* association with ItemUnit */

        ItemUnitTable.hasMany(RawMaterialTable, {
            foreignKey: 'unitId',
            as: "unit",
        });


        RawMaterialTable.belongsTo(ItemUnitTable, {
            foreignKey: 'unitId',
            as: "unit",
        });


        /* association with Item Category */
        ItemCategoryTable.hasMany(RawMaterialTable, {
            foreignKey: 'categoryId',
            as: "category",
        });

        RawMaterialTable.belongsTo(ItemCategoryTable, {
            foreignKey: 'categoryId',
            as: "category",
        });

        /* association with Price */
        RawMaterialTable.hasMany(RawMaterialPriceTable, {
            foreignKey: 'rawMaterialId',
            as: "prices",
        });
        RawMaterialPriceTable.belongsTo(RawMaterialTable, {
            foreignKey: 'rawMaterialId',
            as: "prices",
        });

        SupplierTable.hasMany(RawMaterialPriceTable, {
            foreignKey: 'supplierId',
        });
        RawMaterialPriceTable.belongsTo(SupplierTable, {
            foreignKey: 'supplierId',
            as: "supplier",
        });


        /* association with raw material rejection */
        RawMaterialTable.hasMany(RawMaterialRejectionTable, {
            foreignKey: 'rawMaterialId',
        });
        RawMaterialRejectionTable.belongsTo(RawMaterialTable, {
            foreignKey: 'rawMaterialId',
        });

        /* association with raw material holds */

        RawMaterialTable.hasMany(RawMaterialHoldTable, {
            foreignKey: 'rawMaterialId',
        });
        RawMaterialHoldTable.belongsTo(RawMaterialTable, {
            foreignKey: 'rawMaterialId',
        });

        SupplierTable.hasMany(RawMaterialStockInTable, {
            foreignKey: 'supplierId',
        });
        RawMaterialStockInTable.belongsTo(SupplierTable, {
            foreignKey: 'supplierId',
            as: "supplier",
        });


        StorageLocationTable.hasMany(RawMaterialStockInTable, {
            foreignKey: 'storageLocationId',
            as: "storageLocation",
        });
        RawMaterialStockInTable.belongsTo(StorageLocationTable, {
            foreignKey: 'storageLocationId',
            as: "storageLocation",
        });


        FactoryGateTable.hasMany(RawMaterialStockInTable, {
            foreignKey: 'factoryGateId',
        });
        RawMaterialStockInTable.belongsTo(FactoryGateTable, {
            foreignKey: 'factoryGateId',
            as: "factoryGate",
        });

        RawMaterialTable.hasMany(RawMaterialStockInTable, {
            foreignKey: 'rawMaterialId',
        });
        RawMaterialStockInTable.belongsTo(RawMaterialTable, {
            foreignKey: 'rawMaterialId',
            as: "rawMaterial",
        });


        RawMaterialTable.hasMany(RawMaterialStockTable, {
            foreignKey: 'rawMaterialId',
        });

        RawMaterialStockTable.belongsTo(RawMaterialTable,
            {
                foreignKey: 'rawMaterialId',
                as: "rawMaterial",

            }
        );
    }


}
export { RawMaterialTable };