import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config";
import { CONTRACT_STATUS, CONTRACT_PAYMENT_STATUS, CONTRACT_DOCUMENT_STATUS, IContract } from '../../interfaces';
const { INTEGER, STRING, FLOAT, DATE, JSONB, ENUM, UUIDV4 } = DataTypes;
import { LeadsModel } from './lead/lead.model';  // Adjust the import path as necessary
import { UserModel } from './user/user.model';  // Adjust the import path as necessary
interface ContractCreationAttributes extends Optional<IContract, 'id' | 'createdAt' | 'updatedAt'> { }

class ContractModel extends Model<IContract, ContractCreationAttributes> implements IContract {
    public id!: string;
    public status!: CONTRACT_STATUS;
    public terminationDetails!: null | {
        id: string;
        reason: string;
        date: Date;
    };
    public doc!: null | {
        id: string;
        name: string;
        url: string;
        status: CONTRACT_DOCUMENT_STATUS;
        additionalInfo: string;
    };
    public payment!: null | {
        paymentId: string;
        amount: number;
        date: Date;
        status: CONTRACT_PAYMENT_STATUS;
        additionalInfo: string;
    };
    public userId!: string | null;
    public leadId!: string | null;
    public templateId!: string;
    public amount!: number;
    public signedDate!: Date | null;
    public dueDate!: Date;
    public validity!: {
        to: Date;
        from: Date;
    };
    public additionalInfo!: string;
    public createdBy!: string;
    public updatedBy!: string | null;
    public deletedBy!: string | null;
    public deletedAt!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate() {
        this.belongsTo(UserModel, { foreignKey: 'userId', as: 'user', constraints: false });
        this.belongsTo(LeadsModel, { foreignKey: 'leadId', as: 'lead', constraints: false });
    }
}

ContractModel.init({
    id: {
        type: STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    status: {
        type: ENUM,
        values: [...Object.values(CONTRACT_STATUS)],
        allowNull: false,
    },
    terminationDetails: {
        type: JSONB,
        allowNull: true,
    },
    doc: {
        type: JSONB,
        allowNull: true,
    },
    payment: {
        type: JSONB,
        allowNull: true,
    },
    userId: {
        type: STRING,
        allowNull: true,
    },
    leadId: {
        type: STRING,
        allowNull: true,
    },
    templateId: {
        type: STRING,
        allowNull: false,
    },
    amount: {
        type: FLOAT,
        allowNull: false,
    },
    signedDate: {
        type: DATE,
        allowNull: true,
    },
    dueDate: {
        type: DATE,
        allowNull: false,
    },
    validity: {
        type: JSONB,
        allowNull: false,
    },
    additionalInfo: {
        type: STRING,
        allowNull: true,
        defaultValue: '',
    },
    createdBy: {
        type: STRING,
        allowNull: false,
    },
    deletedAt: {
        type: DATE,
        allowNull: true,
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
        defaultValue: DataTypes.NOW,
        field: "created_at",
    },
    updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "updated_at",
    },
}, {
    sequelize,
    tableName: 'contracts',
    timestamps: true,
});

ContractModel.associate();

export { ContractModel };