import { DataTypes, Model } from 'sequelize';
import { ICreateStorageLocation, IStorageLocation } from '../models/IStorageLocation';
import { STORAGE_LOCATION_STAUS, STORAGE_LOCATION_TYPE } from '../models/StorageLocationMisc';
import { sequelize } from 'config';


class StorageLocationTable extends Model<IStorageLocation, ICreateStorageLocation> { }

StorageLocationTable.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        type: {
            type: DataTypes.ENUM(...Object.values(STORAGE_LOCATION_TYPE)),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(STORAGE_LOCATION_STAUS)),
            allowNull: false,
        },

        createdBy: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedBy: {
            type: DataTypes.BIGINT,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
        deletedBy: {
            type: DataTypes.BIGINT,
        },
        deletedAt: {
            type: DataTypes.DATE,
        }
    },
    {
        sequelize: sequelize,
        tableName: 'storage_locations',
        timestamps: true,
        paranoid: true,
    },
);

export { StorageLocationTable };