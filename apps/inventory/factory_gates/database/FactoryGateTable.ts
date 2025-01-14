import { DataTypes, Model } from 'sequelize';
import { ICreateFactoryGate, IFactoryGate } from '../models/IFactoryGate';
import { FACTORY_GATE_STAUS } from '../models/FactoryGateMisc';
import { sequelize } from 'config/database';


class FactoryGateTable extends Model<IFactoryGate, ICreateFactoryGate> {


    static initModel() {
        FactoryGateTable.init(
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

                status: {
                    type: DataTypes.ENUM(...Object.values(FACTORY_GATE_STAUS)),
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
                tableName: 'factory_gates',
                timestamps: true,
                paranoid: true,
            },
        );
        return FactoryGateTable;
    }

}
export { FactoryGateTable };