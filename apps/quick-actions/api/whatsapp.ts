import express from 'express';
import WhatsAppController from '../controllers/WhatsAppController';

const router = express.Router();

/**
 * @swagger
 * /api/admin/quick-actions/whatsapp:
 *   post:
 *     summary: Send a WhatsApp notification with optional attachments
 *     tags: [QuickActions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 description: "WhatsApp phone number in international format (e.g., +1234567890)"
 *                 example: "+911234567890"
 *               body:
 *                 type: string
 *                 description: "Message body to be sent"
 *                 example: "Hello, your order is ready!"
 *               filePaths:
 *                 type: string
 *                 description: "A JSON string representation of an array of file paths for media attachments"
 *                 example: '[{"path": "https://example.com/file1.jpg", "name": "file1.jpg"}, {"path": "https://example.com/file2.jpg", "name": "file2.jpg"}]'
 *     responses:
 *       200:
 *         description: WhatsApp message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "WhatsApp message sent"
 *                 data:
 *                   type: object
 *                   additionalProperties: true
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                       path:
 *                         type: array
 *                         items:
 *                           type: string
 *                       type:
 *                         type: string
 *                       context:
 *                         type: object
 *                         additionalProperties: true
 */

router.post('/', WhatsAppController.sendNotification);

export default router;
