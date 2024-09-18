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
 *              - prefilledValues
 *            properties:
 *              templateId:
 *                type: string
 *                default: admin
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
 * /api/zoho-sign/get-documents:
 *   post:
 *     summary: get-documents
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
 */

router.post('/send-document', ZohoSignController.sendDocumentUsingTemplate);
router.post('/get-documents', ZohoSignController.getDocuments);
router.post('/callback', ZohoSignController.callback);
// router.post('/sign-document', ZohoSignController.signDocument);
// ====== Zoho Sign Ends ======

export default router;
