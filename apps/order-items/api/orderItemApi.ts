import * as express from 'express';
import OrderItemController from '../controllers/orderItemController';
import { validateCreateOrderItem, validateGetOrderItemsById, validateOrderItemDelete, validateUpdateCouponDiscount, validateUpdateOrderItem, validateUpdatePointsDiscount, validateUpdateQuantity, validateUpdateStudentDiscount, validateBulkOrderItems } from "../validations/orderItemValidation";
const { createOrderItem, getOrderItemsById, deleteOrderItem, updateCouponDiscount, updateOrderItem, updatePointsDiscount, updateQuantity, updateStudentDiscount, createBulkOrderItem } = OrderItemController
const router = express.Router();

router.post('/create', validateCreateOrderItem,createOrderItem);
router.post('/bulk/create', validateBulkOrderItems,createBulkOrderItem);
router.get('/:id', validateGetOrderItemsById, getOrderItemsById);
router.put('/update/:id', validateUpdateOrderItem, updateOrderItem);
router.delete('/delete/:id', validateOrderItemDelete, deleteOrderItem);
router.put('/update-quantity/:id', validateUpdateQuantity, updateQuantity);
router.put('/update-coupon-discount/:id', validateUpdateCouponDiscount, updateCouponDiscount);
router.put('/update-points-discount/:id', validateUpdatePointsDiscount, updatePointsDiscount);
router.put('/update-student-discount/:id', validateUpdateStudentDiscount, updateStudentDiscount);

export default router