import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../../config";
import { FranchiseeAttributes, FranchiseeLocation } from '../../../interfaces';

// Franchisee creation attributes, making 'id' optional for creation
interface FranchiseeCreationAttributes extends Optional<FranchiseeAttributes, 'id'> { }

// Franchisee class model for the Sequelize ORM
class FranchiseeModel extends Model<FranchiseeAttributes, FranchiseeCreationAttributes> implements FranchiseeAttributes {
  public id!: string;
  public name!: string;
  public ownerName!: string;
  public contactEmail!: string[];
  public franchiseLocations!: FranchiseeLocation[];
  public establishedDate!: Date;
  public franchiseAgreementSignedDate!: Date;
  public franchiseType!: string;
  public numberOfEmployees!: number;
  public investmentAmount!: number;
  public royaltyPercentage!: number;
  public monthlyRevenue!: number;
  public numberOfOutlets!: number;
  public menuSpecialty!: string;
  public businessHours!: string;
  public deliveryOptions!: boolean;
  public isActive!: boolean;
}

// Initializing the model and its schema
FranchiseeModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactEmail: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    franchiseLocations: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
    },
    establishedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    franchiseAgreementSignedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    franchiseType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberOfEmployees: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    investmentAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    royaltyPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    monthlyRevenue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    numberOfOutlets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    menuSpecialty: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    businessHours: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deliveryOptions: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'franchisees',
    timestamps: true,
  }
);

export { FranchiseeModel };
