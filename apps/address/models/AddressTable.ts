import { DataTypes, Model, Optional } from "sequelize";
import { Address } from "../interface/Address";
import { sequelize } from "config";
import RepoProvider from "apps/RepoProvider";
import { LogModel } from "apps/logs/models/LogsTable";

const { STRING, INTEGER } = DataTypes;

interface AddressCreationAttributes extends Optional<Address, "id"> {}

class AddressModel
    extends Model<Address, AddressCreationAttributes>
    implements Address
{
    id: number;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;

    public static associate(){
        AddressModel.hasMany(LogModel, {
            foreignKey: "recordId", // The column in LogModel that references LeadsModel
            sourceKey: "id",        // The primary key in LeadsModel
            constraints: false,     // Disable constraints as `model` is dynamic
            as: "logs",             // Alias for the association
          });
    }

    public static initModel() {
        AddressModel.init(
            {
                id: { type: INTEGER, autoIncrement: true, primaryKey: true },
                street: { type: STRING, allowNull: false },
                city: { type: STRING, allowNull: false },
                state: { type: STRING, allowNull: false },
                postalCode: { type: STRING, allowNull: false },
                country: { type: STRING, allowNull: false },
                phoneNumber: { type: STRING, allowNull: false },
                firstName: { type: STRING, allowNull: false },
                lastName: { type: STRING, allowNull: false },
            },
            {
                sequelize,
                tableName: "addresses",
                timestamps: true,
            }
        );
        return AddressModel;
    }

    public static hook() {
        AddressModel.addHook("afterCreate", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "create",
                "Address",
                instance,
                options
            );
        });

        // After Update Hook - Log the updated fields of the Leads
        AddressModel.addHook("afterUpdate", async (instance, options) => {
            // Now call logModelAction as before
            await RepoProvider.LogRepo.logModelAction(
                "update",
                "Address",
                instance,
                options
            );
        });

        // After Destroy Hook - Log the deletion of the Leads
        AddressModel.addHook("afterDestroy", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "delete",
                "Address",
                instance,
                options
            );
        });
    }
}

export { AddressModel };
