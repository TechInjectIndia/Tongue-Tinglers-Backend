import * as express from "express";
import PaymentsController from "../controllers";
import * as PaymentsValidation from "../validations";
import { hasPermission } from '../../../middlewares';

const router = express.Router();

const {
  validateGenerateLinkBody
} = PaymentsValidation;

/**
 * @swagger
 * /api/payments/generate-link:
 *   post:
 *     summary: Generate a payment link
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contract_id
 *             properties:
 *               contract_id:
 *                 type: string
 *                 default: 3cd37ab0-7d00-4861-b373-93ec63bf1f32
 *                 description: contract Id
 *     responses:
 *       '200':
 *         description: Payment link generated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

// ====== Payments Starts ======
router.post("/generate-link", hasPermission('payment', 'create'), validateGenerateLinkBody, PaymentsController.generatePaymentLink);
// ====== Payments Ends ======

export default router;
