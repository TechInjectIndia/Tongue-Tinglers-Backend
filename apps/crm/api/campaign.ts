import * as express from "express";
import CampaignController from "../controllers/campaign";
import * as CampaignValidation from "../validations/campaign";
import emailCampaignRouter from "../../crm/api/email";
import InquiryRouter from "../../crm/api/inquiry";
import SubscriberRouter from "../../crm/api/subscriber";
import { hasPermission } from '../../../middlewares';

const router = express.Router();
const {
  validateCreateCampaignBody,
  validateEditCampaignBody,
  validateEditCampaignParams,
  validateListCampaignQuery,
  validateEditMultipleIdsBody,
  validateCampaignAssignmentBody,
  validatesendCampaignAssignmentBody
} = CampaignValidation;

// ====== Campiagn Starts ======
/**
 * @swagger 
 * 
 * /api/admin/crm/create:
 *   post:
 *     summary: Create a new Campiagn
 *     tags: [Admin > CRM > Campiagn]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - subject
 *              - body
 *              - scheduledAt
 *              - status
 *            properties:
 *              name:
 *                type: string
 *                default: AdminCampaignNew
 *              subject:
 *                type: string
 *                default: subject
 *              body:
 *                type: string
 *                default: body
 *              scheduledAt:
 *                type: string
 *                default: "2000-10-31T01:30:00.000-05:00"
 *              status:
 *                type: boolean
 *                default: "draft"
 *     responses:
 *       '200':
 *         description: Campiagn created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/crm/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Campaign
 *     tags: [Admin > CRM > Campiagn]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         default: 10
 *         required: true
 *         schema:
 *           type: integer
 *         description: Size of the retreived data
 *       - in: query
 *         name: skip
 *         default: 0
 *         required: true
 *         schema:
 *           type: integer
 *         description: How many Rows want to skip
 *     responses:
 *       '200':
 *         description: Campiagn retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * /api/admin/crm/get/{id}:
 *   get:
 *     summary: Get a Campaign by ID
 *     tags: [Admin > CRM > Campiagn]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the Campaign to retrieve
 *     responses:
 *       '200':
 *         description: Campaign retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the Campaign to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Campaign not found
 * 
 * /api/admin/crm/update/{id}:
 *   put:
 *     summary: Update a Campaign
 *     tags: [Admin > CRM > Campiagn]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Campaign to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - subject
 *              - body
 *              - scheduledAt
 *              - status
 *            properties:
 *              name:
 *                type: string
 *                default: AdminCampaignNew
 *              subject:
 *                type: string
 *                default: subject
 *              body:
 *                type: string
 *                default: body
 *              scheduledAt:
 *                type: string
 *                default: "2000-10-31T01:30:00.000-05:00"
 *              status:
 *                type: boolean
 *                default: "draft"
 *     responses:
 *       '200':
 *         description: Campiagn updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Campaign not found
 * 
 * /api/admin/crm/delete:
 *   delete:
 *     summary: Delete a Campaign
 *     tags: [Admin > CRM > Campiagn]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - ids
 *            properties:
 *              ids:
 *                type: array
 *                default: [1]
 *     responses:
 *       '200':
 *         description: Campaign deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Campiagn not found
 *
 * /api/admin/crm/send-campaign:
 *   post:
 *     summary: send-campaign
 *     tags: [Admin > CRM > Campiagn]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - campaignId
 *            properties:
 *              campaignId:
 *                type: number
 *                default: 1
 *     responses:
 *       '200':
 *         description: Campiagn created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */
router.post("/create", validateCreateCampaignBody, CampaignController.create);
router.get("/list", validateListCampaignQuery, CampaignController.list);
router.get("/get/:id", validateEditCampaignParams, CampaignController.get);
router.put("/update/:id", validateEditCampaignParams, validateEditCampaignBody, CampaignController.update);
router.delete("/delete", validateEditMultipleIdsBody, CampaignController.delete);
// ====== Campaign Ends ======

router.post("/send-campaign", validatesendCampaignAssignmentBody, CampaignController.sendCampaignEmailToSubscribers);

// Campaign Furthur Apis
router.use("/email", emailCampaignRouter);
router.use("/inquiry", InquiryRouter);
router.use("/subscriber", SubscriberRouter);

export default router;
