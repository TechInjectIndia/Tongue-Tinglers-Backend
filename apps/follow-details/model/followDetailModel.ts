import { DataTypes, Model, Optional } from "sequelize";
import { FollowDetails, followStatus } from "../interface/followDetails";
import { UserModel } from "apps/user/models/UserTable";
import { sequelize } from "config";
import RepoProvider from "apps/RepoProvider";

interface FollowDetailsCreationAttributes extends Optional<FollowDetails, "id"> { }

class FollowDetailsModel extends Model<FollowDetails> implements FollowDetailsCreationAttributes {
    id: number;
    followedDate: Date | null;
    followedBy: number;
    notes: string | null;
    description: string | null;
    status: followStatus;
    reminder: Date | null;
    createdBy: number;
    updatedBy: number | null;
    deletedBy: number | null;

    static associate() {

        this.belongsTo(UserModel, { as: "created", foreignKey: "createdBy" });
        this.belongsTo(UserModel, { as: "updated", foreignKey: "updatedBy" });
        this.belongsTo(UserModel, { as: "followed", foreignKey: "followedBy" });

    }

    public static initModel() {
        FollowDetailsModel.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            followedDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            followedBy: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            notes: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: followStatus.NOT_FOLLOWED_UP,
            },
            reminder: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            createdBy: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            updatedBy: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            deletedBy: {
                type: DataTypes.INTEGER,
                allowNull: true,
            }

        }, {
            sequelize,
            tableName: "follow_details",
            timestamps: true,
        });
        return FollowDetailsModel
    }

    public static hook() {
        FollowDetailsModel.addHook("afterCreate", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "create",
                "Follow Details",
                instance,
                options
            );
        });

        // After Update Hook - Log the updated fields of the Document
        FollowDetailsModel.addHook("afterUpdate", async (instance, options) => {
            // Now call logModelAction as before
            await RepoProvider.LogRepo.logModelAction(
                "update",
                "Follow Details",
                instance,
                options
            );
        });

        // After Destroy Hook - Log the deletion of the Document
        FollowDetailsModel.addHook("afterDestroy", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "delete",
                "Follow Details",
                instance,
                options
            );
        });
    }
}

export { FollowDetailsModel };