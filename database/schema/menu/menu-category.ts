import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TMenuCategory } from "../../../types";
import { MENU_CATEGORY_STATUS } from '../../../interfaces';

const { INTEGER, STRING, ENUM } = DataTypes;

interface SubMenuCreationAttributes extends Optional<TMenuCategory, 'id' | 'createdAt' | 'updatedAt'> { }

class MenuCategoryModel extends Model<TMenuCategory, SubMenuCreationAttributes> implements TMenuCategory {
    public id!: number;
    public name: string;
    public status!: string;
    public image!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

MenuCategoryModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: STRING,
        allowNull: false
    },
    image: {
        type: STRING,
        allowNull: true
    },
    status: {
        type: ENUM,
        values: [...Object.values(MENU_CATEGORY_STATUS)]
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
    tableName: 'menu_category',
    timestamps: true,
});

export { MenuCategoryModel };
