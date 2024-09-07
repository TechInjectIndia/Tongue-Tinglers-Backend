import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TMenuProduct } from "../../../types";
import { MenuCategoryModel } from './menu-category'

const { INTEGER, STRING, TEXT, ENUM, BOOLEAN } = DataTypes;

interface MenuProductsCreationAttributes extends Optional<TMenuProduct, 'id' | 'createdAt' | 'updatedAt'> { }

class MenuProductsModel extends Model<TMenuProduct, MenuProductsCreationAttributes> implements TMenuProduct {
    public id!: number;
    public name!: string;
    public categoryId: number;
    public slug!: string;
    public description!: string;
    public images!: string;
    public price!: number;
    public active!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

MenuProductsModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    categoryId: {
        type: INTEGER,
        allowNull: true
    },
    name: {
        type: STRING,
        allowNull: false,
    },
    slug: {
        type: STRING,
        allowNull: false,
    },
    images: {
        type: TEXT,
    },
    description: {
        type: TEXT,
    },
    price: {
        type: INTEGER,
        allowNull: false,
    },
    active: {
        type: STRING,
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
    tableName: 'menu_products',
    timestamps: true,
});

export { MenuProductsModel };
