import { DataTypes, Model, Optional } from "sequelize";
import { QuestionType, IFormQuestion, IOptions } from '../../../interfaces';
import { sequelize } from "../../../config";
import { UserModel } from '../user/user.model';
const { STRING, TEXT, DATE, JSONB, ENUM, NOW, UUIDV4 } = DataTypes;

// Define the creation attributes by making certain fields optional
interface FormQuestionCreationAttributes extends Optional<IFormQuestion, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> { }

class DynamicFormModel extends Model<IFormQuestion, FormQuestionCreationAttributes> implements IFormQuestion {
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

    // Define associations (if any)
    public static associate() {
        DynamicFormModel.belongsTo(UserModel, { foreignKey: 'createdBy', as: 'creator' });
        DynamicFormModel.belongsTo(UserModel, { foreignKey: 'updatedBy', as: 'updater' });
        DynamicFormModel.belongsTo(UserModel, { foreignKey: 'deletedBy', as: 'deleter' });
    }
}

// Initialize the DynamicFormModel
DynamicFormModel.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        comment: 'Unique identifier for the form question',
    },
    question: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'The text of the question',
    },
    type: {
        type: DataTypes.ENUM(...Object.values(QuestionType)),
        allowNull: false,
        comment: 'Type of the question (boolean, string, multi_choice, single_choice, number)',
    },
    required: {
        type: DataTypes.BOOLEAN,
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
    tableName: 'dynamic_form_questions',
    timestamps: true,
    paranoid: true,
    comment: 'Stores dynamic form questions with different question types',
});

export { DynamicFormModel, QuestionType };
