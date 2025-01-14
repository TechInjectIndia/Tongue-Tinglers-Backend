import { DataTypes, Model } from 'sequelize';
import { ICreateItemUnit, IItemUnit } from '../models/IItemUnit';
import { ITEM_UNIT_STAUS } from '../models/ItemUnitMisc';
import { sequelize } from 'config/database';


class ItemUnitTable extends Model<IItemUnit, ICreateItemUnit> {


    static initModel() {

        ItemUnitTable.init(
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

                status: {
                    type: DataTypes.ENUM(...Object.values(ITEM_UNIT_STAUS)),
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
                tableName: 'item-units',
                timestamps: true,
                paranoid: true,
            },
        );
        return ItemUnitTable;
    }

}
export { ItemUnitTable };