import { Router } from "express";
import LeadAnalyticsController from "../../controllers/lead-analytics";
import { validateListAnalyticsQuery } from "../../validations/lead-analytics";

const router = Router();

// ====== Analytics Leads Starts ======
/**
 * @swagger
 * /api/admin/analytics/leads/lead-status-by-status-type:
 *   get:
 *     summary: Get lead status by status type analytics
 *     tags: [Admin > Analytics > Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: filter
 *         in: query
 *         required: false
 *         description: filter via "this_week", "last_week", "this_month", "last_month", "this_year", "last_year","custom"
 *         schema:
 *           type: string
 *           example: this_week
 *       - name: statusType
 *         in: query
 *         required: true
 *         description: statusType
 *         schema:
 *           type: string
 *           example: new
 *     responses:
 *       '200':
 *         description: Lead sources analytics retrieved successfully
 *       '400':
 *         description: Invalid request query
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/analytics/leads/lead-status-franchise-id:
 *   get:
 *     summary: Get lead status by franchise id analytics
 *     tags: [Admin > Analytics > Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: filter
 *         in: query
 *         required: false
 *         description: filter via "this_week", "last_week", "this_month", "last_month", "this_year", "last_year","custom"
 *         schema:
 *           type: string
 *           example: this_week
 *       - name: franchiseId
 *         in: query
 *         required: true
 *         description: franchiseId
 *         schema:
 *           type: string
 *           example: 136546897
 *     responses:
 *       '200':
 *         description: Lead sources analytics retrieved successfully
 *       '400':
 *         description: Invalid request query
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/analytics/leads/lead-sources:
 *   get:
 *     summary: Get lead sources analytics
 *     tags: [Admin > Analytics > Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: filter
 *         in: query
 *         required: false
 *         description: filter via "this_week", "last_week", "this_month", "last_month", "this_year", "last_year","custom"
 *         schema:
 *           type: string
 *           example: this_week
 *     responses:
 *       '200':
 *         description: Lead sources analytics retrieved successfully
 *       '400':
 *         description: Invalid request query
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/analytics/leads/lead-status:
 *   get:
 *     summary: Get lead status analytics
 *     tags: [Admin > Analytics > Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: filter
 *         in: query
 *         required: false
 *         description: filter via "this_week", "last_week", "this_month", "last_month", "this_year", "last_year","custom"
 *         schema:
 *           type: string
 *           example: this_week
 *     responses:
 *       '200':
 *         description: Lead status analytics retrieved successfully
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

router.get("/lead-status-by-status-type", validateListAnalyticsQuery, LeadAnalyticsController.leadStatusByStatusType);
router.get("/lead-status-franchise-id", validateListAnalyticsQuery, LeadAnalyticsController.leadStatusByFranchiseId);
router.get("/lead-sources", validateListAnalyticsQuery, LeadAnalyticsController.leadSources);
router.get("/lead-status", validateListAnalyticsQuery, LeadAnalyticsController.leadStatus);
router.get("/conversion-rate", validateListAnalyticsQuery, LeadAnalyticsController.conversionRate);
router.get("/sales-pipeline", validateListAnalyticsQuery, LeadAnalyticsController.salesPipeline);
// ====== Analytics Leads Ends ======

export default router;
