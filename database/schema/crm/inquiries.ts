import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TInquiry } from "../../../types";
import { INQUIRY_TYPE } from "../../../interfaces";
const { INTEGER, STRING, ENUM, DATE, NOW } = DataTypes;

interface InquiryCreationAttributes extends Optional<TInquiry, 'id' | 'createdAt' | 'updatedAt'> { }

class InquiryModel extends Model<TInquiry, InquiryCreationAttributes> implements TInquiry {
    public id!: number;
    public email!: string;
    public subject: string;
    public message: string;
    public type!: string; // Franchisee or Customer
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

InquiryModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: STRING
    },
    subject: {
        type: STRING
    },
    message: {
        type: STRING,
    },
    type: {
        type: ENUM,
        values: [...Object.values(INQUIRY_TYPE)]
    },
    createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
    },
    updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
    },
}, {
    sequelize,
    tableName: 'inquiries',
    timestamps: true
});

export { InquiryModel };
