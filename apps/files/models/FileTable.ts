import { DataTypes, Model, Optional } from "sequelize";
import { FileAttributes } from "../interface/Files";
import { sequelize } from "config";


interface FileCreationAttributes extends Optional<FileAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

class FileModel extends Model<FileAttributes, FileCreationAttributes> implements FileAttributes {
    public id!: number;
    public name!: string;
    public message!: string;
    public subject!: string;
    public url!: string[];
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
    subject: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    recommended: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    url: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
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
