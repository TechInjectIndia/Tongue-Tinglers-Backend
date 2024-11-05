import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { UserModel } from '../user/user.model';
import { LeadsModel } from './lead.model';

// Define the attributes for Assign creation (Optional `id` if auto-generated)
interface AssignAttributes {
    id?: string;
    assignedToId: string; // Foreign key referencing UserDetails
    assignedById: string; // Foreign key referencing UserDetails
    assignedDate: Date;
    leadId: string; // Foreign key referencing LeadsModel
}

// Define the interface for Assign model creation
interface AssignCreationAttributes extends Optional<AssignAttributes, "id"> { }

// Model class
class AssignModel extends Model<AssignAttributes, AssignCreationAttributes> implements AssignAttributes {
    public id!: string;
    public assignedToId!: string;
    public assignedById!: string;
    public assignedDate!: Date;
    public leadId!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate() {
        this.belongsTo(UserModel, { foreignKey: 'assignedToId', as: 'assignedTo', });
        this.belongsTo(UserModel, { foreignKey: 'assignedById', as: 'assignedBy', });
        this.belongsTo(LeadsModel, { foreignKey: 'leadId', as: 'lead', });
    }
}

// Step 2: Initialize the Model
AssignModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        assignedToId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: UserModel,
                key: "id",
            },
        },
        assignedById: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: UserModel,
                key: "id",
            },
        },
        assignedDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        leadId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: LeadsModel,
                key: "id",
            },
        },
    },
    {
        sequelize,
        tableName: "lead_assignments",
        timestamps: true,
    }
);

AssignModel.associate();

export { AssignModel };
