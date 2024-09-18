import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { IItemStockAttributes } from '../../../interfaces';
import { UserModel } from '../user/user.model'

// Define the ItemStock creation attributes interface
interface ItemStockCreationAttributes extends Optional<IItemStockAttributes, 'recorded_at'> { }

// Create the ItemStock model class
class ItemStockModel extends Model<IItemStockAttributes, ItemStockCreationAttributes> implements IItemStockAttributes {
    public user_id!: string;
    public startStock!: number;
    public endStock!: number;
    public readonly recorded_at!: Date;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ItemStockModel.init({
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    endStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    recorded_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    sequelize,
    tableName: 'item_stocks',
    timestamps: true
});

// Define associations
UserModel.hasMany(ItemStockModel, {
    foreignKey: 'user_id',
    as: 'itemStocks' // Optional: provides an alias for the association
});

ItemStockModel.belongsTo(UserModel, {
    foreignKey: 'user_id',
    as: 'franchise' // Optional: provides an alias for the association
});

export { ItemStockModel };