import * as express from "express";
import LeadAnalyticsController from "../controllers/lead-analytics";
import * as AnalyticsValidation from "../validations/lead-analytics";

const router = express.Router();

const {
  validateListAnalyticsQuery,
} = AnalyticsValidation;

// ====== Analytics Leads Starts ======
/**
 * @swagger
 * /api/admin/analytics/leads/lead-sources?range={range}:
 *   get:
 *     summary: Get analytics
 *     tags: [Admin > Analytics > Leads]
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

router.get("/lead-sources", validateListAnalyticsQuery, LeadAnalyticsController.leadSources);
router.get("/conversion-rate", LeadAnalyticsController.conversionRate);
router.get("/sales-pipeline", LeadAnalyticsController.salesPipeline);
// ====== Analytics Leads Ends ======

export default router;
