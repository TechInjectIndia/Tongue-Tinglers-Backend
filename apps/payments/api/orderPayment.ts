import * as express from "express";
import OrderPaymentController from "../controllers/OrderPaymentController";
import * as PaymentsValidation from "../validations/orderPaymentValidations";

const router = express.Router();

const {
  validateGenerateLinkBody
} = PaymentsValidation;

/**
 * @swagger
 * /api/payments/order/generate-link:
 *   post:
 *     summary: Generate a payment link
 *     tags: [Orders > Payments]
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
 * /api/payments/order/fetch-payment/{paymentId}:
 *   get:
 *     summary: Fetch payment details by payment ID
 *     tags: [Orders > Payments]
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
 * 
 * /api/payments/order/callback:
 *   get:
 *     summary: Razorpay webhook callback handler
 *     description: Handles Razorpay webhook events such as payment captured and payment failed.
 *     tags: [Orders > Payments]
 *     security:
 *       - none: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - event
 *               - payload
 *             properties:
 *               entity:
 *                 type: string
 *                 description: The entity type, which is usually 'event' for webhook events.
 *                 example: "event"
 *               account_id:
 *                 type: string
 *                 description: Razorpay account ID.
 *                 example: "acc_BFQ7uQEaa7j2z7"
 *               event:
 *                 type: string
 *                 description: The event type triggered by Razorpay (e.g., 'payment.captured', 'payment.failed').
 *                 example: "payment.captured"
 *               contains:
 *                 type: array
 *                 description: The list of entities included in the event payload.
 *                 items:
 *                   type: string
 *                 example: ["payment"]
 *               payload:
 *                 type: object
 *                 description: Event-specific payload, including payment details.
 *                 properties:
 *                   payment:
 *                     type: object
 *                     properties:
 *                       entity:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "pay_DESlfW9H8K9uqM"
 *                           entity:
 *                             type: string
 *                             example: "payment"
 *                           amount:
 *                             type: number
 *                             example: 100
 *                           currency:
 *                             type: string
 *                             example: "INR"
 *                           status:
 *                             type: string
 *                             example: "captured"
 *                           method:
 *                             type: string
 *                             example: "netbanking"
 *                           bank:
 *                             type: string
 *                             example: "HDFC"
 *                           created_at:
 *                             type: integer
 *                             example: 1567674599
 *     parameters:
 *       - in: header
 *         name: x-razorpay-signature
 *         schema:
 *           type: string
 *         required: true
 *         description: Razorpay signature to verify webhook authenticity.
 *     responses:
 *       '200':
 *         description: Webhook received and verified
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Webhook received and verified"
 *       '400':
 *         description: Invalid signature or request body
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Invalid signature"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Internal server error"
 */

// ====== Payments Starts ======
router.post("/order/generate-link", OrderPaymentController.generatePaymentLink);
router.get("/order/fetch-payment/:paymentId", OrderPaymentController.fetchPayment);
router.post("/order/callback", OrderPaymentController.callback);
// ====== Payments Ends ======

export default router;
