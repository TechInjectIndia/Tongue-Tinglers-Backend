import { DataTypes, Model, Optional } from "sequelize";
import { QuestionType, IQuestion, IOptions } from '../../../interfaces';
import { sequelize } from "../../../config";
import { UserModel } from '../user/user.model';
import { CampaignAdModel } from './campaignAdModel';
const { STRING, UUID, DATE, JSONB, ENUM, NOW, UUIDV4, BOOLEAN } = DataTypes;

// Define the creation attributes by making certain fields optional
interface FormQuestionCreationAttributes extends Optional<IQuestion, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> { }

class questionModel extends Model<IQuestion, FormQuestionCreationAttributes> implements IQuestion {
    public id!: string;
    public question!: string;
    public type!: QuestionType;
    public required!: boolean;
    public options!: IOptions[];

    public createdBy!: string;
    public updatedBy!: string | null;
    public deletedBy!: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;
}

// Initialize the questionModel
questionModel.init({
    id: {
        type: UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
        comment: 'Unique identifier for the form question',
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
        type: STRING,
        allowNull: false
    },
    updatedBy: {
        type: STRING,
        allowNull: true
    },
    deletedBy: {
        type: STRING,
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
    tableName: 'questions_model',
    timestamps: true,
    paranoid: true,
    comment: 'Stores dynamic form questions with different question types',
});

export { questionModel };
