import * as express from "express";
import TestimonialsController from "../controllers/testimonials";
import * as TestimonialsValidation from "../validations/testimonials";

const router = express.Router();

const {
  validateCreateTestimonialsBody,
  validateEditTestimonialsBody,
  validateEditTestimonialsParams,
  validateListTestimonialsQuery,
  validateEditMultipleIdsBody,
} = TestimonialsValidation;

// ====== Testimonials Starts ======
/**
 * @swagger
 * /api/admin/Testimonials/create:
 *   post:
 *     summary: Create a new Testimonials
 *     tags: [Admin > Testimonials]
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
 *                default: AdminTestimonials 
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
 *         description: Testimonials created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/Testimonials/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Testimonials
 *     tags: [Admin > Testimonials]
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
 * /api/admin/Testimonials/get/{id}:
 *   get:
 *     summary: Get a Testimonials by ID
 *     tags: [Admin > Testimonials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the Testimonials to retrieve
 *     responses:
 *       '200':
 *         description: Testimonials retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the Testimonials to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Testimonials not found
 * 
 * /api/admin/Testimonials/update/{id}:
 *   put:
 *     summary: Update a Testimonials
 *     tags: [Admin > Testimonials]
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
 *                default: Testimonials 
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
 *         description: Testimonials updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Testimonials not found
 * 
 * /api/admin/Testimonials/delete:
 *   delete:
 *     summary: Delete a Testimonials
 *     tags: [Admin > Testimonials]
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
router.post("/create", validateCreateTestimonialsBody, TestimonialsController.add);
router.get("/list", validateListTestimonialsQuery, TestimonialsController.list);
router.get("/get/:id", validateEditTestimonialsParams, TestimonialsController.get);
router.put("/update/:id", validateEditTestimonialsParams, validateEditTestimonialsBody, TestimonialsController.update);
router.delete("/delete", validateEditMultipleIdsBody, TestimonialsController.delete);
// ====== Testimonials Ends ======

export default router;
