import * as express from 'express';
import CartProductController from '../controllers/cartProductController';
import {
    validateCreateCartProduct,
    validateDeleteCartProduct,
    validateUpdateQuantity
} from "../validations/cartProductValidation";
import CartDetailController
    from "../../cart-details/controllers/cartDetailController";

const {
    createCartProduct,
    updateQuantity,
    deleteCartProduct
} = CartProductController;
const {getCartDetailByUserId} = CartDetailController;

const router = express.Router();


router.get('/detail', getCartDetailByUserId);
router.post('/create', validateCreateCartProduct, createCartProduct);
// router.get('/list',validateProductList ,getAllProducts);
// router.get('/:id', validateProductById, getProductById);
// router.put('/update/:id',validateProductById, validateUpdateProduct, updateProduct);
router.put('/update-quantity/:id', validateUpdateQuantity, updateQuantity);
router.delete('/delete/:id', validateDeleteCartProduct, deleteCartProduct);
// router.put('/update-status/:id',validateChangeProductStatus ,updateStatus);

export default router;
