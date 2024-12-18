import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import {IBaseAgreementDocs, ENTITY_TYPE_AGREEMENT} from "../../../interfaces/agreement-docs"
import { UserModel } from "../../../database/schema";
interface AgreementDocsCreationAttributes extends Optional<IBaseAgreementDocs, | "id">{}

class AgreementDocModel extends Model<IBaseAgreementDocs, AgreementDocsCreationAttributes> implements IBaseAgreementDocs{
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

    public static associate(){
        this.belongsTo(UserModel, {as: 'createdByUser', foreignKey: 'createdBy'})
        this.belongsTo(UserModel, {as: 'updatedByUser', foreignKey: 'updatedBy'})
        this.belongsTo(UserModel, {as: 'deletedByUser', foreignKey: 'deletedBy'})
    }

    public static initModel(){
        AgreementDocModel.init({
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
                type: DataTypes.ENUM(ENTITY_TYPE_AGREEMENT.FRANCHISE, ENTITY_TYPE_AGREEMENT.ORGANISATION, ENTITY_TYPE_AGREEMENT.PROSPECT),
                allowNull: false,
            },
            agreement_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            doc_link: {
                type: DataTypes.STRING,
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
        }, {
            sequelize,
            modelName: "agreement_docs",
            timestamps: true,
            tableName: "agreement_docs",
        });
        return AgreementDocModel;
    }
}



export {AgreementDocModel};

