import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../../../config";
import { BaseMeta } from "apps/common/models/Base";
import { OrganizationModel } from "apps/organization/models/OrganizationTable";
import { CommissionEventType, CommissionType } from "../interface/Commission";
import { FranchiseModel } from "apps/franchise/models/FranchiseTable";



const { STRING, DATE, INTEGER, NOW, } = DataTypes;


// Define the creation attributes by making certain fields optional
interface CommissionEntityMappingCreationAttributes extends Optional<ICommissionEntityMapping, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> { }

class CommissionEntityMapTable extends Model<ICommissionEntityMapping, CommissionEntityMappingCreationAttributes> implements ICommissionEntityMapping {
    public id: number;
    public franchiseId: number;
    public commissionId: number;
    public organizationId: number;
    public status: COMMISSION_PAID_STATUS;
    public createdBy: number;
    public updatedBy: number | null;
    public deletedBy: number | null;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly deletedAt: Date | null;

    public static associate() {
        CommissionEntityMapTable.belongsTo(FranchiseModel, {
            foreignKey: {
                allowNull: false,
                name: 'franchiseId',
            },
        });

        FranchiseModel.hasMany(CommissionEntityMapTable, {
            foreignKey: {
                allowNull: false,
                name: 'franchiseId',
            },
        });

        OrganizationModel.hasMany(CommissionEntityMapTable, {
            foreignKey: {
                allowNull: false,
                name: 'organizationId',
            },
        });

        CommissionEntityMapTable.belongsTo(OrganizationModel, {
            foreignKey: {
                allowNull: false,
                name: 'organizationId',
            },
        });
    }


    public static initModel() {
        CommissionEntityMapTable.init({
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
            franchiseId: {
                type: INTEGER,
                allowNull: false,
            },

            organizationId: {
                type: INTEGER,
                allowNull: false,
            },
            status: {
                type: STRING,
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
        return CommissionEntityMapTable;
    }

}





/* associations */




enum COMMISSION_ENTITIES {
    AFFILIATE = 'affiliate',
    MASTER_FRANCHISE = 'master-franchise',
}

enum COMMISSION_PAID_STATUS {
    PENDING = 'pending',
    PAID = 'paid',
}

type OrganizationCommissions = {
    organizationId: number;
    commissionId: number;
}


interface ICommissionEntityMapping extends BaseMeta {
    commissionId: number,
    franchiseId: number,
    organizationId: number,
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
    status: COMMISSION_PAID_STATUS;
    createdBy: number;
    updatedBy: number | null;
    deletedBy: number | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export { CommissionEntityMapTable, COMMISSION_ENTITIES, ICommissionEntityMapping, COMMISSION_PAID_STATUS, OrganizationCommissions, ICommissionEntityMappingResponse };
