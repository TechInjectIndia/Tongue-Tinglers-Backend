import * as express from "express";
import WebReviewsController from "../controllers/web-reviews";
import * as ReviewsValidation from "../validations/reviews";

const router = express.Router();

const {
  validateListReviewsQuery,
} = ReviewsValidation;

// ====== Reviews Starts ======
/**
 * @swagger
 * /api/reviews/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Reviews
 *     tags: [Frontend > Reviews]
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
 *         description: Reviews retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 */
router.get("/list", validateListReviewsQuery, WebReviewsController.list);
// ====== Reviews Ends ======

export default router;
