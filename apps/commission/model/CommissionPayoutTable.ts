import {DataTypes, Model, Optional, Sequelize,} from "sequelize";
import {CommissionVoucherModel} from "./CommissionVoucherTable";
import RepoProvider from "../../RepoProvider";
import {sequelize} from "../../../config";

export enum PayoutStatus {
    queued='queued',
    pending='pending', // (if you have Approval Workflow enabled)
    rejected='rejected', // (if you have Approval Workflow enabled)
    processing='processing',
    processed='processed',
    cancelled='cancelled',
    reversed='reversed',
    failed='failed',
}

export interface PayoutAttributes {
    id: number;
    voucherId: number;
    fundAccountId: string;
    amount: number;
    currency: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type PayoutCreationAttributes = Optional<PayoutAttributes, "id" | "createdAt" | "updatedAt">;

class CommissionPayoutModel extends Model<PayoutAttributes, PayoutCreationAttributes>
    implements PayoutAttributes {
    public id!: number;
    public voucherId!: number;
    public fundAccountId!: string;
    public amount!: number;
    public currency!: string;
    public status!: PayoutStatus;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static initModel() {
        this.init(
            {
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true,
                },
                voucherId: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                },
                fundAccountId: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                amount: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },
                currency: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: "INR",
                },
                status: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: "PENDING",
                },
            },
            {
                sequelize,
                tableName: "payouts",
                timestamps: true,
            }
        );
        return CommissionPayoutModel;
    }

    static associate() {
        CommissionPayoutModel.belongsTo(CommissionVoucherModel, {
            foreignKey: "voucherId",
            as: "commissionVoucher",
        });
    }

    static hook() {
        //todo test @Dhruv
        CommissionPayoutModel.addHook("afterCreate", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "create",
                "CommissionPayout",
                instance,
                options
            );
        });

        // After Update Hook - Log the updated fields of the CommissionPayout
        CommissionPayoutModel.addHook("afterUpdate", async (instance, options) => {
            // Now call logModelAction as before
            await RepoProvider.LogRepo.logModelAction(
                "update",
                "CommissionPayout",
                instance,
                options
            );
        });

        // After Destroy Hook - Log the deletion of the CommissionPayout
        CommissionPayoutModel.addHook("afterDestroy", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "delete",
                "CommissionPayout",
                instance,
                options
            );
        });
    }
}

export default CommissionPayoutModel;