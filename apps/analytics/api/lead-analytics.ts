import * as express from "express";
import LeadAnalyticsController from "../controllers/lead-analytics";
import * as AnalyticsValidation from "../validations/analytics";

const router = express.Router();

const {
  validateListAnalyticsQuery,
} = AnalyticsValidation;

// ====== Analytics Leads Starts ======
/**
 * @swagger
 * /api/admin/analytics/leads/lead-sources?start_date={start_date}&end_date={end_date}:
 *   get:
 *     summary: Get all ProductCategory
 *     tags: [Admin > Analytics > Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: start_date
 *         default: "02/02/2024"
 *         required: true
 *         schema:
 *           type: string
 *         description: start_date of the retreived data
 *       - in: query
 *         name: end_date
 *         default: "05/02/2024"
 *         required: true
 *         schema:
 *           type: string
 *         description: How many Rows want to end_date
 *     responses:
 *       '200':
 *         description: Product Category retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */

router.get("/lead-sources", LeadAnalyticsController.leadSources);
router.get("/conversion-rate", LeadAnalyticsController.conversionRate);
router.get("/sales-pipeline", LeadAnalyticsController.salesPipeline);
// ====== Analytics Leads Ends ======

export default router;
