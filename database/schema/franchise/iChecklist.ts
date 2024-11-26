import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from "../../../config";
import { checkPointsValue, ICheckList } from '../../../interfaces/ichecklist';
import { PdiCheckpointModel } from './pdiCheckPointModel';
import { FranchiseModelRepo } from '../../../apps/franchise_model/models';
import { FranchiseeModel } from './franchiseeModel';
import { FranchiseLeadModel } from '../lead/franchiseModels';

// Define the optional attributes for creation
interface IChecklistCreationAttributes extends Optional<ICheckList, 'id'> { }

class IChecklistModel extends Model<ICheckList, IChecklistCreationAttributes> implements ICheckList {
    id: number;
    title:string;
    checkPoints: Array<number>;
    franchiseModelId: number;
    createdBy:number;
    updatedBy:number|null;
    deletedAt:Date|null;
    deletedBy:Date|null;
}

IChecklistModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true, 
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        checkPoints: {
            type: DataTypes.JSONB,
            // references: {
            //     model: PdiCheckpointModel,
            //     key: "id",
            // },
            allowNull: false,
        },
        franchiseModelId: {
            type: DataTypes.INTEGER,
            references: {
                model: FranchiseLeadModel,
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
        tableName: 'pdi_checklists',
        timestamps: true,
    },
);

// IChecklistModel.belongsTo(PdiCheckpointModel, { foreignKey: 'id', as: 'checkpoint', constraints: true })
// IChecklistModel.hasMany(PdiCheckpointModel, { foreignKey: 'checkPoints', as: 'checkpoint'})


export { IChecklistModel };
