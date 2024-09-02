import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TSubMenu } from "../../../types";
import { MENU_STATUS } from '../../../interfaces';
import { MenuModel } from './menu'

const { INTEGER, STRING, ENUM } = DataTypes;

interface SubMenuCreationAttributes extends Optional<TSubMenu, 'id' | 'createdAt' | 'updatedAt'> { }

class SubMenuModel extends Model<TSubMenu, SubMenuCreationAttributes> implements TSubMenu {
    public id!: number;
    public name: string;
    public status!: string;
    public deletedBy!: string;
    public updatedBy!: string;
    public createdBy!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

SubMenuModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: STRING,
        allowNull: false
    },
    status: {
        type: ENUM,
        values: [...Object.values(MENU_STATUS)]
    },
    deletedBy: {
        type: STRING
    },
    updatedBy: {
        type: STRING
    },
    createdBy: {
        type: STRING
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
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        field: "deleted_at",
    },
}, {
    sequelize,
    tableName: 'menus',
    timestamps: true,
    paranoid: true
});

MenuModel.hasMany(SubMenuModel, {
    foreignKey: "menu_id",
});
SubMenuModel.belongsTo(MenuModel, {
    foreignKey: "menu_id",
});

export { SubMenuModel };
