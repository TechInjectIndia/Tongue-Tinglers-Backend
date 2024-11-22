import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { SeoImage } from "../../../interfaces";
import { FranchiseLeadModel } from "./franchiseModels";

// Define the attributes for SeoImage creation
interface SeoImageCreationAttributes extends Optional<SeoImage, 'id'> { }

class SeoImageModel extends Model<SeoImage, SeoImageCreationAttributes> implements SeoImage {
    public id!: number;
    public localFile: File | null;
    public url!: string;
    public alt!: string;
    public franchiseModelId!: number;

    // Define any associations if needed
    public static associate() {
        // Example association
        // this.belongsTo(AnotherModel, { foreignKey: 'anotherModelId', as: 'anotherModel' });
    }
}

// Initialize the SeoImageModel
SeoImageModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, 
    },
    localFile: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    franchiseModelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: FranchiseLeadModel,
            key: 'id',
        },
    },
}, {
    sequelize,
    tableName: 'seo_images', // Define the table name for the model
    timestamps: true, // Set to true if you want createdAt and updatedAt fields
});

// Export the model
export { SeoImageModel };
