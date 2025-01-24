import { DataTypes, Model, Optional } from "sequelize";


import { BaseDocument, SaveDocument } from "../interface/Document";
import { UserModel } from "apps/user/models/UserTable";
import { sequelize } from "config/database";
import RepoProvider from "apps/RepoProvider";
import { LogModel } from "apps/logs/models/LogsTable";

interface DocumentCreationAttributes extends Optional<SaveDocument, "id"> { }

class DocumentModel
    extends Model<SaveDocument, DocumentCreationAttributes>
    implements BaseDocument {
    doc_name: string;
    entity_id: number;
    entity_type: string;
    link: string;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;

    static associate() {
        // UserModel.hasMany(DocumentModel, {as: 'documents',
        // foreignKey:'createdBy'})
        this.belongsTo(UserModel, { as: "createdByUser", foreignKey: "createdBy" });
        this.belongsTo(UserModel, { as: "updatedByUser", foreignKey: "updatedBy" });
        this.belongsTo(UserModel, { as: "deletedByUser", foreignKey: "deletedBy" });
        DocumentModel.hasMany(LogModel,{
            foreignKey: "recordId",
            sourceKey: "id",
            constraints: false,
            as: "logs",
        })
    }

    public static initModel() {
        DocumentModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                doc_name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                entity_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                entity_type: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                link: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                createdBy: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                updatedBy: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                deletedAt: {
                    type: DataTypes.DATE,
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
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    defaultValue: DataTypes.NOW,
                },
            },
            {
                sequelize,
                modelName: "Documents",
                tableName: "documents",
                timestamps: true, // Enable automatic timestamps
                paranoid: true, // Enable soft deletes
            }
        );
        return DocumentModel;
    }

    public static hook() {
        DocumentModel.addHook("afterCreate", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "create",
                "Document",
                instance,
                options
            );
        });

        // After Update Hook - Log the updated fields of the Document
        DocumentModel.addHook("afterUpdate", async (instance, options) => {
            // Now call logModelAction as before
            await RepoProvider.LogRepo.logModelAction(
                "update",
                "Document",
                instance,
                options
            );
        });

        // After Destroy Hook - Log the deletion of the Document
        DocumentModel.addHook("afterDestroy", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "delete",
                "Document",
                instance,
                options
            );
        });
    }
}

export { DocumentModel };
