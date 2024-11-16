// models/Area.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../../../config";

class RegionArea extends Model {}


RegionArea.init(
    {
        regionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'regions',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        areaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'areas',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
    },
    {
        sequelize,
        tableName: 'RegionArea',
        timestamps: false, // No createdAt or updatedAt
        indexes: [
            {
                unique: true,
                fields: ['regionId', 'areaId'],
            },
        ],
    }
);
