import {DataTypes, Model, Optional,} from "sequelize";
import {sequelize} from "../../../config";
import {TRetortProductCategory} from "../../../types";
import {RetortCategoryImageModel} from './retort-category_image'
import {RetortProductsModel} from './retort-product'
import {RetortProductCategoryMapModel} from "./retort-product_category_map";

const {STRING, TEXT, DATE, INTEGER, NOW, BOOLEAN} = DataTypes;

interface RetortProductCategoryCreationAttributes
    extends Optional<TRetortProductCategory, 'id' | 'createdAt' | 'updatedAt'> {
}

class RetortProductCategoryModel
    extends Model<TRetortProductCategory, RetortProductCategoryCreationAttributes>
    implements TRetortProductCategory {
    public id!: number;
    public name: string;
    public slug: string;
    public description: string;
    public active: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    public readonly products?: RetortProductsModel[];

    public static initModel() {

        RetortProductCategoryModel.init({
            id: {
                type: INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: STRING
            },
            slug: {
                type: STRING
            },
            description: {
                type: TEXT
            },
            active: {
                type: BOOLEAN,
                defaultValue: false,
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
            }
        }, {
            sequelize,
            tableName: 'retort_product_category',
            timestamps: true,
        });

        return RetortProductCategoryModel;
    }

    public static associate() {
        RetortProductCategoryModel.belongsToMany(RetortProductsModel, {
            through: RetortProductCategoryMapModel,
            foreignKey: "categoryId",
            otherKey: "productId",
            as: "products", // Ensure this alias matches
        });

        RetortProductsModel.belongsToMany(RetortProductCategoryModel, {
            through: RetortProductCategoryMapModel,
            foreignKey: "productId",
            otherKey: "categoryId",
            as: "categories", // Ensure this alias matches
        });

        RetortProductCategoryModel.hasMany(RetortCategoryImageModel,
            {as: 'images'});

    }

}


export {RetortProductCategoryModel};
