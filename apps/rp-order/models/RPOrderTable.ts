import { RP_ORDER_STATUS, RPOrder } from "apps/order/interface/Order";
import RepoProvider from "apps/RepoProvider";
import { sequelize } from "config/database";
import { DataTypes, Model, Optional } from "sequelize";

interface OrderCreationAttributes extends Optional<RPOrder, "id"> {}

class RPOrderTable extends Model<RPOrder, OrderCreationAttributes> implements RPOrder {
    id: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    offer_id: string|null;
    status: RP_ORDER_STATUS;
    attempts: number;
    notes: string[];
    created_at: Date;

    public static associate() {}

    public static initModel() {
    
        RPOrderTable.init({
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            amount_paid: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            amount_due: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            currency: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            receipt: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            offer_id: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            attempts: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            notes: {
                type: DataTypes.ARRAY(DataTypes.JSONB),
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: DataTypes.NOW,
                field: "created_at",
            },
        }, {
            sequelize,
            tableName: "rp-order",
            timestamps: true,
            paranoid: true,
            underscored: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: "deleted_at",
        });
        return RPOrderTable;
    }

    public static hook() {
        // RPOrderTable.addHook("afterCreate", async (instance, options) => {
        //     await RepoProvider.LogRepo.logModelAction("create", "RPOrder", instance, options);
        // });

        // // After Update Hook - Log the updated fields of the Order
        // RPOrderTable.addHook("afterUpdate", async (instance, options) => {
        //     // Now call logModelAction as before
        //     await RepoProvider.LogRepo.logModelAction("update", "RPOrder", instance, options);
        // });

        // // After Destroy Hook - Log the deletion of the Order
        // RPOrderTable.addHook("afterDestroy", async (instance, options) => {
        //     await RepoProvider.LogRepo.logModelAction("delete", "Order", instance, options);
        // });
    }
}

export { RPOrderTable };
