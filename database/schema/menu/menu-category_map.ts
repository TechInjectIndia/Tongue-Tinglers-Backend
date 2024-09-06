import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TMenuCategoryRelation } from "../../../types";
import { MENU_STATUS } from '../../../interfaces';
import { MenuModel } from './menu'

const { INTEGER, STRING, ENUM } = DataTypes;

interface SubMenuCreationAttributes extends Optional<TMenuCategoryRelation, 'id' | 'createdAt' | 'updatedAt'> { }

class MenuCategoryMapModel extends Model<TMenuCategoryRelation, SubMenuCreationAttributes> implements TMenuCategoryRelation {
    public id!: number;
    public menuId: number;
    public categoryId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

MenuCategoryMapModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    menuId: {
        type: INTEGER,
        allowNull: false
    },
    categoryId: {
        type: INTEGER,
        allowNull: false
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
    tableName: 'menu_category_map',
    timestamps: true,
});

export { MenuCategoryMapModel };
