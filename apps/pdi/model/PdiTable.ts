import { ContractModel } from 'apps/contracts/models/ContractTable';
import { IChecklistModel } from 'apps/ichecklist/model/CheckListTable';
import { checkPointsValue, IPdiList } from 'apps/pdi-checklist/interface/Pdi';
import { PdiCheckpointModel } from 'apps/pdi-checkpoint/model/PdiCheckPointTable';
import { sequelize } from 'config';
import { DataTypes, Model, Optional } from 'sequelize';


// Define the optional attributes for creation
interface PDICreationAttributes extends Optional<IPdiList, 'id'> {
}

class PdiModel extends Model<IPdiList, PDICreationAttributes>
    implements IPdiList {
    id: number;
    checkpoints: checkPointsValue[]
    prospectId: number;
    createdAt: Date | null;
    updatedAt: Date | null
    createdBy: number;
    updatedBy: number | null;
    deletedAt: Date | null;
    deletedBy: number | null;

    public static initModel() {
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
        return PdiModel;
    }

    public static associate() {
        //todo check if we need this!
        IChecklistModel.belongsTo(PdiCheckpointModel, {
            foreignKey: 'id', as:
                'checkpoint', constraints: true
        })
        IChecklistModel.hasMany(PdiCheckpointModel, {
            foreignKey: 'checkPoints', as:
                'checkpoint'
        })
    }
}
export { PdiModel };
