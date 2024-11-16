import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { UserModel } from '../user/user.model';
import { LeadsModel } from './lead.model';

// Define the attributes for Assign creation (Optional `id` if auto-generated)
interface AssignAttributes {
    id?: string;
    assignedTo: string; // Foreign key referencing UserDetails
    assignedBy: string; // Foreign key referencing UserDetails
    assignedDate: Date;
    leadId: string; // Foreign key referencing LeadsModel
}

// Define the interface for Assign model creation
interface AssignCreationAttributes extends Optional<AssignAttributes, "id"> { }

// Model class
class AssignModel extends Model<AssignAttributes, AssignCreationAttributes> implements AssignAttributes {
    public id!: string;
    public assignedTo!: string;
    public assignedBy!: string;
    public assignedDate!: Date;
    public leadId!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate() {
        this.belongsTo(UserModel, { foreignKey: 'assignedTo', as: 'assignedToId', });
        this.belongsTo(UserModel, { foreignKey: 'assignedBy', as: 'assignedById', });
        this.belongsTo(LeadsModel, { foreignKey: 'leadId', as: 'leadData', });
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
        assignedTo: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: UserModel,
                key: "id",
            },
        },
        assignedBy: {
            type: DataTypes.STRING,
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
            type: DataTypes.STRING,
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
