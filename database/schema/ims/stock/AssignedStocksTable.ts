import { Model, Optional, DataTypes } from "sequelize";
import { IAssignedStock } from "../../../../apps/ims/stock/interfaces/IAssignedStock";
import { sequelize } from "../../../../config";
const { STRING, DATE, INTEGER, NOW, } = DataTypes;


interface AssignedStockCreationAttributes extends Optional<IAssignedStock, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> { }

class AssignedStocksTable extends Model<IAssignedStock, AssignedStockCreationAttributes> implements IAssignedStock {
    public id: number;
    public stockId: number;
    public orderId: number;
    public quantity: number;
    public createdBy: number;
    public updatedBy: number | null;
    public deletedBy: number | null;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly deletedAt: Date | null;
}

AssignedStocksTable.init({
    id: {
        type: INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    stockId: {
        type: INTEGER,
        allowNull: false,
    },
    orderId: {
        type: INTEGER,
        allowNull: false,
    },
    quantity: {
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
    tableName: 'AssignedStocks',
    timestamps: true,
    paranoid: true,
});


/* associations */

// CommissionTable.hasMany(CommissionEntityMapTable, {
//     foreignKey: {
//         allowNull: false,
//         name: 'commissionId',
//     },
// });
// CommissionEntityMapTable.belongsTo(CommissionTable, {
//     foreignKey: {
//         allowNull: false,
//         name: 'commissionId',
//     },
// });

export { AssignedStocksTable };