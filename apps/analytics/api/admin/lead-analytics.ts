import { Router } from "express";
import LeadAnalyticsController from "../../controllers/lead-analytics";
import { validateListAnalyticsQuery } from "../../validations/lead-analytics";

const router = Router();

// ====== Analytics Leads Starts ======
/**
 * @swagger
 * /api/admin/analytics/leads/lead-timeline:
 *   get:
 *     summary: Get lead timeline
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
 *         description: Lead analytics retrieved successfully
 *       '400':
 *         description: Invalid request query
 *       '401':
 *         description: Unauthorized
 * 
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

/**
 * @swagger
 * /api/admin/analytics/leads/list:
 *   get:
 *     summary: Retrieve a paginated list of leads with filters, search, and sorting options
 *     tags: [Admin > Analytics > Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: size
 *         in: query
 *         required: false
 *         description: Number of leads to retrieve per page (pagination size)
 *         schema:
 *           type: integer
 *           example: 100
 *       - name: skip
 *         in: query
 *         required: false
 *         description: Number of leads to skip (offset) for pagination
 *         schema:
 *           type: integer
 *           example: 0
 *       - name: search
 *         in: query
 *         required: false
 *         description: Search term to filter leads by name or other searchable fields
 *         schema:
 *           type: string
 *           example: John Doe
 *       - name: sorting
 *         in: query
 *         required: false
 *         description: Sorting criteria, e.g., "id DESC" or "createdAt ASC"
 *         schema:
 *           type: string
 *           example: "id DESC"
 *       - name: filter
 *         in: query
 *         required: false
 *         description: Filter by time range, e.g., "this_week", "last_week", etc.
 *         schema:
 *           type: string
 *           example: this_year
 *       - name: startDate
 *         in: query
 *         required: false
 *         description: Custom start date for filtering leads (used with 'custom' filter)
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-01-01"
 *       - name: endDate
 *         in: query
 *         required: false
 *         description: Custom end date for filtering leads (used with 'custom' filter)
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-12-31"
 *     responses:
 *       '200':
 *         description: Leads retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Response status
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Leads fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Unique lead ID
 *                       name:
 *                         type: string
 *                         description: Name of the lead
 *                       status:
 *                         type: string
 *                         description: Current status of the lead
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Date when the lead was created
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Date when the lead was last updated
 *       '400':
 *         description: Invalid request query
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

router.get("/lead-timeline", LeadAnalyticsController.leadTimeline);
router.get("/lead-status-by-status-type", LeadAnalyticsController.leadStatusByStatusType);
router.get("/lead-status-franchise-id", LeadAnalyticsController.leadStatusByFranchiseId);
router.get("/lead-sources", LeadAnalyticsController.leadSources);
router.get("/lead-status", LeadAnalyticsController.leadStatus);
router.get("/list", LeadAnalyticsController.leadList);
router.get("/conversion-rate", LeadAnalyticsController.conversionRate);
router.get("/sales-pipeline", LeadAnalyticsController.salesPipeline);
// ====== Analytics Leads End======

export default router;
