import { DataTypes, Model } from 'sequelize';
import { ICreateItemUnit, IItemUnit } from '../models/IItemUnit';
import { ITEM_UNIT_STAUS } from '../models/ItemUnitMisc';
import { sequelize } from 'config';

class ItemUnitModel extends Model<IItemUnit, ICreateItemUnit> {

    static initModel() {

        ItemUnitModel.init(
            {
                id: {
                    type: DataTypes.BIGINT,
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
                tableName: 'item-units',
                timestamps: true,
                paranoid: true,
            },
        );
    }
}

export { ItemUnitModel };