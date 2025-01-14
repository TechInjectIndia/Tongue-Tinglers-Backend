import { DataTypes, Model } from 'sequelize';
import { ICreateRawMaterialStockIn, IRawMaterialStockIn } from '../models/IRawMaterialStockIn';
import { RawMaterialTable } from '../../raw_material/database/RawMaterialTable';
import { SupplierTable } from '../../supplier/database/SupplierTable';
import { FactoryGateTable } from '../../factory_gates/database/FactoryGateTable';
import { StorageLocationTable } from '../../storage_locations/database/StorageLocationTable';
import { sequelize } from 'config/database';


class RawMaterialStockInTable extends Model<IRawMaterialStockIn, ICreateRawMaterialStockIn> {

    declare rawMaterial: RawMaterialTable;
    declare supplier: SupplierTable;
    declare factoryGate: FactoryGateTable;
    declare storageLocation?: StorageLocationTable;


    static initModel() {

        RawMaterialStockInTable.init(
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
                supplierId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                purchaseInvoiceId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                price: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },
                qty: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },
                factoryGateId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                storageLocationId: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
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
                tableName: 'raw-material-stock-in',
                timestamps: true,
                paranoid: true,
            },
        );
        return RawMaterialStockInTable;
    }

}

export { RawMaterialStockInTable };