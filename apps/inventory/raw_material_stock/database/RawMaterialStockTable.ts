import { DataTypes, Model, NonAttribute } from 'sequelize';
import { IRawMaterialStock, ICreateRawMaterialStock } from '../models/IRawMaterialStock';
import { RawMaterialTable } from '../../raw_material/database/RawMaterialTable';
import { sequelize } from 'config/database';


class RawMaterialStockTable extends Model<IRawMaterialStock, ICreateRawMaterialStock> {

    declare rawMaterial: RawMaterialTable;


    static initModel() {

        RawMaterialStockTable.init(
            {
                id: {
                    type: DataTypes.BIGINT,
                    autoIncrement: true,
                    primaryKey: true,
                },
                rawMaterialId: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                },
                totalStock: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },
                assignedStock: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: true,
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
                tableName: 'raw-materials-stock',
                timestamps: true,
                paranoid: true,
            },
        );
        return RawMaterialStockTable;
    }


}

export { RawMaterialStockTable };