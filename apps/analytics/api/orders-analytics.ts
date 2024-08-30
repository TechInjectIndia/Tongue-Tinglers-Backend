import * as express from "express";
import OrdersAnalyticsController from "../controllers/orders-analytics";
import * as AnalyticsValidation from "../validations/orders-analytics";

const router = express.Router();

const {
  validateListAnalyticsQuery,
} = AnalyticsValidation;

// ====== Analytics Orders Starts ======
/**
 * @swagger
 * /api/admin/analytics/orders?range={range}:
 *   get:
 *     summary: Get analytics
 *     tags: [Admin > Analytics > Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: range
 *         default: Week
 *         required: true
 *         schema:
 *           type: string
 *           enum: [ "Week", "Month", "Year"]
 *         description: Get order analytics
 *     responses:
 *       '200':
 *         description: Product Category retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */
router.get("/", validateListAnalyticsQuery, OrdersAnalyticsController.getOrdersCount);
// ====== Analytics Orders Ends ======

export default router;
