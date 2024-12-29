import { DataTypes, INTEGER, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";

import { CampaignQuestionModel } from "database/schema/campaign-ui/CampaignQuestionModel";
import { CampaignAdModel } from "apps/campaign/models/CampaignModel";
import { IOptions, IQuestion, QuestionType } from "../interface/Question";
;

const { STRING, UUID, DATE, JSONB, ENUM, NOW, UUIDV4, BOOLEAN } = DataTypes;

// Define the creation attributes by making certain fields optional
interface FormQuestionCreationAttributes
    extends Optional<IQuestion, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
}

class QuestionModel extends Model<IQuestion, FormQuestionCreationAttributes>
    implements IQuestion {
    public id!: number;
    public question!: string;
    public type!: QuestionType;
    public required!: boolean;
    public options!: IOptions[];

    public createdBy!: number;
    public updatedBy!: number | null;
    public deletedBy!: number | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;


    public static initModel() {
        QuestionModel.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            question: {
                type: STRING,
                allowNull: false,
                comment: 'The text of the question',
            },
            type: {
                type: ENUM(...Object.values(QuestionType)),
                allowNull: false,
            },
            required: {
                type: BOOLEAN,
                allowNull: false,
                defaultValue: false,
                comment: 'Indicates if the question is required',
            },
            options: {
                type: JSONB,
                allowNull: true,
                comment: 'Options for multi_choice or single_choice questions (stored as JSON)',
            },
            createdBy: {
                type: INTEGER,
                allowNull: false
            },
            updatedBy: {
                type: INTEGER,
                allowNull: true
            },
            deletedBy: {
                type: INTEGER,
                allowNull: true
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
            tableName: 'questions',
            timestamps: true,
            paranoid: true,
            comment: 'Stores dynamic form questions with different question types',
        });
        return QuestionModel;
    }

    public static associate() {
        QuestionModel.belongsToMany(CampaignAdModel, {
            through: CampaignQuestionModel,
            foreignKey: "questionId",
            otherKey: "campaignId",
            as: "campaigns",
        });
    }
}

// Initialize the QuestionModel

export { QuestionModel };
