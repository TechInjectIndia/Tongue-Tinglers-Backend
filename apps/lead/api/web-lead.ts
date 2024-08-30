import * as express from "express";
import WebLeadController from "../controllers/web-lead";
import * as WebLeadValidation from "../validations/web-lead";

const router = express.Router();

const {
  validateCreateLeadBody,
} = WebLeadValidation;

// ====== Web Lead Starts ======
/**
 * @swagger
 * /api/lead/create:
 *   post:
 *     summary: Create a new Lead
 *     tags: [Frontend > Lead]
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
 *              - source
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
 *                default: lead 
 *              source:
 *                type: text
 *                default: Website
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
 *         description: Lead submit successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */
router.post("/create", validateCreateLeadBody, WebLeadController.create);
// ====== Web Lead Ends ======

export default router;
