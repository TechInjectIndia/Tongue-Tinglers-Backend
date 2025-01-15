import { DataTypes, Model } from 'sequelize';
import { ICreateRawMaterialHold, IRawMaterialHold } from '../models/IRawMaterialHold';
import { sequelize } from 'config/database';


class RawMaterialHoldTable extends Model<IRawMaterialHold, ICreateRawMaterialHold> {

    static initModel() {

        RawMaterialHoldTable.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                rawMaterialId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                totalQty: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },
                holdQty: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },
                holdReason: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                holdById: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                purchaseInvoiceId: {
                    type: DataTypes.INTEGER,
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
                tableName: 'raw-materials-holds',
                timestamps: true,
                paranoid: true,
            },
        );

        return RawMaterialHoldTable;
    }


}
export { RawMaterialHoldTable };