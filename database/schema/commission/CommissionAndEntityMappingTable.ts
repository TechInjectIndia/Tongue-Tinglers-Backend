import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../../../config";

import { BaseModel, DeletionMetaData, UpdatedMetaData } from "../../../interfaces";
const { STRING, DATE, INTEGER, NOW, } = DataTypes;


// Define the creation attributes by making certain fields optional
interface CommissionEntityMappingCreationAttributes extends Optional<ICommissionEntityMapping, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> { }

class CommissionEntityMapTable extends Model<ICommissionEntityMapping, CommissionEntityMappingCreationAttributes> implements ICommissionEntityMapping {
    public id: number;
    public commissionId: number;
    public campaignId: number;
    public entityType: COMMISSION_ENTITIES;
    public entityId: number;
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
    campaignId: {
        type: INTEGER,
        allowNull: false,
    },
    entityType: {
        type: STRING,
        allowNull: false,
    },
    entityId: {
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
    tableName: 'commissions',
    timestamps: true,
    paranoid: true,
});



enum COMMISSION_ENTITIES {
    AFFILIATE = 'affiliate',
    MASTER_FRANCHISE = 'master-franchise',
}


interface ICommissionEntityMapping extends BaseModel, UpdatedMetaData, DeletionMetaData {
    commissionId: number,
    campaignId: number,
    entityType: COMMISSION_ENTITIES,
    entityId: number,
}

export { CommissionEntityMapTable, COMMISSION_ENTITIES, };
