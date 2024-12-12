import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config";
import {
    CONTRACT_STATUS,
    ProposalModels,
    CONTRACT_PAYMENT_STATUS,
    CONTRACT_DOCUMENT_STATUS,
    IContract,
    ITrackable,
    SignDoc,
    UserDetails,
    Note,
} from "../../interfaces";

const { INTEGER, STRING, FLOAT, DATE, JSONB, ENUM, UUIDV4 } = DataTypes;
import { LeadsModel } from "./lead/lead.model";
import { UserModel } from "./user/user.model";

interface ContractCreationAttributes
    extends Optional<IContract, "id" | "createdAt" | "updatedAt"> {
}

class ContractModel
    extends Model<IContract, ContractCreationAttributes>
    implements IContract {
    public id!: number;
    public status!: CONTRACT_STATUS;
    public proposalData: ProposalModels | null;
    public terminationDetails: null | {
        UserDetails: UserDetails;
        reason: string;
        date: Date;
    };
    public payment!:
        | null
        | {
        paymentId: string;
        amount: number;
        date: Date;
        status: CONTRACT_PAYMENT_STATUS;
        additionalInfo: string;
    }[];
    public leadId!: number | null;
    public templateId!: string | null;
    public amount!: number;
    public signedDate!: Date | null;
    public dueDate!: Date;
    public validity!: {
        to: Date;
        from: Date;
    };
    public notes: Note[] | null;
    public additionalInfo!: string | null;
    public logs: ITrackable[] | null;
    public signedDocs: SignDoc[] | null;
    public createdBy!: number;
    public updatedBy!: number | null;
    public deletedBy!: number | null;
    public deletedAt!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate() {
        this.belongsTo(UserModel, {
            foreignKey: "userId",
            as: "user",
            constraints: false,
        });
        this.belongsTo(LeadsModel, {
            foreignKey: "leadId",
            as: "lead",
            constraints: false,
        });
    }

    organizationId: number | null;
}

ContractModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        status: {
            type: ENUM,
            values: [...Object.values(CONTRACT_STATUS)],
            allowNull: false,
        },
        proposalData: {
            type: JSONB,
            allowNull: true,
        },
        organizationId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        terminationDetails: {
            type: JSONB,
            allowNull: true,
        },
        payment: {
            type: JSONB,
            allowNull: true,
        },
        leadId: {
            type: STRING,
            allowNull: true,
        },
        templateId: {
            type: STRING,
            allowNull: true,
        },
        amount: {
            type: FLOAT,
            allowNull: true,
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
        logs: {
            type: JSONB,
            allowNull: true,
        },
        signedDocs: {
            type: JSONB,
            allowNull: true,
        },
        notes: {
            type: JSONB,
            allowNull: true,
        },
        additionalInfo: {
            type: STRING,
            allowNull: true,
            defaultValue: "",
        },
        createdBy: {
            type: INTEGER,
            allowNull: false,
        },
        deletedAt: {
            type: DATE,
            allowNull: true,
        },
        updatedBy: {
            type: INTEGER,
            allowNull: true,
        },
        deletedBy: {
            type: INTEGER,
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
    },
    {
        sequelize,
        tableName: "contracts",
        timestamps: true,
    },
);

ContractModel.associate();

export { ContractModel };
