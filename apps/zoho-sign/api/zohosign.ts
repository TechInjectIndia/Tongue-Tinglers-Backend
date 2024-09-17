import * as express from "express";
import ZohoSignController from "../controllers/zohosign";
import * as ZohoSignValidation from "../validations/zohosign";

const router = express.Router();

const {
    validateZohoSignParams,
} = ZohoSignValidation;

// ====== Zoho Sign Starts ======
/**
 * @swagger
 * /api/zoho-sign/create-document:
 *   post:
 *     summary: create-document
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

router.post('/create-document', ZohoSignController.sendDocumentUsingTemplate);
router.post('/get-documents', ZohoSignController.getDocuments);
router.post('/callback', ZohoSignController.callback);
// router.post('/sign-document', ZohoSignController.signDocument);
// ====== Zoho Sign Ends ======

export default router;
