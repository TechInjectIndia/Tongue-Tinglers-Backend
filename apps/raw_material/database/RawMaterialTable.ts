import { DataTypes, Model } from 'sequelize';
import { IRawMaterial, ICreateRawMaterial } from '../models/IRawMaterial';
import { RAW_MATERIAL_STAUS } from '../models/RawMaterialMisc';
import { sequelize } from 'config';
import { ItemUnitTable } from 'apps/item_unit/database/ItemUnitTable';
import { ItemCategoryTable } from 'apps/item_category/database/ItemCategoryTable';
import { RawMaterialPriceTable } from './RawMaterialPriceTable';
import { SupplierTable } from 'apps/supplier/database/SupplierTable';


class RawMaterialModal extends Model<IRawMaterial, ICreateRawMaterial> {


    public static initModel() {

        RawMaterialModal.init(
            {
                id: {
                    type: DataTypes.BIGINT,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                categoryId: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                },
                unitId: {
                    type: DataTypes.BIGINT,
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

                status: {
                    type: DataTypes.ENUM(...Object.values(RAW_MATERIAL_STAUS)),
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
                tableName: 'raw-materials',
                timestamps: true,
                paranoid: true,
            },
        );
    }

    public static associate() {
        /* association with ItemUnit */

        ItemUnitTable.hasMany(this, {
            foreignKey: 'unitId',
        });


        this.belongsTo(ItemUnitTable, {
            foreignKey: 'unitId',
        });


        /* association with Item Category */
        ItemCategoryTable.hasMany(this, {
            foreignKey: 'categoryId',
        });

        this.belongsTo(ItemCategoryTable, {
            foreignKey: 'categoryId',
        });

        /* association with Price */
        this.hasMany(RawMaterialPriceTable, {
            foreignKey: 'rawMaterialId',
        });
        RawMaterialPriceTable.belongsTo(this, {
            foreignKey: 'rawMaterialId',
        });

        SupplierTable.hasMany(RawMaterialPriceTable, {
            foreignKey: 'supplierId',
        });
        RawMaterialPriceTable.belongsTo(SupplierTable, {
            foreignKey: 'supplierId',
        });
    }
}


export { RawMaterialModal };