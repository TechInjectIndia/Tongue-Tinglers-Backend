import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { CartProduct, BaseCartProduct } from "../../../interfaces/cart_products";
import { ProductModel } from "../product/productModel";
import { ProductOptionsModel } from "../product-options/productOptionsModel";

interface CartProductCreationAttributes extends Optional<CartProduct, | "id"> {
}

class CartProductModel extends Model<CartProduct, CartProductCreationAttributes> implements BaseCartProduct {
    id: number;
    product_id: number;
    product_option_id: number;
    quantity: number;
}

CartProductModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    product_option_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
},{
    sequelize,
    modelName: 'CartProduct',
    tableName: 'cart_products'
})

CartProductModel.belongsTo(ProductModel, {
    foreignKey: 'product_id',  // Foreign key in CartProductModel
    as: 'product'  // Alias to use in the include
});

CartProductModel.belongsTo(ProductOptionsModel, {
    foreignKey: 'product_option_id',  // Foreign key in CartProductModel
    as: 'variations'  // Alias to use in the include
});

// CartProductModel.belongsTo(ProductModel, {as: 'product', foreignKey: 'product_id'})
// CartProductModel.belongsTo(ProductOptionsModel, {as: 'product_option', foreignKey: 'product_option_id'})

export {CartProductModel}