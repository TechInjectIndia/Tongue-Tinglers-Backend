import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../../config";
import { FranchiseeAttributes, FranchiseLocationAttributes, FranchiseType } from '../../../interfaces';
import { UserModel } from '../user/user.model';
import { RegionModel } from './RegionsModel';
import { ContractModel } from '../contracts'; // Import the ContractModel

// Franchisee creation attributes, making 'id' optional for creation
interface FranchiseeCreationAttributes extends Optional<FranchiseeAttributes, 'id'> { }

// Franchisee class model for the Sequelize ORM
class FranchiseeModel extends Model<FranchiseeAttributes, FranchiseeCreationAttributes> implements FranchiseeAttributes {
  public id!: string;
  public userid: string | null;
  public referBy?: string | null;
  public parentFranchise?: string | null;
  public name!: string;
  public ownerName!: string;
  public contactEmail!: string;
  public contactNumber!: string | null;
  public establishedDate!: Date | null;
  public franchiseAgreementSignedDate!: Date | null;
  public franchiseType!: FranchiseType;
  public regionId!: string | null;
  public contractIds!: string[];
  public activeContract!: string;
  public isActive!: boolean | null;
  public ratings?: number | null;
  public franchiseRenewalInfo?: { renewalDate: Date; conditions: string } | null;
  public readonly franchiseLocation: FranchiseLocationAttributes[];
  public organizationId!: string;

  public static associate() {
    this.belongsTo(UserModel, { foreignKey: 'userid', as: 'user', constraints: false });

    // Change the association alias to avoid collision
    this.belongsTo(FranchiseeModel, { foreignKey: 'parentFranchise', as: 'parentFranchiseAssociation', constraints: false });

    // Association with RegionModel
    this.belongsTo(RegionModel, { foreignKey: 'regionId', as: 'region', constraints: true });
  }
}

// Initializing the model and its schema
FranchiseeModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userid: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    referBy: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    parentFranchise: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Name of the franchisee",
    },
    ownerName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Name of the owner or primary contact",
    },
    contactEmail: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "Primary contact number for the franchisee",
      validate: {
        isPhoneNumber(value: string) {
          if (value === null) return;
          const isValid = /^\+?[1-9]\d{1,14}$/.test(value);
          if (!isValid) {
            throw new Error('Invalid phone number format.');
          }
        }
      }
    },
    establishedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "Date when the franchise was established",
    },
    franchiseAgreementSignedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "Date when the franchise agreement was signed",
    },
    franchiseType: {
      type: DataTypes.ENUM(...Object.values(FranchiseType)),
      allowNull: false,
    },
    regionId: {
      type: DataTypes.STRING,
      references: {
        model: RegionModel,
        key: 'id',
      },
      allowNull: true,
    },
    contractIds: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      comment: "Array of contract IDs associated with the franchisee",
    },
    activeContract: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
      comment: "Indicates if the franchisee is currently active",
    },
    ratings: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "Average rating for the franchisee",
    },
    franchiseRenewalInfo: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: "Information regarding franchise renewal terms and conditions",
    },
    organizationId: {
      type: DataTypes.STRING,
      allowNull: true,// Once the organization table is created, update allowNull: true to allowNull: false
    },
  },
  {
    sequelize,
    tableName: 'franchisees',
    timestamps: true,
  }
);

FranchiseeModel.associate();

export { FranchiseeModel };

