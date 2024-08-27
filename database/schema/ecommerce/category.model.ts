import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TProductCategory } from "../../../types/ecommerce";

// Define the attributes for the Category model

// Define the creation attributes for the Category model
interface CategoryCreationAttributes extends Optional<TProductCategory, 'id' | 'createdAt' | 'updatedAt'> { }

// Define the Category model class
class CategoryModel extends Model<TProductCategory, CategoryCreationAttributes> implements TProductCategory {
    public id!: number;
    public name!: string;
    public slug!: string;
    public description!: string;
    public active!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the Category model
CategoryModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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

export { CategoryModel };
