import * as express from 'express';
import OrderController from '../controllers/orderController';
import { validateCreateOrder, validateGetAllOrder, validateGetOrderById } from "../validations/orderValidation";
const {createOrder,getOrderById, getAllOrders, processOrder, proceedToPayment, getOrdersByUserId} = OrderController
const router = express.Router();

router.post('/create', validateCreateOrder, createOrder);
router.get('/:id', validateGetAllOrder, getOrderById);
router.get('/getAll/list', validateGetOrderById, getAllOrders);
// router.get('/:id', validateGetProductsCategoryById,getProductsCategoryById);
// router.get('/slug/:slug', validateGetProductsCategoryBySlug,getProductsCategoryBySlug);
// router.put('/update/:id',validateGetProductsCategoryById,validateUpdateProductsCategory ,updateProductsCategory);
// router.put('/delete/:id',validateGetProductsCategoryById,validateDeleteProductsCategory,deleteProductsCategory);
// router.put('/status/:id', validateGetProductsCategoryById,validateUpdateStatus, updateStatus);
router.post('/process-order', processOrder)
router.post('/proceed-to-payment', proceedToPayment)
router.get('/getOrderByUser', getOrdersByUserId)

export default router;