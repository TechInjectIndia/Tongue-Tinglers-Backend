import { DataTypes, DECIMAL, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { BaseMeta } from "apps/common/models/Base";
// import {
//     // COMMISSION_PAID_STATUS,
//     // COMMISSION_VOUCHER_ENTITIES,
//     CommissionEntityMappingModel,
// } from "./CommissionEntityMappingTable";
import { ParsedCommissionEntityMapping } from "../interface/Commission";
import { OrderModel } from "apps/order/models/OrderTable";
import { FranchiseModel } from "apps/franchise/models/FranchiseTable";
import {
    COMMISSION_PAID_STATUS,
    COMMISSION_VOUCHER_ENTITIES,
} from "../interface/CommissionEntityMapping";

const { STRING, INTEGER, DATE, NOW } = DataTypes;

// Define the creation attributes by making certain fields optional
type CommissionVoucherCreationAttributes = Optional<
    ICommissionVoucher,
    "id" | "createdAt" | "updatedAt" | "deletedAt" | "deletedBy" | "updatedBy"
>;

class CommissionVoucherModel
    extends Model<ICommissionVoucher, CommissionVoucherCreationAttributes>
    implements ICommissionVoucher
{
    public id: number;

    public relationId: number;
    public entityId: number;
    public entityType: COMMISSION_VOUCHER_ENTITIES;
    public status: COMMISSION_PAID_STATUS;
    public value: number;

    public createdBy: number;
    public updatedBy: number | null;
    public deletedBy: number | null;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly deletedAt: Date | null;

    public static associate() {
        CommissionVoucherModel.belongsTo(OrderModel, {
            foreignKey: "entityId",
            as: "order",
            constraints: false,
        });
        CommissionVoucherModel.belongsTo(FranchiseModel, {
            foreignKey: "entityId",
            as: "franchise",
            constraints: false,
        });

        OrderModel.hasMany(CommissionVoucherModel, {
            foreignKey: "entityId",
            constraints: false,
        });
        FranchiseModel.hasMany(CommissionVoucherModel, {
            foreignKey: "entityId",
            constraints: false,
        });

        CommissionVoucherModel.belongsTo(CommissionEntityMappingModel, {
            foreignKey: "relationId",
            as: "commissionEntity",
        });
    }

    public static initModel() {
        CommissionVoucherModel.init(
            {
                id: {
                    type: INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                relationId: {
                    type: INTEGER,
                    allowNull: false,
                },
                entityId: {
                    type: INTEGER,
                    allowNull: false,
                },
                entityType: {
                    type: STRING,
                    allowNull: false,
                },
                status: {
                    type: STRING,
                    allowNull: false,
                },
                value: {
                    type: DECIMAL(10, 2),
                    allowNull: false,
                },
                createdBy: {
                    type: INTEGER,
                    allowNull: false,
                },
                updatedBy: {
                    type: INTEGER,
                    allowNull: true,
                },
                deletedBy: {
                    type: INTEGER,
                    allowNull: true,
                },
                createdAt: {
                    type: DATE,
                    allowNull: false,
                    defaultValue: NOW,
                    field: "created_at",
                },
                updatedAt: {
                    type: DATE,
                    allowNull: false,
                    defaultValue: NOW,
                    field: "updated_at",
                },
                deletedAt: {
                    type: DATE,
                    allowNull: true,
                    defaultValue: null,
                    field: "deleted_at",
                },
            },
            {
                sequelize,
                tableName: "commission_vouchers",
                timestamps: true,
                paranoid: true,
            },
        );
        return CommissionVoucherModel;
    }
}

interface ICommissionVoucher extends BaseMeta {
    relationId: number; // many-to-many join Table id, FK
    entityId: number;
    entityType: COMMISSION_VOUCHER_ENTITIES; // order | franchise
    status: COMMISSION_PAID_STATUS;
    value: number;
}

export {
    CommissionVoucherModel,
    CommissionVoucherCreationAttributes,
    ICommissionVoucher,
};
