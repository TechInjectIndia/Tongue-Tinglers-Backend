import { DataTypes, Model, Optional } from "sequelize";
import { LEAD_SOURCE, LEAD_STATUS, Assignee } from '../../../interfaces';
import { sequelize } from "../../../config";
import { TLead } from "../../../types";
const { STRING, TEXT, DATE, JSONB, ENUM, NOW, UUIDV4 } = DataTypes;

interface LeadCreationAttributes extends Optional<TLead, 'id' | 'createdAt' | 'updatedAt'> { }

class LeadsModel extends Model<TLead, LeadCreationAttributes> implements TLead {
    public assign: Assignee[];
    public status: LEAD_STATUS;
    public id!: string;
    public firstName: string;
    public lastName: string;
    public city: string;
    public state: string;
    public zipCode: string;
    public country: string;
    public phoneNumber: string;
    public email: string;
    public address: string;
    public additionalInfo: string;
    public source: LEAD_SOURCE;
    public followedDate: Date[] | null;
    public createdBy!: number;
    public updatedBy!: string;
    public deletedBy!: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;
}

LeadsModel.init({
    id: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4 // For UUID v4, if you use UUIDs
    },
    firstName: {
        type: STRING
    },
    lastName: {
        type: STRING
    },
    email: {
        type: STRING
    },
    phoneNumber: {
        type: STRING
    },
    city: {
        type: STRING
    },
    state: {
        type: STRING
    },
    zipCode: {
        type: STRING
    },
    country: {
        type: STRING
    },
    address: {
        type: STRING
    },
    additionalInfo: {
        type: TEXT
    },
    status: {
        type: ENUM,
        values: [...Object.values(LEAD_STATUS)]
    },
    source: {
        type: ENUM,
        values: [...Object.values(LEAD_SOURCE)]
    },
    followedDate: {
        type: JSONB // Stores an array of dates as JSON
    },
    assign: {
        type: JSONB // Stores an array of dates as JSON
    },
    createdBy: {
        type: STRING
    },
    updatedBy: {
        type: STRING
    },
    deletedBy: {
        type: STRING
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
    tableName: 'leads',
    timestamps: true,
    paranoid: true
});

export { LeadsModel };