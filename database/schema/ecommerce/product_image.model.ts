import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TProductImage } from "../../../types";
import { BOOLEAN } from "sequelize";
const { STRING, INTEGER, TEXT, DATE, NOW } = DataTypes;

interface OrderItemsCreationAttributes extends Optional<TProductImage, 'id' | 'createdAt' | 'updatedAt'> { }

class ProductImagesModel extends Model<TProductImage, OrderItemsCreationAttributes> implements TProductImage {
    public id!: number;
    public productId!: number;
    public fileName!: string;
    public filePath!: string;
    public originalName!: string;
    public caption!: string;
    public fileSize!: number;
    public isMainImage!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProductImagesModel.init({
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
        allowNull: true,
    },
    filePath: {
        type: TEXT,
        allowNull: true,
    },
    originalName: {
        type: STRING,
        allowNull: true,
    },
    caption: {
        type: STRING,
        allowNull: true,
    },
    fileSize: {
        type: INTEGER,
        allowNull: true,
    },
    isMainImage: {
        type: BOOLEAN,
        allowNull: true,
        defaultValue: false,
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
    tableName: 'product_images',
    timestamps: true,
});

export { ProductImagesModel };

