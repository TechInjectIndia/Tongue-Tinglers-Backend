import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";

// Define the attributes for the Category model
interface CategoryAttributes {
    id: number;
    name: string;
    slug: string;
    description?: string;
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define the creation attributes for the Category model
// Since `id`, `createdAt`, and `updatedAt` are auto-generated,
// they are optional when creating a new Category.
interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Define the Category model class
class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
    public id!: number;
    public name!: string;
    public slug!: string;
    public description?: string;
    public active!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
        field: 'updated_at'
    },
}, {
    sequelize,
    tableName: 'categories',
    timestamps: true,
});

export { Category };
