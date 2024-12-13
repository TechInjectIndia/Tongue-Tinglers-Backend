import { DataTypes, Model, Optional } from "sequelize";
import {BaseDocument, Document} from '../../../interfaces/documents'
import { sequelize } from "../../../config";
import { UserModel } from "../user/user.model";

interface DocumentCreationAttributes extends Optional<Document, | "id">{}

class DocumentModel extends Model<Document, DocumentCreationAttributes> implements BaseDocument {
    doc_name: string;
    entity_id: number;
    entity_type: string;
    link: string;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;
    
}

DocumentModel.init({
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
        allowNull: false,
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
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: "Documents",
    tableName: "documents",
    timestamps: true,  // Enable automatic timestamps
    paranoid: true,  // Enable soft deletes
})

// UserModel.hasMany(DocumentModel, {as: 'documents', foreignKey:'createdBy'})
DocumentModel.belongsTo(UserModel, {as: 'created', foreignKey:'createdBy'})

export {
    DocumentModel
}