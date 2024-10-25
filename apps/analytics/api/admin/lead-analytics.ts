import { Router } from "express";
import LeadAnalyticsController from "../../controllers/lead-analytics";
import { validateListAnalyticsQuery } from "../../validations/lead-analytics";

const router = Router();

// ====== Analytics Leads Starts ======
/**
 * @swagger
 * /api/admin/analytics/leads/lead-sources?range={range}:
 *   get:
 *     summary: Get lead sources analytics
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
 *           enum: ["Week", "Month", "Year"]
 *         description: Time range for analytics
 *     responses:
 *       '200':
 *         description: Lead sources analytics retrieved successfully
 *       '400':
 *         description: Invalid request query
 *       '401':
 *         description: Unauthorized
 *
 * /api/admin/analytics/leads/conversion-rate?range={range}:
 *   get:
 *     summary: Get conversion rate analytics
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
 *           enum: ["Week", "Month", "Year"]
 *         description: Time range for analytics
 *     responses:
 *       '200':
 *         description: Conversion rate analytics retrieved successfully
 *       '400':
 *         description: Invalid request query
 *       '401':
 *         description: Unauthorized
 *
 * /api/admin/analytics/leads/sales-pipeline?range={range}:
 *   get:
 *     summary: Get sales pipeline analytics
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
 *           enum: ["Week", "Month", "Year"]
 *         description: Time range for analytics
 *     responses:
 *       '200':
 *         description: Sales pipeline analytics retrieved successfully
 *       '400':
 *         description: Invalid request query
 *       '401':
 *         description: Unauthorized
 */

router.get("/lead-sources", validateListAnalyticsQuery, LeadAnalyticsController.leadSources);
router.get("/conversion-rate", validateListAnalyticsQuery, LeadAnalyticsController.conversionRate);
router.get("/sales-pipeline", validateListAnalyticsQuery, LeadAnalyticsController.salesPipeline);
// ====== Analytics Leads Ends ======

export default router;
