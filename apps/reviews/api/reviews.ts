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
 * /api/admin/Reviews/create:
 *   post:
 *     summary: Create a new Reviews
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
 *              - name
 *              - city
 *              - zip_code
 *              - state
 *              - country
 *              - phone_number
 *              - email
 *              - address
 *              - additional_info
 *              - status
 *            properties:
 *              name:
 *                type: string
 *                default: AdminReviews 
 *              city:
 *                type: text
 *                default: city
 *              zip_code:
 *                type: text
 *                default: zip_code
 *              state:
 *                type: text
 *                default: state
 *              country:
 *                type: text
 *                default: country
 *              phone_number:
 *                type: text
 *                default: phone_number
 *              email:
 *                type: text
 *                default: email
 *              address:
 *                type: text
 *                default: address
 *              additional_info:
 *                type: text
 *                default: additional_info
 *              status:
 *                type: boolean
 *                default: 0
 *     responses:
 *       '200':
 *         description: Reviews created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/Reviews/list?size={size}&skip={skip}:
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
 * /api/admin/Reviews/get/{id}:
 *   get:
 *     summary: Get a Reviews by ID
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
 * /api/admin/Reviews/update/{id}:
 *   put:
 *     summary: Update a Reviews
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
 *              - name
 *              - city
 *              - zip_code
 *              - state
 *              - country
 *              - phone_number
 *              - email
 *              - address
 *              - additional_info
 *              - status
 *            properties:
 *              name:
 *                type: string
 *                default: Reviews 
 *              city:
 *                type: text
 *                default: city
 *              zip_code:
 *                type: text
 *                default: zip_code
 *              state:
 *                type: text
 *                default: state
 *              country:
 *                type: text
 *                default: country
 *              phone_number:
 *                type: text
 *                default: phone_number
 *              email:
 *                type: text
 *                default: email
 *              address:
 *                type: text
 *                default: address
 *              additional_info:
 *                type: text
 *                default: additional_info
 *              status:
 *                type: boolean
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
 * /api/admin/Reviews/delete:
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
router.post("/create", validateCreateReviewsBody, ReviewsController.add);
router.get("/list", validateListReviewsQuery, ReviewsController.list);
router.get("/get/:id", validateEditReviewsParams, ReviewsController.get);
router.put("/update/:id", validateEditReviewsParams, validateEditReviewsBody, ReviewsController.update);
router.delete("/delete", validateEditMultipleIdsBody, ReviewsController.delete);
// ====== Reviews Ends ======

export default router;
