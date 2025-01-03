import { DataTypes, Model, Optional } from "sequelize";
import { BaseOptions, Options } from "../interface/options";
import { OptionsValueModel } from "apps/optionsValue/models/OptionValueTable";
import { sequelize } from "config";
import RepoProvider from "apps/RepoProvider";


interface OptionsCreationAttributes extends Optional<Options, | "id"> {
}

class OptionsModel extends Model<Options, OptionsCreationAttributes> implements BaseOptions {
    id: number;
    name: string;

    public static associate() {
        OptionsModel.hasMany(OptionsValueModel, { as: 'options', foreignKey: 'option_id' })
        OptionsValueModel.belongsTo(OptionsModel, { as: 'options', foreignKey: 'option_id' });
    }

    public static initModel() {
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
        return OptionsModel
    }

    public static hook() {
        OptionsModel.addHook("afterCreate", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction("create", "Options",
                instance, options);
        });

        // After Update Hook - Log the updated fields of the Options
        OptionsModel.addHook("afterUpdate", async (instance, options) => {
            // Now call logModelAction as before
            await RepoProvider.LogRepo.logModelAction("update", "Options",
                instance, options);
        });

        // After Destroy Hook - Log the deletion of the Options
        OptionsModel.addHook("afterDestroy", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction("delete", "Options",
                instance, options);
        });
    }


}

export { OptionsModel };