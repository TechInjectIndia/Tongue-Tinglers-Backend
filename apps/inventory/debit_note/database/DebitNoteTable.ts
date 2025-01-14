import { DataTypes, Model } from 'sequelize';
import { ICreateDebitNote, IDebitNote } from '../models/IDebitNote';
import { DEBIT_NOTE_STATUS } from '../models/DebitNoteMisc';
import { PurchaseInvoiceTable } from '../../purchase_invoice/database/PurchaseInvoiceTable';
import { RawMaterialTable } from '../../raw_material/database/RawMaterialTable';
import { sequelize } from 'config/database';


class DebitNoteTable extends Model<IDebitNote, ICreateDebitNote> {

    declare purchaseInvoice: PurchaseInvoiceTable;
    declare rawMaterial: RawMaterialTable;


    static initModel() {
        DebitNoteTable.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },

                purchaseInvoiceId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                qty: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },

                rawMaterialId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                actualPrice: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },

                purchasedPrice: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },

                note: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },

                status: {
                    type: DataTypes.ENUM(...Object.values(DEBIT_NOTE_STATUS)),
                    allowNull: false,
                    defaultValue: DEBIT_NOTE_STATUS.UNPAID,
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
                tableName: 'debit-notes',
                timestamps: true,
                paranoid: true,
            },
        );
        return DebitNoteTable;
    }

}
export { DebitNoteTable };