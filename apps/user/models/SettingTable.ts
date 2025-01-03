import { sequelize } from "config";
import { DataTypes, Model, Optional } from "sequelize";
import { TSettings } from "types";

const { INTEGER, STRING, TEXT, BOOLEAN, DATE, NOW } = DataTypes;

interface SettingsCreationAttributes extends Optional<TSettings, 'id' | 'createdAt' | 'updatedAt'> { }

class SettingsModel extends Model<TSettings, SettingsCreationAttributes> implements TSettings {
    public id!: number;
    public key!: string;
    public value!: string;
    public type!: string;
    public category!: string;
    public environment!: string;
    public active!: number;
    public updatedBy!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

SettingsModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    key: { // Setting key, must be unique
        type: STRING,
        allowNull: false,
    },
    value: { // Setting value stored as text (you can use JSON for complex structures)
        type: TEXT,
    },
    type: { // Type of the value (e.g., 'string', 'number', 'boolean', 'json')
        type: STRING,
        allowNull: false,
    },
    category: { // Optional category to group settings (e.g., 'general', 'user')
        type: INTEGER, 
        allowNull: false,
    },
    environment: {
        type: INTEGER, // Optional environment (e.g., 'production', 'development')
        allowNull: false,
    },
    active: {
        type: BOOLEAN,
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
    tableName: 'settings',
    timestamps: true,
});

export { SettingsModel };
