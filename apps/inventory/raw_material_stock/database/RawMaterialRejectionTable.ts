import { DataTypes, Model } from 'sequelize';
import { ICreateRawMaterialRejection, IRawMaterialRejection } from '../models/IRawMaterialRejection';
import { sequelize } from 'config/database';


class RawMaterialRejectionTable extends Model<IRawMaterialRejection, ICreateRawMaterialRejection> {

    static initModel() {
        RawMaterialRejectionTable.init(
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
                rejectedQty: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },
                rejectionReason: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                rejectedById: {
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
                tableName: 'raw-materials-rejections',
                timestamps: true,
                paranoid: true,
            },
        );
        return RawMaterialRejectionTable;
    }


}

export { RawMaterialRejectionTable };