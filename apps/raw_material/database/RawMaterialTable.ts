import { DataTypes, Model } from 'sequelize';
import { IRawMaterial, ICreateRawMaterial } from '../models/IRawMaterial';
import { RAW_MATERIAL_STAUS } from '../models/RawMaterialMisc';
import { sequelize } from 'config';


class RawMaterialTable extends Model<IRawMaterial, ICreateRawMaterial> {
}

RawMaterialTable.init(
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
        categoryId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        unitId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        msq: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sku: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        status: {
            type: DataTypes.ENUM(...Object.values(RAW_MATERIAL_STAUS)),
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
        tableName: 'raw-materials',
        timestamps: true,
        paranoid: true,
    },
);


export { RawMaterialTable };