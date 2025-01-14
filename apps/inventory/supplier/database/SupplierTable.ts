import { DataTypes, Model } from 'sequelize';
import { ICreateSupplier, ISupplier, } from '../models/ISupplier';
import { SUPPLIER_STAUS } from '../models/SupplierMisc';
import { sequelize } from 'config/database';
import { AddressModel } from 'apps/address/models/AddressTable';


class SupplierTable extends Model<ISupplier, ICreateSupplier> {

    declare address: AddressModel;


    public static initModel() {
        SupplierTable.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    unique: true,
                },
                phone: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                gst: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    unique: true,
                },
                pan: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    unique: true,
                },
                addressId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                status: {
                    type: DataTypes.ENUM(...Object.values(SUPPLIER_STAUS)),
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
                tableName: 'suppliers',
                timestamps: true,
                paranoid: true,
            },
        );
        return SupplierTable;
    }

    public static associate() {
        /* association with Address */
        AddressModel.hasMany(SupplierTable, {
            foreignKey: 'addressId',
        });
        SupplierTable.belongsTo(AddressModel, {
            foreignKey: 'addressId',
            as: "address",
        });
    }

}
export { SupplierTable };