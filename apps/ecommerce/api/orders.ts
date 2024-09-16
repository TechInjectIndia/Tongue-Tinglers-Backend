import * as express from "express";
import OrderController from "../controllers/orders";
import * as OrderValidation from "../validations/orders";
import { hasPermission } from '../../../middlewares';

const router = express.Router();

const {
  validateCreateOrderBody,
  validateEditOrderBody,
  validateEditOrderParams,
  validateListOrderQuery,
} = OrderValidation;

// ====== order Starts ======
/**
 * @swagger
 * /api/admin/order/create:
 *   post:
 *     summary: Create a new order
 *     tags: [Admin > Ecommerce > Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - trackingNumber
 *              - shippingAddress
 *              - totalPrice
 *              - cart_items
 *            properties:
 *              trackingNumber:
 *                type: string
 *                default: product12 
 *              shippingAddress:
 *                type: text
 *                default: desc
 *              totalPrice:
 *                type: text
 *                default: 123
 *              cart_items:
 *                type: text
 *                default: "[0]"
 *     responses:
 *       '200':
 *         description: order created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/order/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Order
 *     tags: [Admin > Ecommerce > Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         default: 10
 *         required: true
 *         schema:
 *           type: integer
 *         description: Size of the retreived data
 *       - in: query
 *         name: skip
 *         default: 0
 *         required: true
 *         schema:
 *           type: integer
 *         description: How many Rows want to skip
 *     responses:
 *       '200':
 *         description: Order retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/order/get-status/{id}:
 *   get:
 *     summary: Get a order Status by ID
 *     tags: [Admin > Ecommerce > Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the order to retrieve
 *     responses:
 *       '200':
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the Order to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Order not found
 * 
 * /api/admin/order/get/{id}:
 *   get:
 *     summary: Get a order by ID
 *     tags: [Admin > Ecommerce > Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the order to retrieve
 *     responses:
 *       '200':
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the Order to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Order not found
 * 
 * /api/admin/order/update/{id}:
 *   put:
 *     summary: Update a order
 *     tags: [Admin > Ecommerce > Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - active
 *            properties:
 *              name:
 *                type: string
 *                default: AdminorderNew
 *              active:
 *                type: string
 *                default: 1
 *     responses:
 *       '200':
 *         description: Order updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Order not found
 */
router.post("/create", validateCreateOrderBody, OrderController.create);
router.get("/list", validateListOrderQuery, OrderController.list);
router.get("/get/:id", validateEditOrderParams, OrderController.get);
router.get("/get-status/:id", validateEditOrderParams, OrderController.orderStatus);
router.put("/update/:id", validateEditOrderParams, validateEditOrderBody, OrderController.update);
// ====== order Ends ======

export default router;
