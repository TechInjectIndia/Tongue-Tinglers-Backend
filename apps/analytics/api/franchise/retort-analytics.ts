import * as express from "express";
import RetortAnalyticsController from "../../controllers/retort-analytics";
import * as AnalyticsValidation from "../../validations/retort-analytics";

const router = express.Router();

const {
  validateListAnalyticsQuery,
} = AnalyticsValidation;

// ====== Analytics Retort Starts ======
/**
 * @swagger
 * 
 * /api/franchise/retort/sources?start_date={start_date}&end_date={end_date}:
 *   get:
 *     summary: Get Lead sources
 *     tags: [Admin > Analytics > Retort]
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
 *         description: Analytics retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/analytics/lead/conversion-rate?size={size}&skip={skip}:
 *   get:
 *     summary: Get Conversion rate
 *     tags: [Admin > Analytics > Retort]
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
 *         description: Analytics retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/analytics/lead/sales-pipeline?size={size}&skip={skip}:
 *   get:
 *     summary: Get Sales pipeline (??)
 *     tags: [Admin > Analytics > Retort]
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
 *         description: Analytics retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 */
router.get("/list", validateListAnalyticsQuery, RetortAnalyticsController.list);
// ====== Analytics Retort Ends ======

export default router;
