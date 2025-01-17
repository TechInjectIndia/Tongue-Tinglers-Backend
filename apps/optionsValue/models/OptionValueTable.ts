import { BaseOptionsValue, OptionsValue } from "../interface/optionValue";
import { sequelize } from "config";
import { DataTypes, Model, Optional } from "sequelize";

interface OptionsValueCreationAttributes extends Optional<OptionsValue, | "id"> {
}

class OptionsValueModel extends Model<OptionsValue, OptionsValueCreationAttributes> implements BaseOptionsValue {
    id: number;
    option_id: number;
    name: string;
    isStockable:boolean
}

OptionsValueModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        option_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isStockable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: "OptionsValues",
        tableName: "options_values",
        timestamps: true,  // Enable automatic timestamps
        paranoid: true,  // Enable soft deletes
    },
);



export { OptionsValueModel };