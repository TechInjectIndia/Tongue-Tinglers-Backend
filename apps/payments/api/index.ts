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
 * 
 * /api/payments/fetch-payment/{paymentId}:
 *   get:
 *     summary: Fetch payment details by payment ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier for the payment
 *         example: "payment_1234567890"
 *     responses:
 *       '200':
 *         description: Payment details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 payment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "payment_1234567890"
 *                     amount:
 *                       type: number
 *                       example: 100.00
 *                     currency:
 *                       type: string
 *                       example: "USD"
 *                     status:
 *                       type: string
 *                       example: "completed"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-09-20T12:00:00Z"
 *       '404':
 *         description: Payment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Payment not found."
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */

// ====== Payments Starts ======
router.post("/generate-link", hasPermission('payment', 'create'), validateGenerateLinkBody, PaymentsController.generatePaymentLink);
router.get("/fetch-payment/:paymentId", hasPermission('payment', 'view'), PaymentsController.fetchPayment);

// ====== Payments Ends ======

export default router;
