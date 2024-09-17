import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config";
import { TRole } from "../../types";
const { INTEGER, STRING, TEXT, BOOLEAN, DATE, NOW, JSONB } = DataTypes;

interface PermissionsCreationAttributes extends Optional<TRole, 'id' | 'createdAt' | 'updatedAt'> { }

class RolesModel extends Model<TRole, PermissionsCreationAttributes> implements TRole {
    public id!: number;
    public name!: string;
    public description!: string;
    public role_permissions!: string;
    public active!: number;
    public updatedBy!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

RolesModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: STRING,
        allowNull: false,
    },
    description: {
        type: TEXT,
        allowNull: true,
    },
    role_permissions: {  // 'Roles & Permissions relations'
        type: JSONB,
        allowNull: true,
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
    tableName: 'admin_roles',
    timestamps: true,
});

export { RolesModel };
