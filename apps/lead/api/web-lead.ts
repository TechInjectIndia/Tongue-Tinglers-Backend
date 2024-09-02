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
 *              - firstName
 *              - lastName
 *              - email
 *              - city
 *              - state
 *              - zip_code
 *              - country
 *              - phoneNumber
 *              - address
 *              - additional_info
 *            properties:
 *              firstName:
 *                type: string
 *                default: lead 
 *              lastName:
 *                type: string
 *                default: lead 
 *              email:
 *                type: text
 *                default: email
 *              city:
 *                type: text
 *                default: city
 *              state:
 *                type: text
 *                default: state
 *              zip_code:
 *                type: text
 *                default: zip_code
 *              country:
 *                type: text
 *                default: country
 *              phoneNumber:
 *                type: text
 *                default: phone_number
 *              address:
 *                type: text
 *                default: address
 *              additional_info:
 *                type: text
 *                default: additional_info
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
