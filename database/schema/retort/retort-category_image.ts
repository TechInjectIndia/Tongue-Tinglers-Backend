import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TRetortCategoryImage } from "../../../types";
const { INTEGER, STRING, DATE, NOW } = DataTypes;

interface RetortCategoryImageCreationAttributes extends Optional<TRetortCategoryImage, 'id' | 'createdAt' | 'updatedAt'> { }

class RetortCategoryImageModel extends Model<TRetortCategoryImage, RetortCategoryImageCreationAttributes> implements TRetortCategoryImage {
    public id!: number;
    public categoryId!: number;
    public fileName!: string;
    public filePath!: string;
    public originalName!: string;
    public fileSize!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

RetortCategoryImageModel.init({
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
    tableName: 'retort_category_images',
    timestamps: true,
});

export { RetortCategoryImageModel };

