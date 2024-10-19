import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from "../../../config";
import { IPdiChecklist, PdiChecklistItem, IPdiChecklistStatus } from '../../../interfaces';

// Define the optional attributes for creation
interface PdiChecklistCreationAttributes extends Optional<IPdiChecklist, 'id'> { }

class PdiChecklistModel extends Model<IPdiChecklist, PdiChecklistCreationAttributes> implements IPdiChecklist {
    public id!: string;
    public franchiseeId!: string;
    public checklistName!: string;
    public pdiDate!: Date;
    public status!: IPdiChecklistStatus;
    public items!: PdiChecklistItem[];
}

// Initialize the PdiChecklist model
PdiChecklistModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        franchiseeId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        checklistName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pdiDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(IPdiChecklistStatus)),
            allowNull: false,
        },
        items: {
            type: DataTypes.JSONB,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'pdi_checklists',
        timestamps: true,
    },
);

export { PdiChecklistModel };
