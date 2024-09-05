import * as express from "express";
import ReviewsController from "../controllers/reviews";
import * as ReviewsValidation from "../validations/reviews";

const router = express.Router();

const {
  validateCreateReviewsBody,
  validateEditReviewsBody,
  validateEditReviewsParams,
  validateListReviewsQuery,
  validateEditMultipleIdsBody,
} = ReviewsValidation;

// ====== Reviews Starts ======
/**
 * @swagger
 * /api/admin/reviews/create:
 *   post:
 *     summary: Create a new Review
 *     tags: [Admin > Reviews]
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
 *              - review_date
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
 *              review_date:
 *                type: string
 *                default: "02/02/2024"
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
 * /api/admin/reviews/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Reviews
 *     tags: [Admin > Reviews]
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
 * /api/admin/reviews/get/{id}:
 *   get:
 *     summary: Get a Review by ID
 *     tags: [Admin > Reviews]
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
 * /api/admin/reviews/update/{id}:
 *   put:
 *     summary: Update a Review
 *     tags: [Admin > Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Reviews to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - review_text
 *              - rating
 *              - review_date
 *              - approved
 *            properties:
 *              review_text:
 *                type: string
 *                default: AdminReviews 
 *              rating:
 *                type: number
 *                default: 1
 *              review_date:
 *                type: string
 *                default: "02/02/2024"
 *              approved:
 *                type: number
 *                default: 0
 *     responses:
 *       '200':
 *         description: Reviews updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Reviews not found
 * 
 * /api/admin/reviews/delete:
 *   delete:
 *     summary: Delete a Reviews
 *     tags: [Admin > Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - ids
 *            properties:
 *              ids:
 *                type: array
 *                default: [1]
 *     responses:
 *       '200':
 *         description: Reviews deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Reviews not found
 */

router.post("/create", validateCreateReviewsBody, ReviewsController.create);
router.get("/list", validateListReviewsQuery, ReviewsController.list);
router.get("/get/:id", validateEditReviewsParams, ReviewsController.get);
router.put("/update/:id", validateEditReviewsParams, validateEditReviewsBody, ReviewsController.update);
router.delete("/delete", validateEditMultipleIdsBody, ReviewsController.delete);
// ====== Reviews Ends ======

export default router;
