import * as express from "express";
import WebTestimonialsController from "../controllers/web-testimonials";
import * as TestimonialsValidation from "../validations/testimonials";

const router = express.Router();

const {
  validateListTestimonialsQuery,
} = TestimonialsValidation;

// ====== Testimonials Starts ======
/**
 * @swagger
 * /api/testimonials/get?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Testimonials
 *     tags: [Frontend > Testimonials]
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
 * 
 */
router.get("/get", validateListTestimonialsQuery, WebTestimonialsController.list);
// ====== Testimonials Ends ======

export default router;
