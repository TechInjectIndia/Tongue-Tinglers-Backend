import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TCategoryImage } from "../../../types";
const { INTEGER, STRING, DATE, NOW } = DataTypes;

interface OrderItemsCreationAttributes extends Optional<TCategoryImage, 'id' | 'createdAt' | 'updatedAt'> { }

class CategoryImageModel extends Model<TCategoryImage, OrderItemsCreationAttributes> implements TCategoryImage {
    public id!: number;
    public categoryId!: number;
    public fileName!: string;
    public filePath!: string;
    public originalName!: string;
    public fileSize!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

CategoryImageModel.init({
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
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
        field: "created_at",
    },
    updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
        field: "updated_at",
    },
}, {
    sequelize,
    tableName: 'category_images',
    timestamps: true,
});

export { CategoryImageModel };

