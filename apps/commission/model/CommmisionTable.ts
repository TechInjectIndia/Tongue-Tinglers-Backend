
import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../../../config";
import { CommissionEventType, CommissionType, ICommission } from "../interface/Commission";
import { CommissionEntityMappingModel } from "./CommissionEntityMappingTable";

const { STRING, DATE, INTEGER, NOW, } = DataTypes;

// Define the creation attributes by making certain fields optional
interface CommissionCreationAttributes extends Optional<ICommission, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> { }

class CommissionTable extends Model<ICommission, CommissionCreationAttributes> implements ICommission {
    public id: number;

    public title: string;
    public type: CommissionType;
    public value: number;
    public eventType: CommissionEventType;

    public createdBy: number;
    public updatedBy: number | null;
    public deletedBy: number | null;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly deletedAt: Date | null;

    public static associate() {
        CommissionTable.hasMany(CommissionEntityMappingModel, {
            foreignKey: {
                allowNull: false,
                name: 'commissionId',
            },
        });
        CommissionEntityMappingModel.belongsTo(CommissionTable, {
            foreignKey: {
                allowNull: false,
                name: 'commissionId',
            },
        });
    }

    public static initModel() {
        CommissionTable.init({
            id: {
                type: INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            title: {
                type: STRING,
                allowNull: false,
                unique: true,
            },
            type: {
                type: STRING,
                allowNull: false,
            },
            value: {
                type: INTEGER,
                allowNull: false,
            },
            eventType: {
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
            tableName: 'commissions',
            timestamps: true,
            paranoid: true,
        });
        return CommissionTable;
    }
}

// CommissionTable.init({
//     id: {
//         type: INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true,
//     },
//     title: {
//         type: STRING,
//         allowNull: false,
//         unique: true,
//     },
//     type: {
//         type: STRING,
//         allowNull: false,
//     },
//     value: {
//         type: INTEGER,
//         allowNull: false,
//     },
//     eventType: {
//         type: STRING,
//         allowNull: false,
//     },
//     createdBy: {
//         type: INTEGER,
//         allowNull: false
//     },
//     updatedBy: {
//         type: INTEGER,
//         allowNull: true
//     },
//     deletedBy: {
//         type: INTEGER,
//         allowNull: true
//     },
//     createdAt: {
//         type: DATE,
//         allowNull: false,
//         defaultValue: NOW,
//         field: "created_at",
//     },
//     updatedAt: {
//         type: DATE,
//         allowNull: false,
//         defaultValue: NOW,
//         field: "updated_at",
//     },
//     deletedAt: {
//         type: DATE,
//         allowNull: true,
//         defaultValue: null,
//         field: "deleted_at",
//     },
// }, {
//     sequelize,
//     tableName: 'commissions',
//     timestamps: true,
//     paranoid: true,
// });


/* associations */



export { CommissionTable };
