import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from "../../../config";
import { ICheckPoint } from '../../../interfaces/pdiCheckPoint';

// Define the optional attributes for creation
interface PdiCheckpointCreationAttributes extends Optional<ICheckPoint, 'id'> { }

class PdiCheckpointModel extends Model<ICheckPoint, PdiCheckpointCreationAttributes> implements ICheckPoint {
    id: number;
    title: string;
    createdBy: number | null;
    updatedBy: number | null;
    deletedBy: number | null;
}

// Initialize the PdiChecklist model
PdiCheckpointModel.init(
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
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        deletedBy:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        
    },
    {
        sequelize,
        tableName: 'pdi_checkpoints',
        timestamps: true,
    },
);

export { PdiCheckpointModel };
