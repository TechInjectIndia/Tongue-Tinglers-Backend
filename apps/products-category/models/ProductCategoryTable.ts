import { ProductOptionsModel } from "apps/product-options/models/productOptionTable";
import { PRODUCT_STATUS } from "apps/product/interface/Product";
import { ProductModel } from "apps/product/model/productTable";
import { BaseProductsCategory, CATEGORY_TYPE, PRODUCT_CATEGORY_STATUS, ProductsCategory } from "apps/products-category/interface/Category";
import RepoProvider from "apps/RepoProvider";
import { sequelize } from "config";
import { DataTypes, Model, Optional, } from "sequelize";
interface ProductsCategoryCreationAttributes extends Optional<ProductsCategory, 'id'> { }

class ProductsCategoryModel extends Model<ProductsCategory, ProductsCategoryCreationAttributes> implements BaseProductsCategory {
   name: string;
   slug: string;
   description: string;
   status: PRODUCT_CATEGORY_STATUS; 
   type: CATEGORY_TYPE;
   createdBy: number;
   updatedBy: number;
   deletedBy: number;
   createdAt: Date; 
   updatedAt: Date;
   deletedAt: Date;

   public static associate(){
    ProductsCategoryModel.hasMany(ProductModel, {as: "product_category", foreignKey: "category"})
    ProductModel.belongsTo(ProductsCategoryModel, {as: "productCategory", foreignKey: "category"})
   }

   public static initModel(){
    ProductsCategoryModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING
        },
        slug: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.ENUM(PRODUCT_STATUS.ACTIVE, PRODUCT_STATUS.INACTIVE),
        },
        type: {
            type: DataTypes.ENUM(CATEGORY_TYPE.RETORT, CATEGORY_TYPE.PACKAGING),
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
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
            field: "deleted_at",
        },
    }, {
        sequelize,
        tableName: 'products_category',
        timestamps: true,
    });
    return ProductsCategoryModel;
   }

   public static hook(){
    ProductsCategoryModel.addHook(
                "afterCreate",
                async (instance, options) => {
                    await RepoProvider.LogRepo.logModelAction(
                        "create",
                        "Product Category",
                        instance,
                        options
                    );
                }
            );
    
            // After Update Hook - Log the updated fields of the Product Category
            ProductsCategoryModel.addHook(
                "afterUpdate",
                async (instance, options) => {
                    // Now call logModelAction as Product Category
                    await RepoProvider.LogRepo.logModelAction(
                        "update",
                        "Product Category",
                        instance,
                        options
                    );
                }
            );
    
            // After Destroy Hook - Log the deletion of the Product Category
            ProductOptionsModel.addHook(
                "afterDestroy",
                async (instance, options) => {
                    await RepoProvider.LogRepo.logModelAction(
                        "delete",
                        "Product Category",
                        instance,
                        options
                    );
                }
            );
   }
}





export { ProductsCategoryModel };