import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../../../config";

import { BaseModel, DeletionMetaData, UpdatedMetaData } from "../../../interfaces";
import { FranchiseModel } from "../franchise/franchiseModel";
import { OrganizationModel } from "../../../apps/organization/database/organization_schema";
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
}

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


/* associations */

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


interface ICommissionEntityMapping extends BaseModel, UpdatedMetaData, DeletionMetaData {
    commissionId: number,
    franchiseId: number,
    organizationId: number,
    status: COMMISSION_PAID_STATUS,
}

export { CommissionEntityMapTable, COMMISSION_ENTITIES, ICommissionEntityMapping, COMMISSION_PAID_STATUS, OrganizationCommissions };
