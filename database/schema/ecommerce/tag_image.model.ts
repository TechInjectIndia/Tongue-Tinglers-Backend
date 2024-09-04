import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TTagImage } from "../../../types";
const { INTEGER, STRING, DATE, NOW } = DataTypes;

interface OrderItemsCreationAttributes extends Optional<TTagImage, 'id' | 'createdAt' | 'updatedAt'> { }

class TagImageModel extends Model<TTagImage, OrderItemsCreationAttributes> implements TTagImage {
    public id!: number;
    public tagId!: number;
    public fileName!: string;
    public filePath!: string;
    public originalName!: string;
    public fileSize!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

TagImageModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    tagId: {
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
    tableName: 'tag_images',
    timestamps: true,
});

export { TagImageModel };

