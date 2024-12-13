import { Model, Optional, DataTypes } from "sequelize";
import { IStock } from "../../../../apps/ims/stock/interfaces/IStock";
import { sequelize } from "../../../../config";
import { AssignedStocksTable } from "./AssignedStocksTable";
const { STRING, DATE, INTEGER, NOW, } = DataTypes;


interface StockCreationAttributes extends Optional<IStock, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> { }


class StocksTable extends Model<IStock, StockCreationAttributes> implements IStock {
    public id: number;
    public sku: string;
    public supplierId: number;
    public minimumStockQuantity: number;
    public totalQuantity: number;
    public assignedQuantity: number;
    public createdBy: number;
    public updatedBy: number | null;
    public deletedBy: number | null;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly deletedAt: Date | null;
}

StocksTable.init({
    id: {
        type: INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    sku: {
        type: STRING,
        allowNull: false,
        unique: true,
    },
    supplierId: {
        type: STRING,
        allowNull: false,
    },
    minimumStockQuantity: {
        type: INTEGER,
        allowNull: false,
    },
    totalQuantity: {
        type: INTEGER,
        allowNull: false,
    },
    assignedQuantity: {
        type: INTEGER,
        allowNull: false,
    },
    createdBy: {
        type: INTEGER,
        allowNull: false
    },
    updatedBy: {
        type: INTEGER,
        allowNull: true
    },
    deletedBy: {
        type: INTEGER,
        allowNull: true
    },
    createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
        field: "created_at",
    },
    updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
        field: "updated_at",
    },
    deletedAt: {
        type: DATE,
        allowNull: true,
        defaultValue: null,
        field: "deleted_at",
    },
}, {
    sequelize,
    tableName: 'Stocks',
    timestamps: true,
    paranoid: true,
});


/* associations */

StocksTable.hasMany(AssignedStocksTable, {
    foreignKey: {
        allowNull: false,
        name: 'stockId',
    },
});
AssignedStocksTable.belongsTo(StocksTable, {
    foreignKey: {
        allowNull: false,
        name: 'stockId',
    },
});


console.log("MY CODE DONE");




export { StocksTable };