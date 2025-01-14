import { DataTypes, Model } from 'sequelize';
import { IRawMaterial, ICreateRawMaterial } from '../models/IRawMaterial';
import { RAW_MATERIAL_STAUS } from '../models/RawMaterialMisc';
import { ItemUnitTable } from '../../item_unit/database/ItemUnitTable';
import { ItemCategoryTable } from '../../item_category/database/ItemCategoryTable';
import { RawMaterialPriceTable } from './RawMaterialPriceTable';
import { sequelize } from 'config/database';


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


}
export { RawMaterialTable };