import * as express from "express";
import CustomerReviewsController from "../controllers/customer-reviews";
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
 * /api/customer/reviews/create:
 *   post:
 *     summary: Create a new Review
 *     tags: [Customer > Reviews]
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
 *              - item_id
 *              - item_type
 *            properties:
 *              review_text:
 *                type: string
 *                default: AdminReviews 
 *              rating:
 *                type: number
 *                default: 1
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
 * /api/customer/reviews/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Reviews
 *     tags: [Customer > Reviews]
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
 * /api/customer/reviews/get/{id}:
 *   get:
 *     summary: Get a Review by ID
 *     tags: [Customer > Reviews]
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
router.post("/create", validateCreateReviewsBody, CustomerReviewsController.create);
router.get("/list", validateListReviewsQuery, CustomerReviewsController.list);
router.get("/get/:id", validateEditReviewsParams, CustomerReviewsController.get);
// ====== Reviews Ends ======

export default router;
