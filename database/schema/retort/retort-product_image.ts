import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TRetortProductImage } from "../../../types";
const { STRING, INTEGER, DATE, NOW } = DataTypes;

interface RetortProductImagesCreationAttributes extends Optional<TRetortProductImage, 'id' | 'createdAt' | 'updatedAt'> { }

class RetortProductImagesModel extends Model<TRetortProductImage, RetortProductImagesCreationAttributes> implements TRetortProductImage {
    public id!: number;
    public productId!: number;
    public fileName!: string;
    public filePath!: string;
    public originalName!: string;
    public fileSize!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

RetortProductImagesModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    productId: {
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
    tableName: 'retort_product_images',
    timestamps: true,
});

export { RetortProductImagesModel };

