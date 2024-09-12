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
 * /api/zoho-sign/send-document:
 *   post:
 *     summary: send-document
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
 * /api/zoho-sign/get-status:
 *   get:
 *     summary: send-document
 *     tags: [Zoho Sign]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *           default: get-status
 *         description: type
 *     responses:
 *       '200':
 *         description: Zoho Sign fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: type
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Zoho Sign not found
 */

router.post("/send-document", ZohoSignController.sendDocumentForSigning);
router.get("/get-status", ZohoSignController.getDocumentStatus);
// ====== Zoho Sign Ends ======

export default router;
