import { DataTypes, Model, Optional } from "sequelize";
import { SeoImage, ExtraFields } from '../../../interfaces';
import { sequelize } from "../../../config";
import { FranchiseModels } from "../../../interfaces";
import { SeoImageModel } from "./SeoImageModel";
import { ExtraFieldsModel } from "./extraFieldsModel";

const { STRING, TEXT, DATE, JSONB, ENUM, NOW, UUIDV4 } = DataTypes;

// Define the attributes for lead creation
interface LeadCreationAttributes extends Optional<FranchiseModels, 'id'> { }

// Define the model class for FranchiseModels
class FranchiseLeadModel extends Model<FranchiseModels, LeadCreationAttributes> implements FranchiseModels {
    public id!: string;
    public description!: string;
    public title!: string;
    public reqArea!: number;
    public images!: string[] | null;
    public investment!: number;
    public runningCost!: number;
    public bestFor!: string[];
    public inclusions!: string[];
    public others!: string[] | null;
}

// Initialize the franchise model
FranchiseLeadModel.init({
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
}, {
    sequelize,
    tableName: 'franchise_model',
    timestamps: true,
});

// Define the associations
FranchiseLeadModel.hasMany(ExtraFieldsModel, {
    foreignKey: 'franchiseModelId',
    as: 'extraFields',
});

FranchiseLeadModel.hasMany(SeoImageModel, {
    foreignKey: 'franchiseModelId',
    as: 'images',
});

ExtraFieldsModel.belongsTo(FranchiseLeadModel, {
    foreignKey: 'franchiseModelId',
    as: 'franchiseModel',
});

SeoImageModel.belongsTo(FranchiseLeadModel, {
    foreignKey: 'franchiseModelId',
    as: 'franchiseModel',
});

// Export the model
export { FranchiseLeadModel };
