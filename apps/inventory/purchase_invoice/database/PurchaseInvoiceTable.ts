import { DataTypes, Model } from 'sequelize';
import { ICreatePurchaseInvoice, IPurchaseInvoice } from '../models/IPurchaseInvoice';
import { PURCHASE_INVOICE_STATUS } from '../models/PurchaseInvoiceMisc';
import { SupplierTable } from '../../supplier/database/SupplierTable';
import { sequelize } from 'config/database';


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

}
export { PurchaseInvoiceTable };