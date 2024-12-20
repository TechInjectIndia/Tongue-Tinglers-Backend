// models/log.model.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../config";

class LogModel extends Model {
  public action!: string; // The action (e.g., 'create', 'update', 'delete')
  public model!: string; // The name of the model being acted upon
  public recordId!: number; // The ID of the record being modified
  public data!: Record<string, any>; // Data of the record being modified
  public userId!: number | null; // User performing the action, optional
  public userName!: string | null; // User performing the action, optional
  public timestamp!: Date; // Timestamp of the operation
}

LogModel.init(
  {
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recordId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true, // To store who performed the action
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true, // To store who performed the action
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "logs",
  }
);

export { LogModel };
