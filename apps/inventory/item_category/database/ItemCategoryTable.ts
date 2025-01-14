import { DataTypes, Model } from 'sequelize';
import { ICreateItemCategory, IItemCategory } from '../models/IItemCategory';
import { ITEM_CATEGORY_STAUS } from '../models/ItemCategoryMisc';
import { sequelize } from 'config/database';


class ItemCategoryTable extends Model<IItemCategory, ICreateItemCategory> {


    static initModel() {

        ItemCategoryTable.init(
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

                status: {
                    type: DataTypes.ENUM(...Object.values(ITEM_CATEGORY_STAUS)),
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
                tableName: 'item-categories',
                timestamps: true,
                paranoid: true,
            },
        );

        return ItemCategoryTable;
    }

}
export { ItemCategoryTable };