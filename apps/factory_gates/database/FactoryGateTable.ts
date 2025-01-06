import { DataTypes, Model } from 'sequelize';
import { ICreateFactoryGate, IFactoryGate } from '../models/IFactoryGate';
import { FACTORY_GATE_STAUS } from '../models/FactoryGateMisc';
import { sequelize } from 'config';


class FactoryGateTable extends Model<IFactoryGate, ICreateFactoryGate> { }

FactoryGateTable.init(
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

        status: {
            type: DataTypes.ENUM(...Object.values(FACTORY_GATE_STAUS)),
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
        tableName: 'factory_gates',
        timestamps: true,
        paranoid: true,
    },
);

export { FactoryGateTable };