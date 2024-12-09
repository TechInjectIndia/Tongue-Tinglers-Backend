import * as express from 'express';
import OrderController from '../controllers/orderController';
// import { validateCreateProductsCategory, validateDeleteProductsCategory, validateGetAllProductsCategory, validateGetProductsCategoryById, validateGetProductsCategoryBySlug, validateUpdateProductsCategory, validateUpdateStatus } from '../validations/productsCategoryValidation';
// import { validateCreateProduct, validateProductList, validateProductById, validateUpdateProduct, validateDeleteProduct, validateChangeProductStatus } from "../validations/productValidations";
const {createOrder,getOrderById, getAllOrders} = OrderController
const router = express.Router();

router.post('/create', createOrder);
router.get('/:id', getOrderById);
router.get('/getAll/list',getAllOrders);
// router.get('/:id', validateGetProductsCategoryById,getProductsCategoryById);
// router.get('/slug/:slug', validateGetProductsCategoryBySlug,getProductsCategoryBySlug);
// router.put('/update/:id',validateGetProductsCategoryById,validateUpdateProductsCategory ,updateProductsCategory);
// router.put('/delete/:id',validateGetProductsCategoryById,validateDeleteProductsCategory,deleteProductsCategory);
// router.put('/status/:id', validateGetProductsCategoryById,validateUpdateStatus, updateStatus);

export default router;