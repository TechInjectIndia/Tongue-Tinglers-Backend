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
 *              - contractId
 *              - recipientName
 *              - recipientEmail
 *              - prefilledValues
 *              - notes
 *            properties:
 *              templateId:
 *                type: string
 *                default: 72565000000032727
 *              recipientName:
 *                type: string
 *                default: admin
 *              recipientEmail:
 *                type: string
 *                default: "navdeepsaroya4@gmail.com"
 *              contractId:
 *                type: string
 *              prefilledValues:
 *                type: string
 *                default: "{\"Name-:\": \"navdeep12\", \"Signature-:\": \"echo12\", \"Date-:\": \"today12\"}"
 *              notes:
 *                type: string
 *     responses:
 *       '200':
 *         description: Zoho Sign send successfully
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
 *         description: All template fields retreived
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Zoho Sign not found
 * 
 * /api/zoho-sign/document/{documentId}:
 *   get:
 *     summary: get all details by document ID
 *     tags: [Zoho Sign]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the document to retrieve
 *     responses:
 *       '200':
 *         description: Zoho Sign doc retreived successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Zoho Sign not found
 * 
 * /api/zoho-sign/callback:
 *   post:
 *     summary: Handle webhook notifications from Zoho Sign
 *     tags: [Zoho Sign]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notifications:
 *                 type: object
 *                 properties:
 *                   performed_by_email:
 *                     type: string
 *                     example: "user@example.com"
 *                   performed_by_name:
 *                     type: string
 *                     example: "John Doe"
 *                   performed_at:
 *                     type: integer
 *                     example: 1695296200000
 *                   reason:
 *                     type: string
 *                     example: "Document signed successfully."
 *                   activity:
 *                     type: string
 *                     example: "Signing"
 *                   operation_type:
 *                     type: string
 *                     example: "RequestSigningSuccess"
 *                   action_id:
 *                     type: string
 *                     example: "123456789"
 *                   ip_address:
 *                     type: string
 *                     example: "192.168.1.1"
 *               requests:
 *                 type: object
 *                 properties:
 *                   request_name:
 *                     type: string
 *                     example: "Document Signing Request"
 *                   request_id:
 *                     type: string
 *                     example: "requestId12345"
 *                   document_ids:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         document_name:
 *                           type: string
 *                           example: "Contract Document"
 *                         document_id:
 *                           type: string
 *                           example: "signedDoc123"
 *     responses:
 *       '200':
 *         description: Successfully processed the webhook notification
 *       '400':
 *         description: Bad Request - Invalid input data
 *       '401':
 *         description: Unauthorized - Invalid token
 *       '404':
 *         description: Not Found - Requested resource does not exist
 */

router.post('/send-document', ZohoSignController.sendDocumentUsingTemplate);
router.get('/templates', ZohoSignController.getTemplates);
router.get('/document/:documentId', ZohoSignController.getDocument);
router.get('/get-fields/:templateId', ZohoSignController.getFieldsByTemplate);
router.post('/callback', ZohoSignController.callback);
// ====== Zoho Sign Ends ======

export default router;
