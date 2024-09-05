import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TMenuCategoryImage } from "../../../types";
import { MENU_STATUS } from '../../../interfaces';
import { MenuModel } from './menu'

const { INTEGER, STRING, ENUM } = DataTypes;

interface SubMenuCreationAttributes extends Optional<TMenuCategoryImage, 'id' | 'createdAt' | 'updatedAt'> { }

class MenuCategoryImageModel extends Model<TMenuCategoryImage, SubMenuCreationAttributes> implements TMenuCategoryImage {
    public id!: number;
    public categoryId!: number;
    public fileName!: string;
    public filePath!: string;
    public originalName!: string;
    public fileSize!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

MenuCategoryImageModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    categoryId: {
        type: INTEGER,
        allowNull: false,
    },
    fileName: {
        type: STRING,
        allowNull: false,
    },
    filePath: {
        type: STRING,
        allowNull: false,
    },
    originalName: {
        type: STRING,
        allowNull: false,
    },
    fileSize: {
        type: INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "created_at",
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "updated_at",
    },
}, {
    sequelize,
    tableName: 'menus_category_image',
    timestamps: true,
});

MenuModel.hasMany(MenuCategoryImageModel, {
    foreignKey: "menu_id",
});
MenuCategoryImageModel.belongsTo(MenuModel, {
    foreignKey: "menu_id",
});

export { MenuCategoryImageModel };
