import * as express from "express";
import * as AnalyticsValidation from "../../validations/retort-analytics";

const router = express.Router();

const {
  validateListAnalyticsQuery,
} = AnalyticsValidation;

// ====== Analytics Orders Starts ======
/**
 * @swagger
 * /api/franchise/orders?size={size}&skip={skip}:
 *   get:
 *     summary: Get Analytics Orders
 *     tags: [Franchise > Analytics > Orders]
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
 *         description: Product Category retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */
router.get("/list", validateListAnalyticsQuery, ()=>{});
// ====== Analytics Orders Ends ======

export default router;
