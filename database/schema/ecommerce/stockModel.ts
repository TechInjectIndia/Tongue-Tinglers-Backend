// stock.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { StockAttributes } from "../../../interfaces";

const { INTEGER } = DataTypes;

interface StockCreationAttributes extends Optional<StockAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

class StockModel extends Model<StockAttributes, StockCreationAttributes> implements StockAttributes {
    public id!: number;
    public productId!: number;
    public quantity!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

StockModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    productId: {
        type: INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id',
        },
    },
    quantity: {
        type: INTEGER,
        allowNull: false,
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
}, {
    sequelize,
    tableName: 'stock',
    timestamps: true,
});

export { StockModel };
