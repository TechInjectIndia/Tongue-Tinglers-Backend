import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../../../config";
import {BaseMeta} from "apps/common/models/Base";
import {OrganizationModel} from "apps/organization/models/OrganizationTable";
import {CommissionEventType, CommissionType} from "../interface/Commission";
import {FranchiseModel} from "apps/franchise/models/FranchiseTable";
import { CommissionTable } from "./CommmisionTable";


const {STRING, DATE, INTEGER, NOW} = DataTypes;


// Define the creation attributes by making certain fields optional
type CommissionVoucherCreationAttributes = Optional<ICommissionEntityMapping, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'deletedBy' | 'updatedBy'>

class CommissionEntityMappingModel
    extends Model<ICommissionEntityMapping, CommissionVoucherCreationAttributes>
    implements ICommissionEntityMapping {
    public id: number;
    public franchiseId: number;
    public commissionId: number;
    public organizationId: number;
    public createdBy: number;
    public updatedBy: number | null;
    public deletedBy: number | null;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly deletedAt: Date | null;

    public static associate() {
        CommissionEntityMappingModel.belongsTo(FranchiseModel, {
            foreignKey: {
                allowNull: false,
                name: 'franchiseId',
            }, as: 'commissionMap'
        });

        FranchiseModel.hasMany(CommissionEntityMappingModel, {
            foreignKey: {
                allowNull: false,
                name: 'franchiseId',
            },
            as: 'commissionMap'
        });

        OrganizationModel.hasMany(CommissionEntityMappingModel, {
            foreignKey: {
                allowNull: false,
                name: 'organizationId',
            },
        });

        CommissionEntityMappingModel.belongsTo(OrganizationModel, {
            foreignKey: {
                allowNull: false,
                name: 'organizationId',
            },
            as : 'organization'
        });

        CommissionEntityMappingModel.belongsTo(CommissionTable, {
            foreignKey: {
                allowNull: false,
                name: 'commissionId',
            },
            as : 'commission'
        });
    }


    public static initModel() {
        CommissionEntityMappingModel.init({
            id: {
                type: INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            commissionId: {
                type: INTEGER,
                allowNull: false,
            },
            franchiseId:{
                type: INTEGER,
                allowNull: false,
            },
            organizationId: {
                type: INTEGER,
                allowNull: false,
            },

            createdBy: {
                type: INTEGER,
                allowNull: false
            },
            updatedBy: {
                type: INTEGER,
                allowNull: true
            },
            deletedBy: {
                type: INTEGER,
                allowNull: true
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
        }, {
            sequelize,
            tableName: 'commissions_entity_mapping',
            timestamps: true,
            paranoid: true,
        });
        return CommissionEntityMappingModel;
    }

}


/* associations */


enum COMMISSION_ENTITIES {
    AFFILIATE = 'aff',
    MASTER_FRANCHISE = 'mf',
}


enum COMMISSION_VOUCHER_ENTITIES {
    ORDER_COMMISSION = 'oc',
    FRANCHISE_COMMISSION = 'fc',
}

enum COMMISSION_PAID_STATUS {
    PENDING = 'pending',
    PAID = 'paid',
    HOLD = 'hold'
}

type OrganizationCommissions = {
    franchiseId: number; // franchise being sold or franchise purchasing raw Material
    organizationId: number; // payable to organization
    commissionId: number; // commissionModelId
}

// relation of receiving party & franchise involved in trade - either sold / ordered RM
interface ICommissionEntityMapping extends BaseMeta, OrganizationCommissions {

}

interface ICommissionVoucher extends BaseMeta {
    relationId: number, // many-to-many join Table id, FK
    entityId: number,
    entityType: COMMISSION_VOUCHER_ENTITIES, // order | franchise
    status: COMMISSION_PAID_STATUS,
}

/* This table has relations with other tables, so we need to define an interface for it */
interface ICommissionEntityMappingResponse {
    id: number;
    franchiseId: number;
    /* it is organization of this franchise */
    franchiseOrganization: {
        id: number;
        name: string;
    };
    commission: {
        id: number;
        title: string;
        type: CommissionType;
        eventType: CommissionEventType;
        value: number;
    };
    appliedCommission: {
        franchiseAmount: number;
        commissionAmount: number;
    }
    /* it may be affiliate or master franchise organization */
    organization: {
        id: number;
        name: string;
    };
    // status: COMMISSION_PAID_STATUS;
    createdBy: number;
    updatedBy: number | null;
    deletedBy: number | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export {
    CommissionEntityMappingModel,
    CommissionVoucherCreationAttributes,
    COMMISSION_ENTITIES,
    ICommissionEntityMapping,
    COMMISSION_PAID_STATUS,
    OrganizationCommissions,
    ICommissionEntityMappingResponse,
    COMMISSION_VOUCHER_ENTITIES,
};
