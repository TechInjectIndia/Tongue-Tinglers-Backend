import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from "../../../config";
import { IPdiList } from '../../../interfaces/pdi';
import { PdiCheckpointModel } from './pdiCheckPointModel';
import { FranchiseModelRepo } from '../../../apps/franchise_model/models';
import { FranchiseeModel } from './franchiseeModel';
import { checkPointsValue } from '../../../interfaces/ichecklist';
import { ContractModel } from '../contracts';

// Define the optional attributes for creation
interface PDICreationAttributes extends Optional<IPdiList, 'id'> { }

class PdiModel extends Model<IPdiList,PDICreationAttributes> implements IPdiList {
    id: number;
    checkpoints: checkPointsValue[]
    prospectId: number;
    createdAt: Date | null;
    updatedAt: Date |null
    createdBy:number;
    updatedBy:number|null;
    deletedAt:Date|null;
    deletedBy:number|null;
}

PdiModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true, 
        },
        checkpoints: {
            type: DataTypes.JSONB,
            // references: {
            //     model: PdiCheckpointModel,
            //     key: "id",
            // },
            allowNull: false,
        },
        prospectId: {
            type: DataTypes.INTEGER,
            references: {
                model: ContractModel,
                key: "id",
            },
            allowNull: true,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        deletedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'pdi',
        timestamps: true,
    },
);

// IChecklistModel.belongsTo(PdiCheckpointModel, { foreignKey: 'id', as: 'checkpoint', constraints: true })
// IChecklistModel.hasMany(PdiCheckpointModel, { foreignKey: 'checkPoints', as: 'checkpoint'})

export { PdiModel };
