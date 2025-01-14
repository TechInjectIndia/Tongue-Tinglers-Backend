import { DataTypes, Model } from 'sequelize';
import { ICreatePurchaseInvoice, IPurchaseInvoice } from '../models/IPurchaseInvoice';
import { PURCHASE_INVOICE_STATUS } from '../models/PurchaseInvoiceMisc';
import { SupplierTable } from '../../supplier/database/SupplierTable';
import { sequelize } from 'config/database';
import { RawMaterialStockInTable } from 'apps/inventory/raw_material_stock/database/RawMaterialStockInTable';
import { RawMaterialRejectionTable } from 'apps/inventory/raw_material_stock/database/RawMaterialRejectionTable';
import { RawMaterialHoldTable } from 'apps/inventory/raw_material_stock/database/RawMaterialHoldTable';
import { DebitNoteTable } from 'apps/inventory/debit_note/database/DebitNoteTable';
import { RawMaterialTable } from 'apps/inventory/raw_material/database/RawMaterialTable';


class PurchaseInvoiceTable extends Model<IPurchaseInvoice, ICreatePurchaseInvoice> {

    declare supplier: SupplierTable;


    static initModel() {

        PurchaseInvoiceTable.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                invoiceNumber: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },

                invoiceDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                poNumber: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                poDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                purchasedById: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                supplierId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                status: {
                    type: DataTypes.ENUM(...Object.values(PURCHASE_INVOICE_STATUS)),
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
                tableName: 'purchase_invoices',
                timestamps: true,
                paranoid: true,
            },
        );
        return PurchaseInvoiceTable;
    }

    public static associate() {
        SupplierTable.hasMany(PurchaseInvoiceTable, {
            foreignKey: 'supplierId',
        });
        PurchaseInvoiceTable.belongsTo(SupplierTable, {
            foreignKey: 'supplierId',
            as: "supplier",
        });


        /* association with raw material stock in */
        PurchaseInvoiceTable.hasMany(RawMaterialStockInTable, {
            foreignKey: 'purchaseInvoiceId',
        });
        RawMaterialStockInTable.belongsTo(PurchaseInvoiceTable, {
            foreignKey: 'purchaseInvoiceId',
        });

        /* association with raw material rejection */
        PurchaseInvoiceTable.hasMany(RawMaterialRejectionTable, {
            foreignKey: 'purchaseInvoiceId',
        });
        RawMaterialRejectionTable.belongsTo(PurchaseInvoiceTable, {
            foreignKey: 'purchaseInvoiceId',
        });


        /* association with raw material hold */
        PurchaseInvoiceTable.hasMany(RawMaterialHoldTable, {
            foreignKey: 'purchaseInvoiceId',
        });
        RawMaterialHoldTable.belongsTo(PurchaseInvoiceTable, {
            foreignKey: 'purchaseInvoiceId',
        });

        /* with purchase invoice */
        PurchaseInvoiceTable.hasMany(DebitNoteTable, {
            foreignKey: 'purchaseInvoiceId',
        });
        DebitNoteTable.belongsTo(PurchaseInvoiceTable, {
            foreignKey: 'purchaseInvoiceId',
            as: "purchaseInvoice",
        });

        /* with raw material */
        RawMaterialTable.hasMany(DebitNoteTable, {
            foreignKey: 'rawMaterialId',
        });
        DebitNoteTable.belongsTo(RawMaterialTable, {
            foreignKey: 'rawMaterialId',
            as: "rawMaterial",
        });
    }

}
export { PurchaseInvoiceTable };