import * as express from "express";
import ReferralController from "../controllers/";
import { auth } from '../../../middlewares/auth';

const router = express.Router();

// ====== Referral Starts ======
/**
 * @swagger
 * /api/referral:
 *   post:
 *     summary: Create a referral for user
 *     tags: [Referral]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Referral created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/referral/{referral_code}:
 *   get:
 *     summary: Get a Referral by code
 *     tags: [Referral]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: referral_code
 *         required: true
 *         default: 1
 *         schema:
 *           type: number
 *         description: referral_code of the Referral to retrieve
 *     responses:
 *       '200':
 *         description: Referral retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *               description: referral_code of the Referral to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Referral not found
 * 
 */
router.post("/", ReferralController.generate);
router.get("/:referral_code", ReferralController.getAllFranchiseByCode);
router.get("/validate/:referral_code", ReferralController.validate);

export default router;
