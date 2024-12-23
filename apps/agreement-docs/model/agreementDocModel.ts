import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import {
    ENTITY_TYPE_AGREEMENT,
    IBaseAgreementDocs,
} from "../../../interfaces/agreement-docs";
import { UserModel } from "../../../database/schema/user/user.model";
import RepoProvider from "../../RepoProvider";

interface AgreementDocsCreationAttributes
    extends Optional<IBaseAgreementDocs, "id"> {}

class AgreementDocModel
    extends Model<IBaseAgreementDocs, AgreementDocsCreationAttributes>
    implements IBaseAgreementDocs
{
    id: number;
    entity_id: number;
    entity_type: ENTITY_TYPE_AGREEMENT;
    agreement_id: string;
    doc_link: string;
    signed_date: Date | null;
    error: string | null;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

    public static associate() {
        AgreementDocModel.belongsTo(UserModel, {
            as: "createdByUser",
            foreignKey: "createdBy",
        });
        AgreementDocModel.belongsTo(UserModel, {
            as: "updatedByUser",
            foreignKey: "updatedBy",
        });
        AgreementDocModel.belongsTo(UserModel, {
            as: "deletedByUser",
            foreignKey: "deletedBy",
        });
    }

    public static initModel() {
        AgreementDocModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                entity_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                entity_type: {
                    type: DataTypes.ENUM(
                        ENTITY_TYPE_AGREEMENT.FRANCHISE,
                        ENTITY_TYPE_AGREEMENT.ORGANISATION,
                        ENTITY_TYPE_AGREEMENT.PROSPECT
                    ),
                    allowNull: false,
                },
                agreement_id: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                doc_link: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                signed_date: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
                error: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                createdBy: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                updatedBy: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                deletedBy: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
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
                    field: "deleted_at",
                },
            },
            {
                sequelize,
                modelName: "agreement_docs",
                timestamps: true,
                tableName: "agreement_docs",
            }
        );
        return AgreementDocModel;
    }

    public static hook() {
        AgreementDocModel.addHook("afterCreate", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "create",
                "Agreement Docs",
                instance,
                options
            );
        });

        // After Update Hook - Log the updated fields of the Agreement Docs
        AgreementDocModel.addHook("afterUpdate", async (instance, options) => {
            // Now call logModelAction as before
            await RepoProvider.LogRepo.logModelAction(
                "update",
                "Agreement Docs",
                instance,
                options
            );
        });

        // After Destroy Hook - Log the deletion of the Agreement Docs
        AgreementDocModel.addHook("afterDestroy", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "delete",
                "Agreement Docs",
                instance,
                options
            );
        });
    }
}

export { AgreementDocModel };
