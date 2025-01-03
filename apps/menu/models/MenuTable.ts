import { sequelize } from "config";
import { MENU_STATUS } from "interfaces";
import { DataTypes, Model, Optional } from "sequelize";
import { TMenu } from "types";


const { INTEGER, STRING, ENUM } = DataTypes;

interface MenuCreationAttributes extends Optional<TMenu, 'id' | 'createdAt' | 'updatedAt'> { }

class MenuModel extends Model<TMenu, MenuCreationAttributes> implements TMenu {
    public id!: number;
    public name: string;
    public images!: string;
    public status!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

MenuModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    images: {
        type: STRING,
        allowNull: false
    },
    name: {
        type: STRING,
        allowNull: false
    },
    status: {
        type: ENUM,
        values: [...Object.values(MENU_STATUS)]
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
    tableName: 'menu',
    timestamps: true,
});



export { MenuModel };
