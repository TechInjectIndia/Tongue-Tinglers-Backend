import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { ExtraFields, extraFieldTypes } from "../../../interfaces";
import { FranchiseLeadModel } from "./franchiseModels";

// Define the attributes for ExtraFields creation
interface ExtraFieldsCreationAttributes extends Optional<ExtraFields, 'id'> { }

class ExtraFieldsModel extends Model<ExtraFields, ExtraFieldsCreationAttributes> implements ExtraFields {
    public id!: number;
    public key!: string;
    public value!: string;
    public title!: string;
    public type!: extraFieldTypes;
    public franchiseModelId!: number;

    // Define any associations if needed
    public static associate() {
        // Example association
        // this.belongsTo(AnotherModel, { foreignKey: 'anotherModelId', as: 'anotherModel' });
    }
}

// Initialize the ExtraFieldsModel
ExtraFieldsModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, 
    },
    franchiseModelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: FranchiseLeadModel,
            key: 'id',
        },
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM(...Object.values(extraFieldTypes)), // Using enum for type
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'extra_fields',
    timestamps: true, // Set to true if you want createdAt and updatedAt fields
});

// Export the model
export { ExtraFieldsModel };
