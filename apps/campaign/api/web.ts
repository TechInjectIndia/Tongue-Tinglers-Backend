// src/routes/CampaignRoutes.ts
import * as express from "express";
import WebCampaignController from "../controllers/WebCampaignController";
import * as CampaignSubmissionsValidation from "../validations/CampaignSubmissionsValidation";

const router = express.Router();

const {
  validateCreateCampaignBody,
  validateEditCampaignParams,
  validateListCampaignQuery,
} = CampaignSubmissionsValidation;

/**
 * @swagger
 *
 * /api/campaign-ad/save:
 *   post:
 *     summary: Create a new campaign submission
 *     tags: [Frontend > Campaigns-Ad]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               campaignId:
 *                 type: string
 *                 description: The ID of the campaign associated with the submission
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               response:
 *                 type: string
 *                 description: The actual response provided by the user
 *                 example: "This is my response to the campaign."
 *             required:
 *               - campaignId
 *               - response
 *     responses:
 *       '201':
 *         description: Campaign submission created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Unique identifier for the submission
 *                       example: "123e4567-e89b-12d3-a456-426614174001"
 *                     campaignId:
 *                       type: string
 *                       description: ID of the associated campaign
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     response:
 *                       type: string
 *                       description: The actual response provided by the user
 *                       example: "This is my response to the campaign."
 *       '400':
 *         description: Invalid request, missing required fields
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 *
 * /api/campaign-ad/list:
 *   get:
 *     summary: Get all campaigns Ad
 *     tags: [Frontend > Campaigns-Ad]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         required: true
 *         schema:
 *           type: integer
 *         description: Size of the retrieved data
 *       - in: query
 *         name: skip
 *         required: true
 *         schema:
 *           type: integer
 *         description: How many rows to skip
 *     responses:
 *       '200':
 *         description: Campaigns retrieved successfully
 *       '400':
 *         description: Invalid request
 *       '401':
 *         description: Unauthorized
 *
 * /api/campaign-ad/get/{id}:
 *   get:
 *     summary: Get a campaign Ad by ID
 *     tags: [Frontend > Campaigns-Ad]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the campaign to retrieve
 *     responses:
 *       '200':
 *         description: Campaign retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Campaign not found
 */

router.post("/save", validateCreateCampaignBody, WebCampaignController.save);
router.get("/list", validateListCampaignQuery, WebCampaignController.list);
router.get("/get/:id", validateEditCampaignParams, WebCampaignController.get);

export default router;
