import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config";
import { TAuditLog } from "../../types";
const { INTEGER, STRING, TEXT, BOOLEAN, DATE, NOW } = DataTypes;

// Define creation attributes
interface AuditLogsCreationAttributes extends Optional<TAuditLog, 'id' | 'createdAt' | 'updatedAt'> { }

class AuditLogsModel extends Model<TAuditLog, AuditLogsCreationAttributes> implements TAuditLog {
    public id!: number;
    public user_id!: number;
    public description!: string;
    public activity_type!: string;
    public updatedBy!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Method to create a new log entry
    public static async createLog(
        userId: number,
        description: string,
        activityType: string,
        updatedBy: number
    ): Promise<AuditLogsModel> {
        const log = await this.create({
            user_id: userId,
            description,
            activity_type: activityType,
            updatedBy,
        });
        return log;
    }

    // Method to retrieve logs by user ID
    public static async getLogsByUserId(userId: number): Promise<AuditLogsModel[]> {
        return await this.findAll({ where: { user_id: userId } });
    }

    // Method to retrieve logs by activity type
    public static async getLogsByActivityType(activityType: string): Promise<AuditLogsModel[]> {
        return await this.findAll({ where: { activity_type: activityType } });
    }

    // Method to delete a log by ID
    public static async deleteLogById(logId: number): Promise<number> {
        const result = await this.destroy({ where: { id: logId } });
        return result;
    }
}

// Initialize the model
AuditLogsModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: INTEGER,
        allowNull: false,
    },
    activity_type: {
        type: TEXT,
        allowNull: false,
    },
    description: {
        type: TEXT,
        allowNull: false,
    },
    updatedBy: {
        type: INTEGER,
        allowNull: false,
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
}, {
    sequelize,
    tableName: 'audit_logs',
    timestamps: true,
});

export { AuditLogsModel };
