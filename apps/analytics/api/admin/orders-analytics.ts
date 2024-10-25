import { Router } from "express";
import OrdersAnalyticsController from "../../controllers/orders-analytics";
import { validateListAnalyticsQuery } from "../../validations/orders-analytics";

const router = Router();

// ====== Analytics Orders Starts ======
/**
 * @swagger
 * /api/admin/analytics/orders?range={range}:
 *   get:
 *     summary: Get order analytics
 *     tags: [Admin > Analytics > Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: range
 *         required: true
 *         schema:
 *           type: string
 *           enum: ["Week", "Month", "Year"]
 *         description: Time range for the order analytics
 *         example: "Week"
 *     responses:
 *       '200':
 *         description: Order analytics retrieved successfully
 *       '400':
 *         description: Invalid request query
 *       '401':
 *         description: Unauthorized
 */
router.get("/", validateListAnalyticsQuery, OrdersAnalyticsController.getOrdersCount);

// ====== Analytics Orders Ends ======

export default router;
