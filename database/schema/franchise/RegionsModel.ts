// models/Region.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from "../../../config";
import { IRegion } from '../../../interfaces';
import { UserModel } from '../user/user.model';

interface RegionCreationAttributes extends Optional<IRegion, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> { }

class RegionModel extends Model<IRegion, RegionCreationAttributes> implements IRegion {
    public id: number;
    public title: string;
    public area: number[] | null;

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
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        area: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: null
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
