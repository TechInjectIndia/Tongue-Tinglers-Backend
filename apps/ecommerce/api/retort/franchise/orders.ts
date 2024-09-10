import * as express from "express";
import RetortOrderController from "../../../../retort/controllers/franchise/orders";
import * as OrderValidation from "../../../../retort/validations/orders";

const router = express.Router();

const {
  validateEditOrderParams,
  validateListOrderQuery,
} = OrderValidation;

// ====== order Starts ======
/**
 * @swagger
 * /api/franchise/retort/order/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Order
 *     tags: [Franchise > Retort > Orders]
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
 * /api/franchise/retort/order/get/{id}:
 *   get:
 *     summary: Get a order by ID
 *     tags: [Franchise > Retort > Orders]
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
 * /api/franchise/retort/order/get-status/{id}:
 *   get:
 *     summary: Get Order by ID
 *     tags: [Franchise > Retort > Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: number
 *         description: ID of the Order to retrieve
 *     responses:
 *       '200':
 *         description: Order status retreived successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *               description: ID of the Order to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Lead not found
 */
router.get("/list", validateListOrderQuery, RetortOrderController.list);
router.get("/get/:id", validateEditOrderParams, RetortOrderController.get);
router.get("/get-status/:id", validateEditOrderParams, RetortOrderController.getOrderStatus);
// ====== order Ends ======

export default router;
