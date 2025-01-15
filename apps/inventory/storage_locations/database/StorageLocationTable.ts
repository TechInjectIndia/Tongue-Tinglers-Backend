import { DataTypes, Model } from 'sequelize';
import { ICreateStorageLocation, IStorageLocation } from '../models/IStorageLocation';
import { STORAGE_LOCATION_STAUS, STORAGE_LOCATION_TYPE } from '../models/StorageLocationMisc';
import { sequelize } from 'config/database';


class StorageLocationTable extends Model<IStorageLocation, ICreateStorageLocation> {


    static initModel() {
        StorageLocationTable.init(
            {
                id: {
                    type: DataTypes.INTEGER,
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
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                updatedBy: {
                    type: DataTypes.INTEGER,
                },
                updatedAt: {
                    type: DataTypes.DATE,
                },
                deletedBy: {
                    type: DataTypes.INTEGER,
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
        return StorageLocationTable;
    }
}

export { StorageLocationTable };