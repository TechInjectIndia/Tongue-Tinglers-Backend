import {DataTypes, Model, Optional, Sequelize,} from "sequelize";
import {CommissionVoucherModel} from "./CommissionVoucherTable";

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

class Payout extends Model<PayoutAttributes, PayoutCreationAttributes>
    implements PayoutAttributes {
    public id!: number;
    public voucherId!: number;
    public fundAccountId!: string;
    public amount!: number;
    public currency!: string;
    public status!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static initialize(sequelize: Sequelize) {
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
    }

    static associate() {
        Payout.belongsTo(CommissionVoucherModel, {
            foreignKey: "voucherId",
            as: "commissionVoucher",
        });
    }
}

export default Payout;
