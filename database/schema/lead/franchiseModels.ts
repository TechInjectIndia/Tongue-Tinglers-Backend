import { DataTypes, Model, Optional } from "sequelize";
import { SeoImage, ExtraFields } from '../../../interfaces';
import { sequelize } from "../../../config";
import { FranchiseModels } from "../../../interfaces";

const { STRING, TEXT, DATE, JSONB, ENUM, NOW, UUIDV4 } = DataTypes;

// Define the attributes for lead creation
interface LeadCreationAttributes extends Optional<FranchiseModels, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> { }

// Define the model class for FranchiseModels
class FranchiseModel extends Model<FranchiseModels, LeadCreationAttributes> implements FranchiseModels {
    public id!: string;
    public description!: string;
    public title!: string;
    public reqArea!: number;
    public images!: SeoImage[];
    public investment!: number;
    public runningCost!: number;
    public bestFor!: string[];
    public inclusions!: string[];
    public others!: ExtraFields;
    public createdBy!: string;
    public updatedBy!: string | null;
    public deletedBy!: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;
}

// Initialize the franchise model
FranchiseModel.init({
    id: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
    },
    description: {
        type: TEXT,
        allowNull: false,
    },
    title: {
        type: STRING,
        allowNull: false,
    },
    reqArea: {
        type: DataTypes.INTEGER,  // Assuming it's a number
        allowNull: false,
    },
    images: {
        type: JSONB,
        allowNull: false,
    },
    investment: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    runningCost: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    bestFor: {
        type: JSONB,
        allowNull: false,
    },
    inclusions: {
        type: JSONB,
        allowNull: false,
    },
    others: {
        type: JSONB,
        allowNull: true,
    },
    createdBy: {
        type: STRING,
        allowNull: false,
    },
    updatedBy: {
        type: STRING,
        allowNull: true,
    },
    deletedBy: {
        type: STRING,
        allowNull: true,
    },
    createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
        field: "created_at",
    },
    updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
        field: "updated_at",
    },
    deletedAt: {
        type: DATE,
        allowNull: true,
        defaultValue: null,
        field: "deleted_at",
    },
}, {
    sequelize,
    tableName: 'franchise_model',
    timestamps: true,
});

// Export the model
export { FranchiseModel };
