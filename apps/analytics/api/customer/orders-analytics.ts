import * as express from "express";
import * as AnalyticsValidation from "../../validations/orders-analytics";

const router = express.Router();

const {
  validateListAnalyticsQuery,
} = AnalyticsValidation;

// ====== Analytics Orders Starts ======
/**
 * @swagger
 * /api/customer/analytics/orders?range={range}:
 *   get:
 *     summary: Get analytics
 *     tags: [Customer > Analytics > Orders]
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
router.get("/", validateListAnalyticsQuery, ()=>{});
// ====== Analytics Orders Ends ======

export default router;
