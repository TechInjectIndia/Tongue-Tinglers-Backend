import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TProductTag } from "../../../types";
const { STRING, INTEGER, DATE, NOW, BOOLEAN } = DataTypes;

interface OrderItemsCreationAttributes extends Optional<TProductTag, 'id' | 'createdAt' | 'updatedAt'> { }

class ProductTagModel extends Model<TProductTag, OrderItemsCreationAttributes> implements TProductTag {
    public id!: number;
    public name!: string;
    public slug!: string;
    public description!: string;
    public active!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProductTagModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: STRING,
    slug: { type: STRING, allowNull: false },
    description: STRING,
    active: {
        type: BOOLEAN,
        allowNull: false,
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
}, {
    sequelize,
    tableName: 'product_tags',
    timestamps: true,
});

export { ProductTagModel };

