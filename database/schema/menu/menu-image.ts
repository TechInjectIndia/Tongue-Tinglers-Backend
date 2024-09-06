import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TMenuImage } from "../../../types";
import { MenuModel } from './menu'

const { INTEGER, STRING, ENUM } = DataTypes;

interface SubMenuCreationAttributes extends Optional<TMenuImage, 'id' | 'createdAt' | 'updatedAt'> { }

class MenuImageModel extends Model<TMenuImage, SubMenuCreationAttributes> implements TMenuImage {
    public id!: number;
    public menuId!: number;
    public fileName!: string;
    public filePath!: string;
    public originalName!: string;
    public fileSize!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

MenuImageModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    menuId: {
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
    tableName: 'menu_image',
    timestamps: true,
});

export { MenuImageModel };
