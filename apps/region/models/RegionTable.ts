// models/Region.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../../config";
import { IRegion } from './Region';
import { AreaModel } from 'apps/area/models/AreaTable';
import { UserModel } from 'apps/user/models/UserTable';

interface RegionCreationAttributes
    extends Optional<IRegion, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
}

class RegionModel extends Model<IRegion, RegionCreationAttributes>
    implements IRegion {
    public id: number;
    public title: string;
    public area: number[] | null;

    public createdBy!: number;
    public updatedBy!: number | null;
    public deletedBy!: number | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;

    public addAreas!: (areas: Array<AreaModel | number>) => Promise<void>;

    public static initModel() {
        RegionModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
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
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                updatedBy: {
                    type: DataTypes.INTEGER,
                    allowNull: true
                },
                deletedBy: {
                    type: DataTypes.INTEGER,
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
        return RegionModel;
    }

    public static associate() {
        RegionModel.belongsTo(UserModel,
            { foreignKey: 'createdBy', as: 'creator', onDelete: 'SET NULL' });
        RegionModel.belongsTo(UserModel,
            { foreignKey: 'updatedBy', as: 'updater', onDelete: 'SET NULL' });
        RegionModel.belongsTo(UserModel,
            { foreignKey: 'deletedBy', as: 'deleter', onDelete: 'SET NULL' });

        RegionModel.belongsToMany(AreaModel, {
            through: "region_area", // Join table name
            foreignKey: "regionId",
            otherKey: "areaId",
            as: "areas",
        });
    }


}


export { RegionModel };
