import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { UserModel } from '../user/user.model';
import { LeadsModel } from './lead.model';

// Define the attributes for Assign creation (Optional `id` if auto-generated)
interface AssignAttributes {
    id?: number;
    assignedTo: number; // Foreign key referencing UserDetails
    assignedBy: number; // Foreign key referencing UserDetails
    assignedDate: Date;
    leadId: number; // Foreign key referencing LeadsModel
}

// Define the interface for Assign model creation
interface AssignCreationAttributes extends Optional<AssignAttributes, "id"> { }

// Model class
class AssignModel extends Model<AssignAttributes, AssignCreationAttributes> implements AssignAttributes {
    public id!: number;
    public assignedTo!: number;
    public assignedBy!: number;
    public assignedDate!: Date;
    public leadId!: number;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate() {
        this.belongsTo(UserModel, { foreignKey: 'assignedTo', as: 'assignedToId', });
        this.belongsTo(UserModel, { foreignKey: 'assignedBy', as: 'assignedById', });
        this.belongsTo(LeadsModel, { foreignKey: 'leadId', as: 'leadData', });
    }

    public static initModel() {
        // Step 2: Initialize the Model
        AssignModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                assignedTo: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: UserModel,
                        key: "id",
                    },
                },
                assignedBy: {
                    type: DataTypes.INTEGER,
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
                    type: DataTypes.INTEGER,
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
        return AssignModel;
    }
}

export { AssignModel };
