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
                    type: DataTypes.BIGINT,
                    autoIncrement: true,
                    primaryKey: true,
                },
                rawMaterialId: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                },
                supplierId: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                },

                purchaseInvoiceId: {
                    type: DataTypes.BIGINT,
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
                    type: DataTypes.BIGINT,
                    allowNull: false,
                },
                storageLocationId: {
                    type: DataTypes.BIGINT,
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
                tableName: 'raw-material-stock-in',
                timestamps: true,
                paranoid: true,
            },
        );
        return RawMaterialStockInTable;
    }

}

export { RawMaterialStockInTable };