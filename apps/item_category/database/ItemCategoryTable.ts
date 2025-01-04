import { DataTypes, Model } from 'sequelize';
import { ICreateItemCategory, IItemCategory } from '../models/IItemCategory';
import { ITEM_CATEGORY_STAUS } from '../models/ItemCategoryMisc';
import { sequelize } from 'config';


class ItemCategoryTable extends Model<IItemCategory, ICreateItemCategory> { }

ItemCategoryTable.init(
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

        status: {
            type: DataTypes.ENUM(...Object.values(ITEM_CATEGORY_STAUS)),
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
        tableName: 'item-categories',
        timestamps: true,
        paranoid: true,
    },
);


export { ItemCategoryTable };