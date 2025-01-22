
import CheckoutController from "../controllers/CheckoutController";
import {Router} from "express";
import {
    orderParamsValidation, preSaleOrderParamsValidation,
    validate
} from "../validations/order-validations";

const router = Router();
/**
 * @swagger
 * /api/admin/area/create:
 * tags:
 *   name: Order
 *   description: API for managing Order

 * paths:
 *   /api/admin/order/:
 *     get:
 *       summary: Get Order Details
 *       description: Retrieves order details including shipping, billing, and coupon information
 *       parameters:
 *         - in: query
 *           name: user_id
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID of the user requesting the order
 *         - in: query
 *           name: coupon_code
 *           schema:
 *             type: string
 *           required: false
 *           description: Optional coupon code to apply to the order
 *         - in: query
 *           name: shippingAddId
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID of the shipping address
 *         - in: query
 *           name: billingAddId
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID of the billing address
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   anomalyArr:
 *                     type: array
 *                     items: {}
 *                   cancelledItems:
 *                     type: array
 *                     items: {}
 *                   coupon:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *                   createdBy:
 *                     type: string
 *                     nullable: true
 *                   customerDetails:
 *                     type: object
 *                     nullable: true
 *                   deletedAt:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *                   deletedBy:
 *                     type: string
 *                     nullable: true
 *                   deliveryDetails:
 *                     type: object
 *                     nullable: true
 *                   deliveryStatus:
 *                     type: string
 *                   id:
 *                     type: integer
 *                   items:
 *                     type: array
 *                     items: {}
 *                   notes:
 *                     type: array
 *                     items: {}
 *                   orderItems:
 *                     type: array
 *                     items: {}
 *                   paymentId:
 *                     type: integer
 *                   paymentType:
 *                     type: string
 *                   shippingAddress:
 *                     type: object
 *                     nullable: true
 *                   status:
 *                     type: string
 *                     enum: ['PENDING']
 *                   total:
 *                     type: number
 *                   totalDiscount:
 *                     type: number
 *                   totalShipping:
 *                     type: number
 *                   totalTax:
 *                     type: number
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   updatedBy:
 *                     type: string
 *         '400':
 *           description: Bad Request - Invalid parameters
 *         '401':
 *           description: Unauthorized - Authentication required
 *         '500':
 *           description: Internal Server Error
 *       tags:
 *         - Orders
 */
// router.get('/getCart', getCartDetailByUserId);
// router.get('/presale', validate(preSaleOrderParamsValidation), CheckoutController.getPreSaleOrder);
router.get('/', validate(orderParamsValidation), CheckoutController.getOrder);

export default router;
