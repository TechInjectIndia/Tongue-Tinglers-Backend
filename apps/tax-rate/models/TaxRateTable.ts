import { DataTypes, Model, Optional } from "sequelize";
import { TaxRateTable } from "../interface/taxRate";
import { sequelize } from "../../../config";

interface TaxRateCreationAttributes
    extends Optional<TaxRateTable, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
}

class TaxRateModel extends Model<TaxRateTable, TaxRateCreationAttributes>
implements TaxRateTable {
    public id!: number;
    public title!: string;
    public value!: number;
    public createdBy!: number;
    public updatedBy!: number | null;
    public deletedBy!: number | null;
    public createdAt!: Date;
    public updatedAt!: Date;
    public deletedAt!: Date;

    public static initModel(){
        TaxRateModel.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            value: {
                type: DataTypes.DOUBLE,
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
                defaultValue: null,
                field: "deleted_at",
            },
        }, {
            sequelize,
            tableName: 'tax_rate',
            timestamps: true,
            paranoid: true,
        })
        return TaxRateModel
    }
}

export {TaxRateModel}