import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config";
import { TAuditLogs } from "../../types";
const { INTEGER, STRING, TEXT, BOOLEAN } = DataTypes;

interface AuditLogsCreationAttributes extends Optional<TAuditLogs, 'id' | 'createdAt' | 'updatedAt'> { }

class AuditLogsModel extends Model<TAuditLogs, AuditLogsCreationAttributes> implements TAuditLogs {
    public id!: number;
    public user_id!: number;
    public description!: string;
    public activity_type!: string;
    public updatedBy!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AuditLogsModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: { // Refers to the Users table.
        type: INTEGER,
        allowNull: false,
    },
    activity_type: { // Type of activity, e.g., 'Role Assignment', 'Permissions Change'.
        type: TEXT,
        allowNull: false,
    },
    description: { // Detailed record of the activity.
        type: TEXT,
        allowNull: false,
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
    tableName: 'audit_logs',
    timestamps: true,
});

export { AuditLogsModel };
