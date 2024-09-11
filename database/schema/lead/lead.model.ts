import { DataTypes, Model, Optional } from "sequelize";
import { LEAD_SOURCE, LEAD_STATUS } from '../../../interfaces';
import { sequelize } from "../../../config";
import { TLead } from "../../../types";
const { STRING, TEXT, DATE, INTEGER, ENUM, NOW } = DataTypes;

interface LeadCreationAttributes extends Optional<TLead, 'id' | 'createdAt' | 'updatedAt'> { }

class LeadsModel extends Model<TLead, LeadCreationAttributes> implements TLead {
    public id!: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public city: string;
    public state: string;
    public zip_code: string;
    public country: string;
    public phoneNumber: string;
    public address: string;
    public additional_info: string;
    public status: string;
    public source: number;
    public follow_date: Date;
    public assignedTo: number;
    public createdBy!: number;
    public updatedBy!: string;
    public deletedBy!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

LeadsModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
    zip_code: {
        type: STRING
    },
    country: {
        type: STRING
    },
    address: {
        type: STRING
    },
    additional_info: {
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
    follow_date: {
        type: DATE
    },
    assignedTo: {
        type: INTEGER
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