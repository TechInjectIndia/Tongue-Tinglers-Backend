import { DataTypes, Model, Optional } from "sequelize";
import { BaseOrder, Notes, Order, BaseNotes } from "../interface/Order";
import { sequelize } from "../../../config";
import RepoProvider from "apps/RepoProvider";

interface NotesCreationAttributes extends Optional<Notes, "id"> {}

class NotesModel
    extends Model<Notes, NotesCreationAttributes>
    implements BaseNotes
{
    notes: string;
    isNew: boolean;
    createdBy: number;

    public static associate() {}

    public static initModel() {
        NotesModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                notes: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                isNew: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
                createdBy: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: "notes",
                timestamps: true,
                underscored: true,
            }
        );
        return NotesModel;
    }

    public static hook() {
        NotesModel.addHook("afterCreate", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "create",
                "Notes",
                instance,
                options
            );
        });

        // After Update Hook - Log the updated fields of the Notes
        NotesModel.addHook("afterUpdate", async (instance, options) => {
            // Now call logModelAction as before
            await RepoProvider.LogRepo.logModelAction(
                "update",
                "Notes",
                instance,
                options
            );
        });

        // After Destroy Hook - Log the deletion of the Notes
        NotesModel.addHook("afterDestroy", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "delete",
                "Notes",
                instance,
                options
            );
        });
    }
}

export { NotesModel };
