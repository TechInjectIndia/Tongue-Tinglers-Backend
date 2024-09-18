import * as express from "express";
import ZohoSignController from "../controllers/zohosign";

const router = express.Router();

// ====== Zoho Sign Starts ======
/**
 * @swagger
 * /api/zoho-sign/send-document:
 *   post:
 *     summary: create-document
 *     tags: [Zoho Sign]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - templateId
 *              - franchiseId
 *              - recipientName
 *              - recipientEmail
 *              - prefilledValues
 *            properties:
 *              templateId:
 *                type: string
 *                default: admin
 *              recipientName:
 *                type: string
 *                default: admin
 *              recipientEmail:
 *                type: string
 *                default: "admin@gmail.com"
 *              franchiseId:
 *                type: string
 *              prefilledValues:
 *                type: text
 *                default: '{"Name-:":"navdeep12","Signature-:":"echo12","Date-:":"today12"}'
 *     responses:
 *       '200':
 *         description: Zoho Sign send successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Zoho Sign not found
 * 
 * /api/zoho-sign/documents:
 *   get:
 *     summary: get documents
 *     tags: [Zoho Sign]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Zoho Sign created successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Zoho Sign not found
 * 
 * /api/zoho-sign/templates:
 *   get:
 *     summary: get templates
 *     tags: [Zoho Sign]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Zoho Sign created successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Zoho Sign not found
 * 
 * /api/zoho-sign/get-fields/{templateId}:
 *   get:
 *     summary: get all fields by template ID
 *     tags: [Zoho Sign]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: templateId
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the template to retrieve
 *     responses:
 *       '200':
 *         description: Zoho Sign created successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Zoho Sign not found
 */

router.post('/send-document', ZohoSignController.sendDocumentUsingTemplate);
router.get('/templates', ZohoSignController.getTemplates);
router.get('/get-fields/:templateId', ZohoSignController.getFieldsByTemplate);
router.post('/callback', ZohoSignController.callback);
router.get('/documents', ZohoSignController.getDocuments);
// router.post('/sign-document', ZohoSignController.signDocument);
// ====== Zoho Sign Ends ======

export default router;
