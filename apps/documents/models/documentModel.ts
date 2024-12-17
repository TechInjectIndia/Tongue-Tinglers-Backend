import {DataTypes, Model, Optional} from "sequelize";
import {BaseDocument, Document} from '../../../interfaces/documents'
import {sequelize} from "../../../config";
import {FranchiseModel, UserModel} from "../index";
import {
    OrganizationModel
} from "../../../apps/organization/database/organization_schema";

interface DocumentCreationAttributes extends Optional<Document, | "id"> {
}

class DocumentModel extends Model<Document, DocumentCreationAttributes> implements BaseDocument {
    doc_name: string;
    entity_id: number;
    entity_type: string;
    link: string;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;


    public static associate() {
        // UserModel.hasMany(DocumentModel, {as: 'documents', foreignKey:'createdBy'})
        this.belongsTo(UserModel, {as: 'created', foreignKey: 'createdBy'})

        this.belongsTo(OrganizationModel, {
            foreignKey: "entity_id",
            as: "organization",
            scope: {entity_type: "organization"},
        });

        this.belongsTo(FranchiseModel, {
            foreignKey: "entity_id",
            as: "franchise",
            scope: {entity_type: "franchise"},
        });
    }
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

export {
    DocumentModel
};
