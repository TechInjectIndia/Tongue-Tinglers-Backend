import * as express from "express";
import ShippingHistoryController from "../controllers/ShippingHistoryController";
import * as ShippingHistoryValidation from "../validations/shippingHistoryValidations";

const shippingHistoryController = new ShippingHistoryController();

const router = express.Router();

const {
    validateCreateShippingHistoryBody,
    validateEditShippingHistoryBody,
    validateEditShippingHistoryParams,
    validateListShippingHistoryQuery,
} = ShippingHistoryValidation;

// ====== Shipping History Starts ======
/**
 * @swagger
 * /api/admin/shipping-history/create:
 *   post:
 *     summary: Create a new shipping history record
 *     tags: [Admin > Ecommerce > Shipping History]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - orderId
 *              - shippingData
 *            properties:
 *              orderId:
 *                type: string
 *                default: order123
 *              shippingData:
 *                type: object
 *                properties:
 *                  date:
 *                    type: string
 *                    default: "2024-11-12"
 *                  activities:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        status:
 *                          type: string
 *                          default: "shipped"
 *                        trackingNumber:
 *                          type: string
 *                          default: "TRACK123"
 *     responses:
 *       '201':
 *         description: Shipping history created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/shipping-history/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all shipping history records
 *     tags: [Admin > Ecommerce > Shipping History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         required: true
 *         schema:
 *           type: integer
 *         description: Size of the retrieved data
 *       - in: query
 *         name: skip
 *         required: true
 *         schema:
 *           type: integer
 *         description: How many rows to skip
 *     responses:
 *       '200':
 *         description: Shipping history retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/shipping-history/get/{id}:
 *   get:
 *     summary: Get a shipping history record by ID
 *     tags: [Admin > Ecommerce > Shipping History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the shipping history record to retrieve
 *     responses:
 *       '200':
 *         description: Shipping history retrieved successfully
 *       '404':
 *         description: Shipping history not found
 * 
 * /api/admin/shipping-history/delete/{id}:
 *   delete:
 *     summary: Delete a shipping history record
 *     tags: [Admin > Ecommerce > Shipping History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the shipping history record to delete
 *     responses:
 *       '200':
 *         description: Shipping history deleted successfully
 *       '404':
 *         description: Shipping history not found
 */
router.post("/create", validateCreateShippingHistoryBody, shippingHistoryController.addShippingHistory);
router.get("/list", validateListShippingHistoryQuery, shippingHistoryController.getShippingHistory);
router.get("/get/:id", validateEditShippingHistoryParams, shippingHistoryController.getShippingHistory);
router.put("/update/:id", validateEditShippingHistoryBody, shippingHistoryController.updateShippingHistory);
router.delete("/delete/:id", validateEditShippingHistoryParams, shippingHistoryController.deleteShippingHistory);
// ====== Shipping History Ends ======

export default router;
