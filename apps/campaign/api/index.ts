// src/routes/CampaignRoutes.ts
import * as express from "express";
import CampaignController from "../controllers/CampaignController";
import * as CampaignValidation from "../validations/CampaignValidation";

const router = express.Router();

const {
  validateCreateCampaignBody,
  validateEditCampaignBody,
  validateEditCampaignParams,
  validateListCampaignQuery,
  validateDeleteMultipleIdsBody,
} = CampaignValidation;

// ====== Campaigns Starts ====== 
/**
 * @swagger
 * /api/admin/campaign/create:
 *   post:
 *     summary: Create a new campaign Ad
 *     tags: [Campaigns-Ad]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - questions
 *               - startDate
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Summer Campaign"
 *               description:
 *                 type: string
 *                 example: "A campaign for summer promotions"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-01T00:00:00Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-08-31T23:59:59Z"
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                       example: "What is your favorite color?"
 *                     type:
 *                       type: string
 *                       enum: [boolean, string, multi_choice, single_choice, number]
 *                       example: "single_choice"
 *                     required:
 *                       type: boolean
 *                       example: true
 *                     options:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           label:
 *                             type: string
 *                             example: "Red"
 *                           value:
 *                             type: string
 *                             example: "red"
 *                 example: 
 *                   - question: "What is your favorite color?"
 *                     type: "single_choice"
 *                     required: true
 *                     options: 
 *                       - label: "Red"
 *                         value: "red"
 *                       - label: "Blue"
 *                         value: "blue"
 *                       - label: "Green"
 *                         value: "green"
 *     responses:
 *       '201':
 *         description: Campaign created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/campaign/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all campaigns Ad
 *     tags: [Campaigns-Ad]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         required: false
 *         schema:
 *           type: integer
 *         description: Size of the retrieved data
 *       - in: query
 *         name: skip
 *         required: false
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
 * /api/admin/campaign/get/{id}:
 *   get:
 *     summary: Get a campaign Ad by ID
 *     tags: [Campaigns-Ad]
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
 * 
 * /api/admin/campaign/update/{id}:
 *   put:
 *     summary: Update a campaign Ad
 *     tags: [Campaigns-Ad]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the campaign to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                     type:
 *                       type: string
 *                       enum: [boolean, string, multi_choice, single_choice, number]
 *                     required:
 *                       type: boolean
 *                     options:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           label:
 *                             type: string
 *                           value:
 *                             type: string
 *     responses:
 *       '200':
 *         description: Campaign updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Campaign not found
 * 
 * /api/admin/campaign/delete:
 *   delete:
 *     summary: Delete campaigns Ad
 *     tags: [Campaigns-Ad]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ids
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["1", "2"]
 *     responses:
 *       '200':
 *         description: Campaigns deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Campaigns not found
 */
router.post("/create", validateCreateCampaignBody, CampaignController.create);
router.get("/list", validateListCampaignQuery, CampaignController.list);
router.get("/get/:id", validateEditCampaignParams, CampaignController.get);
router.put("/update/:id", validateEditCampaignParams, validateEditCampaignBody, CampaignController.update);
router.delete("/delete", validateDeleteMultipleIdsBody, CampaignController.delete);

export default router;
