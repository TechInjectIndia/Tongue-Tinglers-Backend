import * as express from "express";
import RetortOrderController from "../controllers/orders";
import * as OrderValidation from "../validations/orders";

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
 * /api/admin/retort/order/get-status/{id}:
 *   get:
 *     summary: Get a retort order Status by ID
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
 * /api/admin/retort/order/create:
 *   post:
 *     summary: Create a new order
 *     tags: [Admin > Retort > Orders]
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
 * /api/admin/retort/order/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Order
 *     tags: [Admin > Retort > Orders]
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
 * /api/admin/retort/order/get/{id}:
 *   get:
 *     summary: Get a order by ID
 *     tags: [Admin > Retort > Orders]
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
 * /api/admin/retort/order/update/{id}:
 *   put:
 *     summary: Update a order
 *     tags: [Admin > Retort > Orders]
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
router.post("/create", validateCreateOrderBody, RetortOrderController.create);
router.get("/list", validateListOrderQuery, RetortOrderController.list);
router.get("/get/:id", validateEditOrderParams, RetortOrderController.get);
router.get("/get-status/:id", validateEditOrderParams, RetortOrderController.orderStatus);
router.put("/update/:id", validateEditOrderParams, validateEditOrderBody, RetortOrderController.update);
// ====== order Ends ======

export default router;