import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";

interface EmailLogAttributes {
    id: number;
    to: string;
    subject: string;
    body: string;
    sentAt: Date;
}

interface EmailLogCreationAttributes extends Optional<EmailLogAttributes, 'id' | 'sentAt'> { }

class EmailLogModel extends Model<EmailLogAttributes, EmailLogCreationAttributes> implements EmailLogAttributes {
    public id!: number;
    public to!: string;
    public subject!: string;
    public body!: string;
    public sentAt!: Date;
}

EmailLogModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, 
    },
    to: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    sentAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: 'email_logs',
    timestamps: false,
});

export { EmailLogModel };
