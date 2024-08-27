import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TProductCategory } from "../../../types/ecommerce";
import { OrderItem } from "./order_item.model";

// Define the attributes for the Category model
// export interface CategoryAttributes {
//     id: number;
//     name: string;
//     slug: string;
//     description: string;
//     active: boolean;
//     createdAt: Date;
//     updatedAt: Date;
//     offset?: number;
//     limit?: number;
//     search?: string;
//     sorting?: typeof OrderItem;
//     trashOnly?: string;
// }



// Define the creation attributes for the Category model
// Since `id`, `createdAt`, and `updatedAt` are auto-generated,
// they are optional when creating a new Category.
interface CategoryCreationAttributes extends Optional<Omit<TProductCategory, 'offset' | 'limit' | 'search' | 'sorting' | 'trashOnly'>, 'id' | 'createdAt' | 'updatedAt'> { }

// Define the Category model class
class Category extends Model<TProductCategory, CategoryCreationAttributes> implements TProductCategory {
    public id!: number;
    public name!: string;
    public slug!: string;
    public description!: string;
    public active!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Additional fields not part of the Sequelize model
    public offset?: number;
    public limit?: number;
    public search?: string;
    public sorting?: typeof OrderItem;
    public trashOnly?: string;
}

// Define the model using Sequelize's define method
Category.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    active: {
        type: DataTypes.BOOLEAN,
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
    tableName: 'categories',
    timestamps: true,
});

export { Category };
