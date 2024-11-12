import { Router } from 'express';
import OrderPaymentController from '../controllers/orderPaymentController'; // Adjust path as necessary
import { auth } from '../../../middlewares/auth';

const router = Router();

/**
 * @swagger
 * /api/order-payment/callback:
 *   post:
 *     summary: Handle Razorpay payment webhook callback.
 *     description: Receives and verifies webhook payloads from Razorpay.
 *     tags:
 *       - Order Payment
 *     responses:
 *       200:
 *         description: Webhook processed successfully.
 *       500:
 *         description: Internal server error.
 */
router.post('/callback', OrderPaymentController.callback);

/**
 * @swagger
 * /api/order-payment/fetch/{paymentId}:
 *   get:
 *     summary: Fetch payment details from Razorpay and local repository.
 *     description: Retrieves payment details by payment ID from Razorpay and the local database.
 *     tags:
 *       - Order Payment
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         description: The ID of the payment to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment details fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 paymentDetailsFromRazorpay:
 *                   type: object
 *                 paymentDetailsFromRepo:
 *                   type: object
 *       400:
 *         description: Bad request, missing payment ID.
 *       404:
 *         description: Payment not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/fetch/:paymentId', OrderPaymentController.fetchPayment);

/**
 * @swagger
 * /api/order-payment/generate-link:
 *   post:
 *     summary: Generate a payment link for the user's cart.
 *     description: Creates a payment link based on the user's cart and franchise data.
 *     tags:
 *       - Order Payment
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment link created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       404:
 *         description: Cart or franchise data not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/generate-link', auth, OrderPaymentController.generatePaymentLink);

/**
 * @swagger
 * /api/order-payment/create-payment-intent:
 *   post:
 *     summary: Create a Razorpay payment intent.
 *     description: Generates a payment intent (order) for the user's cart and creates a corresponding order in the system.
 *     tags:
 *       - Order Payment
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment intent created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       404:
 *         description: Cart or franchise data not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/create-payment-intent', auth, OrderPaymentController.createPaymentIntent);
router.post('/payment/complete', auth, OrderPaymentController.createOrderAndClearCart);

export default router;
