// models/Region.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from "../../../config";
import { IRegion } from '../../../interfaces';
import { UserModel } from '../user/user.model';

interface RegionCreationAttributes extends Optional<IRegion, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> { }

class RegionModel extends Model<IRegion, RegionCreationAttributes> implements IRegion {
    public id!: string;
    public name!: string;
    public description?: string;
    public code?: string;
    public isActive!: boolean;

    public createdBy!: string;
    public updatedBy!: string | null;
    public deletedBy!: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;

    public static associate() {
        RegionModel.belongsTo(UserModel, { foreignKey: 'createdBy', as: 'creator', onDelete: 'SET NULL' });
        RegionModel.belongsTo(UserModel, { foreignKey: 'updatedBy', as: 'updater', onDelete: 'SET NULL' });
        RegionModel.belongsTo(UserModel, { foreignKey: 'deletedBy', as: 'deleter', onDelete: 'SET NULL' });
    }
}

RegionModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false
        },
        updatedBy: {
            type: DataTypes.STRING,
            allowNull: true
        },
        deletedBy: {
            type: DataTypes.STRING,
            allowNull: true
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
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
            field: "deleted_at",
        },
    },
    {
        sequelize,
        tableName: 'regions',
    }
);

export { RegionModel };
