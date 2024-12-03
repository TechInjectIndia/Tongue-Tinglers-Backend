import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { FileAttributes } from "../../../interfaces";

interface FileCreationAttributes extends Optional<FileAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

class FileModel extends Model<FileAttributes, FileCreationAttributes> implements FileAttributes {
    public id!: number;
    public name!: string;
    public message!: string;
    public url!: string;
    public recommended!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

FileModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, 
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    recommended: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: true,
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
    tableName: 'files',
    timestamps: true,
});

export { FileModel };
