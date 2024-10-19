import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { GalleryAttributes } from "../../../interfaces";

interface GalleryCreationAttributes extends Optional<GalleryAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

class GalleryModel extends Model<GalleryAttributes, GalleryCreationAttributes> implements GalleryAttributes {
    public id!: string;
    public name!: string;
    public message!: string;
    public url!: string;
    public caption!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

GalleryModel.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    caption: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: 'gallery',
    timestamps: true,
});

export { GalleryModel };
