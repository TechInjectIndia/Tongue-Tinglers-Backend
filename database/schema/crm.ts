import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config";
import { TInquiry, INQUIRY_TYPE } from "../../types";
const { INTEGER, STRING, ENUM } = DataTypes;

interface UserCreationAttributes extends Optional<TInquiry, 'id' | 'createdAt' | 'updatedAt'> { }

class InquiryModel extends Model<TInquiry, UserCreationAttributes> implements TInquiry {
    public id!: number;
    public email!: string;
    public subject: string;
    public message: string;
    public type!: string; // Franchisee or Customer
    public userId!: number;
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
    userId: {
        type: INTEGER
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "created_at",
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "updated_at",
    },
}, {
    sequelize,
    tableName: 'inquiries',
    timestamps: true
});

export { InquiryModel };
