import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";

interface FileAttributes {
    id: string;
    name: string;
    url: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface FileCreationAttributes extends Optional<FileAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

class FileModel extends Model<FileAttributes, FileCreationAttributes> implements FileAttributes {
    public id!: string;
    public name!: string;
    public url!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

FileModel.init({
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
    url: {
        type: DataTypes.TEXT,
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
    tableName: 'files',
    timestamps: true,
});

export { FileModel };
