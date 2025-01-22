import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../../../config";
import {OrganizationModel} from "apps/organization/models/OrganizationTable";

import {FranchiseModel} from "apps/franchise/models/FranchiseTable";
import {CommissionTable} from "./CommmisionTable";
import {ICommissionEntityMapping} from "../interface/CommissionEntityMapping";

const {DATE, INTEGER, NOW} = DataTypes;


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
    public readonly updatedAt: Date | null;
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
            as: 'organization'
        });

        CommissionEntityMappingModel.belongsTo(CommissionTable, {
            foreignKey: {
                allowNull: false,
                name: 'commissionId',
            },
            as: 'commission'
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
            franchiseId: {
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


export {
    CommissionEntityMappingModel,
    CommissionVoucherCreationAttributes,
};
