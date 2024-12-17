import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { BaseOptions, Options } from "../../../interfaces/options";
import { OptionsValueModel } from "../optionsValue/optionsValueModel";

interface OptionsCreationAttributes extends Optional<Options, | "id"> {
}

class OptionsModel extends Model<Options, OptionsCreationAttributes> implements BaseOptions{
    id: number;
    name: string;   
}

OptionsModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Options",
        tableName: "options",
        timestamps: true,  // Enable automatic timestamps
        paranoid: true,  // Enable soft deletes
    },
);

OptionsModel.hasMany(OptionsValueModel, { as: 'options', foreignKey: 'option_id' })
OptionsValueModel.belongsTo(OptionsModel, { as: 'options', foreignKey: 'option_id' });

export { OptionsModel };