import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";


import {IItemStockAttributes} from "../interfaces/PetPooja";
import {UserModel} from "../../user/models/UserTable";
import RepoProvider from "../../RepoProvider";

// Define the ItemStock creation attributes interface
interface ItemStockCreationAttributes extends Optional<IItemStockAttributes, 'recorded_at'> { }

// Create the ItemStock model class
class ItemStockModel extends Model<IItemStockAttributes, ItemStockCreationAttributes> implements IItemStockAttributes {
    public user_id!: number;
    public startStock!: number;
    public endStock!: number;
    public readonly recorded_at!: Date;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static initModel() {
        ItemStockModel.init({
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
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

        return ItemStockModel
    }

    public static hook(){
        ItemStockModel.addHook("afterCreate", async (instance, options) => {
                    await RepoProvider.LogRepo.logModelAction(
                        "create",
                        "Items Stock",
                        instance,
                        options
                    );
                });

                // After Update Hook - Log the updated fields of the Leads
                ItemStockModel.addHook("afterUpdate", async (instance, options) => {
                    // Now call logModelAction as before
                    await RepoProvider.LogRepo.logModelAction(
                        "update",
                        "Items Stock",
                        instance,
                        options
                    );
                });

                // After Destroy Hook - Log the deletion of the Leads
                ItemStockModel.addHook("afterDestroy", async (instance, options) => {
                    await RepoProvider.LogRepo.logModelAction(
                        "delete",
                        "Items Stock",
                        instance,
                        options
                    );
                });
    }
}


export { ItemStockModel };
