import * as express from "express";
import WebReviewsController from "../controllers/web-reviews";
import * as ReviewsValidation from "../validations/reviews";

const router = express.Router();

const {
  validateCreateReviewsBody,
  validateEditReviewsParams,
  validateListReviewsQuery,
} = ReviewsValidation;

// ====== Reviews Starts ======
/**
 * @swagger
 * /api/reviews/create:
 *   post:
 *     summary: Create a new Review
 *     tags: [Frontend > Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - review_text
 *              - rating
 *              - approved
 *              - item_id
 *              - item_type
 *            properties:
 *              review_text:
 *                type: string
 *                default: AdminReviews 
 *              rating:
 *                type: number
 *                default: 1
 *              approved:
 *                type: number
 *                default: 0
 *              item_id:
 *                type: number
 *                default: 12
 *              item_type:
 *                type: text
 *                default: "product"
 *     responses:
 *       '200':
 *         description: Reviews created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
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
 * /api/reviews/get/{id}:
 *   get:
 *     summary: Get a Review by ID
 *     tags: [Frontend > Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the Reviews to retrieve
 *     responses:
 *       '200':
 *         description: Reviews retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the Reviews to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Reviews not found
 * 
 */
router.post("/create", validateCreateReviewsBody, WebReviewsController.add);
router.get("/list", validateListReviewsQuery, WebReviewsController.list);
router.get("/get/:id", validateEditReviewsParams, WebReviewsController.get);
// ====== Reviews Ends ======

export default router;
