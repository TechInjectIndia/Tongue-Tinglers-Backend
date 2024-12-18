import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config";
import { TPermission } from "../../types";
const { INTEGER, STRING, TEXT, BOOLEAN } = DataTypes;

interface PermissionsCreationAttributes extends Optional<TPermission, 'id' | 'createdAt' | 'updatedAt'> { }

class PermissionModel extends Model<TPermission, PermissionsCreationAttributes> implements TPermission {
    public id!: number;
    public name!: string;
    public description!: string;    
    public active!: number;    
    public updatedBy!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

PermissionModel.init({
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
    },
    active: {
        type: BOOLEAN,
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
    tableName: 'admin_permissions',
    timestamps: true,
});

export { PermissionModel };
