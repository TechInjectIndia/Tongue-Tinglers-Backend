import * as express from 'express';
import CartProductController from '../controllers/cartProductController';
import { validateCreateCartProduct, validateDeleteCartProduct, validateUpdateQuantity } from "../validations/cartProductValidation";
const {createCartProduct, updateQuantity, deleteCartProduct}  = CartProductController;

const router = express.Router();

router.post('/create', validateCreateCartProduct, createCartProduct);
// router.get('/list',validateProductList ,getAllProducts);
// router.get('/:id', validateProductById, getProductById);
// router.put('/update/:id',validateProductById, validateUpdateProduct, updateProduct);
router.put('/update-quantity/:id', validateUpdateQuantity ,updateQuantity);
router.delete('/delete/:id', validateDeleteCartProduct ,deleteCartProduct);
// router.put('/update-status/:id',validateChangeProductStatus ,updateStatus);

export default router;