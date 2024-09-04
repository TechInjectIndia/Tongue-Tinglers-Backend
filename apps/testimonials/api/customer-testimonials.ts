import * as express from "express";
import CustomerTestimonialsController from "../controllers/customer-testimonials";
import * as TestimonialsValidation from "../validations/testimonials";

const router = express.Router();

const {
  validateCreateTestimonialsBody,
  validateEditTestimonialsParams,
  validateListTestimonialsQuery,
} = TestimonialsValidation;

// ====== Testimonials Starts ======
/**
 * @swagger
 * /api/customer/testimonials/create:
 *   post:
 *     summary: Create a new Testimonials
 *     tags: [Customer > Testimonials]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - testimonial_text
 *              - rating
 *              - date_submitted
 *              - approved
 *              - item_id
 *              - item_type
 *            properties:
 *              testimonial_text:
 *                type: string
 *                default: AdminTestimonials 
 *              rating:
 *                type: number
 *                default: 0
 *              date_submitted:
 *                type: date
 *                default: 2/02/2024
 *              approved:
 *                type: number
 *                default: 0
 *              item_id:
 *                type: number
 *                default: 1
 *              item_type:
 *                type: text
 *                default: product
 *     responses:
 *       '200':
 *         description: Testimonials created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/customer/testimonials/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Testimonials
 *     tags: [Customer > Testimonials]
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
 *         description: Testimonials retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * /api/customer/testimonials/get/{id}:
 *   get:
 *     summary: Get a Testimonials by ID
 *     tags: [Customer > Testimonials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: number
 *         description: ID of the Testimonials to retrieve
 *     responses:
 *       '200':
 *         description: Testimonials retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *               description: ID of the Testimonials to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Testimonials not found
 * 
 * /api/customer/testimonials/update/{id}:
 *   put:
 *     summary: Update a Testimonials
 *     tags: [Customer > Testimonials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Testimonials to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - testimonial_text
 *              - rating
 *              - date_submitted
 *              - approved
 *            properties:
 *              testimonial_text:
 *                type: string
 *                default: AdminTestimonials 
 *              rating:
 *                type: number
 *                default: 0
 *              date_submitted:
 *                type: date
 *                default: "2/02/2024"
 *              approved:
 *                type: number
 *                default: 0
 *     responses:
 *       '200':
 *         description: Testimonials updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Testimonials not found
 * 
 * /api/customer/testimonials/delete:
 *   delete:
 *     summary: Delete a Testimonials
 *     tags: [Customer > Testimonials]
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
 *         description: Testimonials deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Testimonials not found
 */
router.post("/create", validateCreateTestimonialsBody, CustomerTestimonialsController.create);
router.get("/list", validateListTestimonialsQuery, CustomerTestimonialsController.list);
router.get("/get/:id", validateEditTestimonialsParams, CustomerTestimonialsController.get);
// ====== Testimonials Ends ======

export default router;
