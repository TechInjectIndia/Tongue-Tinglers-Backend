import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../../config";
import { FranchiseeAttributes, FranchiseeLocation, FranchiseType } from '../../../interfaces';
import {FranchiseLocationModel} from "./franchiseLocationModel";

// Franchisee creation attributes, making 'id' optional for creation
interface FranchiseeCreationAttributes extends Optional<FranchiseeAttributes, 'id'> { }

// CODE-REVIEW-SUMEET:
enum SM_PLATFORM {
    FB,INSTAGRAM,YOUTUBE
}

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
    public franchiseLocation: FranchiseLocationModel;  //delete it 
    public establishedDate!: Date | null;
    public franchiseAgreementSignedDate!: Date | null;
    public franchiseType!: FranchiseType; // defines what franchise owner is a super franchise, master franchise (TT company) or neither = franchise
    public regionId: string; // CODE-REVIEW-SUMEET: for master franchise, we will have a region Pan-india so never null

    public socialMediaLinks?: {url:string,type:SM_PLATFORM}[]  //CODE-REVIEW-SUMEET: move to separate join table meta table with new columns
    public contractIds:string[];

    public investmentAmount!: number | null; // dont save here this should be pulled from contracts

    public royaltyPercentage!: number | null; //delete it
    public monthlyRevenue!: number | null; //delete it
    public numberOfOutlets!: number | null; //delete it
    public menuSpecialty?: string | null; //delete it
    public businessHours?: string | null; //delete it
    public deliveryOptions?: boolean | null; //delete it
    public isActive!: boolean | null;
    public ratings?: number | null; 
    public promotions?: string[] | null; //delete it
    public targetMarket?: string | null; //delete it
    public sustainabilityPractices?: string | null; //delete it
    public trainingPrograms?: string[] | null; //delete it
    public supportContact?: string | null; //delete it
    public operationalChallenges?: string[] | null; //delete it
    public competitiveAdvantages?: string | null;  //delete it
    public expansionPlans?: string | null; //delete it
    public customerFeedback?: string[] | null; //delete it
    public industryCertifications?: string[] | null; //delete it
    public affiliatePrograms?: string[] | null; //delete it
    public performanceMetrics?: { [key: string]: number } | null; //delete it
    public franchiseRenewalInfo?: { renewalDate: Date; conditions: string } | null; 
    public partnerships?: string[] | null; //delete it
    public marketingStrategies?: string[] | null; //delete it
    public trainingHistory?: { date: Date; topic: string }[] | null; //delete it
    public crisisManagementPlans?: string | null; //delete it
    public diversityInitiatives?: string | null; //delete it
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
            type: DataTypes.STRING(255), // CODE-REVIEW-SUMEET: Added String Length Constraint
            allowNull: true,
            // CODE-REVIEW-SUMEET: Consider making this required if every franchisee needs a linked user.
            //  allowNull: false,
        },
        referBy: {
            type: DataTypes.STRING(255), // CODE-REVIEW-SUMEET: Added String Length Constraint
            allowNull: true,
        },
        parentFranchise: {
            type: DataTypes.STRING(255), // CODE-REVIEW-SUMEET: Added String Length Constraint
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING(255), // CODE-REVIEW-SUMEET: Added String Length Constraint
            allowNull: false,
            comment: "Name of the franchisee",
            validate: {
                notEmpty: true, // CODE-REVIEW-SUMEET: Added notEmpty validation
            }
        },
        ownerName: {
            type: DataTypes.STRING(255), // CODE-REVIEW-SUMEET: Added String Length Constraint
            allowNull: false,
            comment: "Name of the owner or primary contact",
            validate: {
                notEmpty: true, // CODE-REVIEW-SUMEET: Added notEmpty validation
            }
        },
        contactEmail: {
            type: DataTypes.STRING(255), // CODE-REVIEW-SUMEET: Added String Length Constraint
            allowNull: false,
            validate: {
                notEmpty: true, // CODE-REVIEW-SUMEET: Added notEmpty validation
                isEmail: true, // CODE-REVIEW-SUMEET: Added built-in email validation
            },
            unique: true, // CODE-REVIEW-SUMEET: Added uniqueness constraint for email
        },
        contactNumber: {
            type: DataTypes.STRING(20), // CODE-REVIEW-SUMEET: Added String Length Constraint and adjusted length
            allowNull: true,
            comment: "Primary contact number for the franchisee",
            validate: {
                // CODE-REVIEW-SUMEET: Enhanced phone number validation to handle international formats
                isPhoneNumber(value: string) {
                    if (value === null) return; // CODE-REVIEW-SUMEET: Early return for null values
                    const isValid = /^\+?[1-9]\d{1,14}$/.test(value); // Matches various international formats
                    if (!isValid) {
                        throw new Error('Invalid phone number format.');
                    }
                }
            }
        },
        franchiseLocations: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            allowNull: true,
            defaultValue: [], // CODE-REVIEW-SUMEET: Added Default Value to prevent null checks
            comment: "Locations of the franchise outlets",
            validate: {
                // CODE-REVIEW-SUMEET: Added validation for franchiseLocations array type
                isArrayOfLocations(value: any) {
                    if (value === null) return; // CODE-REVIEW-SUMEET: Early return for null values
                    if (!Array.isArray(value) || !value.every(loc =>
                        typeof loc === 'object' && loc !== null &&
                        'address' in loc && typeof loc.address === 'string' &&
                        // ... add other location property checks
                        true
                    )) {
                        throw new Error('Invalid franchise locations format.');
                    }
                }
            }
        },
        establishedDate: {
            type: DataTypes.DATE,
            allowNull: false, // CODE-REVIEW-SUMEET: This field should likely not be optional
            comment: "Date when the franchise was established",
        },
        franchiseAgreementSignedDate: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "Date when the franchise agreement was signed",
        },
        franchiseType: {
            type: DataTypes.ENUM(...Object.values(FranchiseType)),
            allowNull: false, // CODE-REVIEW-SUMEET: This field should likely not be optional
        },
        region: {
            type: DataTypes.STRING(255), // CODE-REVIEW-SUMEET: Added String Length Constraint
            allowNull: true,
            comment: "Geographical region of operation for the franchisee",
            // CODE-REVIEW-SUMEET: Consider using an ENUM for predefined regions
        },
        // ... (rest of the fields with similar improvements for string length and validation where applicable)

    },
    {
        sequelize,
        tableName: 'franchisees',
        timestamps: true,
        indexes: [
            {
                fields: ['name']
            },
            {
                fields: ['contactEmail']
            },
            {
                fields: ['parentFranchise']
            }, // CODE-REVIEW-SUMEET: Added Index -  If parentFranchise is frequently used in queries
            // ... other indexes as needed
        ]
    }
);

// CODE-REVIEW-SUMEET: Define the association for the one-to-many relationship with UserModel
FranchiseeModel.hasMany(UserModel, { foreignKey: 'franchiseeId', as: 'users' });


export { FranchiseeModel };
