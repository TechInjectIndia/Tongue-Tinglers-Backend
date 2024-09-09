import * as express from "express";
import InquiryController from "../controllers/inquiry";
import * as InquiryValidation from "../validations/inquiry";

const router = express.Router();
const {
  validateCreateInquiryBody,
  validateEditInquiryBody,
  validateEditInquiryParams,
  validateListInquiryQuery,
  validateEditMultipleIdsBody,
} = InquiryValidation;

// ====== Inquiry Starts ======
/**
 * @swagger 
 * 
 * /api/admin/campaign/inquiry/create:
 *   post:
 *     summary: Create a new Inquiry
 *     tags: [Admin > CRM > Inquiry]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - subject
 *              - message
 *              - type
 *            properties:
 *              email:
 *                type: string
 *                default: AdminInquiryNew
 *              subject:
 *                type: string
 *                default: subject
 *              message:
 *                type: string
 *                default: scheduledAt
 *              type:
 *                type: boolean
 *                default: 1
 *     responses:
 *       '200':
 *         description: Inquiry created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/campaign/inquiry/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Inquiry
 *     tags: [Admin > CRM > Inquiry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         email: size
 *         default: 10
 *         required: true
 *         schema:
 *           type: integer
 *         description: Size of the retreived data
 *       - in: query
 *         email: skip
 *         default: 0
 *         required: true
 *         schema:
 *           type: integer
 *         description: How many Rows want to skip
 *     responses:
 *       '200':
 *         description: Inquiry retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * /api/admin/campaign/inquiry/get/{id}:
 *   get:
 *     summary: Get a Inquiry by ID
 *     tags: [Admin > CRM > Inquiry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         email: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the Inquiry to retrieve
 *     responses:
 *       '200':
 *         description: Inquiry retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the Inquiry to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Inquiry not found
 * 
 * /api/admin/campaign/inquiry/update/{id}:
 *   put:
 *     summary: Update a Inquiry
 *     tags: [Admin > CRM > Inquiry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         email: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Inquiry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - subject
 *              - message
 *              - type
 *            properties:
 *              email:
 *                type: string
 *                default: AdminInquiryNew
 *              subject:
 *                type: string
 *                default: subject
 *              message:
 *                type: string
 *                default: scheduledAt
 *              type:
 *                type: boolean
 *                default: 1
 *     responses:
 *       '200':
 *         description: Inquiry updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Inquiry not found
 * 
 * /api/admin/campaign/inquiry/delete:
 *   delete:
 *     summary: Delete a Inquiry
 *     tags: [Admin > CRM > Inquiry]
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
 *         description: Inquiry deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Inquiry not found
 */
router.post("/create", validateCreateInquiryBody, InquiryController.create);
router.get("/list", validateListInquiryQuery, InquiryController.list);
router.get("/get/:id", validateEditInquiryParams, InquiryController.get);
router.put("/update/:id", validateEditInquiryParams, validateEditInquiryBody, InquiryController.update);
router.delete("/delete", validateEditMultipleIdsBody, InquiryController.delete);
// ====== Inquiry Ends ======

export default router;
