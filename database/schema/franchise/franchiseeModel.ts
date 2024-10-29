import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../../config";
import { FranchiseeAttributes, FranchiseeLocation, FranchiseType } from '../../../interfaces';

// Franchisee creation attributes, making 'id' optional for creation
interface FranchiseeCreationAttributes extends Optional<FranchiseeAttributes, 'id'> { }

// Franchisee class model for the Sequelize ORM
class FranchiseeModel extends Model<FranchiseeAttributes, FranchiseeCreationAttributes> implements FranchiseeAttributes {
  public id!: string;
  public userid?: string | null;
  public referBy?: string | null;
  public parentFranchise?: string | null;
  public name!: string;
  public ownerName!: string;
  public contactEmail!: string;
  public contactNumber!: string | null;
  public franchiseLocations?: FranchiseeLocation[] | null;
  public establishedDate!: Date | null;
  public franchiseAgreementSignedDate!: Date | null;
  public franchiseType!: FranchiseType | null;
  public region!: string | null;
  public description?: string | null;
  public website?: string | null;
  public socialMediaLinks?: string[] | null;
  public logo?: string | null;
  public numberOfEmployees!: number | null;
  public investmentAmount!: number | null;
  public royaltyPercentage!: number | null;
  public monthlyRevenue!: number | null;
  public numberOfOutlets!: number | null;
  public menuSpecialty?: string | null;
  public businessHours?: string | null;
  public deliveryOptions?: boolean | null;
  public isActive!: boolean | null;
  public ratings?: number | null;
  public promotions?: string[] | null;
  public targetMarket?: string | null;
  public sustainabilityPractices?: string | null;
  public trainingPrograms?: string[] | null;
  public supportContact?: string | null;
  public operationalChallenges?: string[] | null;
  public competitiveAdvantages?: string | null;
  public expansionPlans?: string | null;
  public customerFeedback?: string[] | null;
  public industryCertifications?: string[] | null;
  public affiliatePrograms?: string[] | null;
  public performanceMetrics?: { [key: string]: number } | null;
  public franchiseRenewalInfo?: { renewalDate: Date; conditions: string } | null;
  public partnerships?: string[] | null;
  public marketingStrategies?: string[] | null;
  public trainingHistory?: { date: Date; topic: string }[] | null;
  public crisisManagementPlans?: string | null;
  public diversityInitiatives?: string | null;
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    referBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    parentFranchise: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Name of the franchisee",
    },
    ownerName: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Name of the owner or primary contact",
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Primary contact number for the franchisee",
    },
    franchiseLocations: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
      comment: "Locations of the franchise outlets",
    },
    establishedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "Date when the franchise was established",
    },
    franchiseAgreementSignedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "Date when the franchise agreement was signed",
    },
    franchiseType: {
      type: DataTypes.ENUM(...Object.values(FranchiseType)),
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Geographical region of operation for the franchisee",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Detailed description of the franchisee's business model",
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Website URL for the franchisee",
    },
    socialMediaLinks: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      comment: "Links to social media profiles associated with the franchisee",
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "URL to the franchisee's logo",
    },
    numberOfEmployees: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Total number of employees working under the franchisee",
    },
    investmentAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: "Initial investment amount required to establish the franchise",
    },
    royaltyPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      comment: "Percentage of revenue paid to the franchisor as royalties",
    },
    monthlyRevenue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: "Average monthly revenue generated by the franchisee",
    },
    numberOfOutlets: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Total number of outlets owned by the franchisee",
    },
    menuSpecialty: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Specialty items or unique offerings on the franchise menu",
    },
    businessHours: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Operating hours for the franchise outlets",
    },
    deliveryOptions: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "Indicates whether the franchisee offers delivery options",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
      comment: "Indicates if the franchisee is currently active or not",
    },
    ratings: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "Average rating for the franchisee based on customer reviews",
    },
    promotions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      comment: "Current promotions or special offers available at the franchise",
    },
    targetMarket: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Description of the target market demographics and preferences",
    },
    sustainabilityPractices: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Description of sustainability practices implemented by the franchisee",
    },
    trainingPrograms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      comment: "List of training programs available for franchise staff",
    },
    supportContact: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Contact information for customer or franchisee support",
    },
    operationalChallenges: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      comment: "Common operational challenges faced by the franchisee",
    },
    competitiveAdvantages: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Unique competitive advantages the franchisee has in the market",
    },
    expansionPlans: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Plans or strategies for future growth and expansion of the franchise",
    },
    customerFeedback: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      comment: "Feedback and testimonials from customers of the franchisee",
    },
    industryCertifications: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      comment: "Relevant industry certifications, awards, or recognitions received",
    },
    affiliatePrograms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      comment: "Details about affiliate programs the franchisee participates in",
    },
    performanceMetrics: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: "Metrics used to evaluate franchise performance (e.g., sales, satisfaction)",
    },
    franchiseRenewalInfo: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: "Information regarding franchise renewal terms and conditions",
    },
    partnerships: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      comment: "Details on partnerships with suppliers, vendors, or other organizations",
    },
    marketingStrategies: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      comment: "Marketing strategies employed by the franchisee and their effectiveness",
    },
    trainingHistory: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
      comment: "Record of training sessions attended by staff",
    },
    crisisManagementPlans: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Details of crisis management plans in place",
    },
    diversityInitiatives: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Description of diversity and inclusion initiatives",
    },
  },
  {
    sequelize,
    tableName: 'franchisees',
    timestamps: true,
  }
);

export { FranchiseeModel };