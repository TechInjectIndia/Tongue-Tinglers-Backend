import * as express from "express";
import LeadController from "../controllers/lead";
import * as LeadValidation from "../validations/lead";

const router = express.Router();

const {
  validateLeadStatusBody,
  validateAssignLeadBody,
  validateCreateLeadBody,
  validateEditLeadBody,
  validateEditLeadParams,
  validateListLeadQuery,
  validateEditMultipleIdsBody,
} = LeadValidation;

// ====== Lead Starts ======
/**
 * @swagger
 * /api/admin/lead/create:
 *   post:
 *     summary: Create a new Lead
 *     tags: [Admin > Lead]
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
 *              - city
 *              - zip_code
 *              - state
 *              - country
 *              - phone_number
 *              - email
 *              - address
 *              - additional_info
 *              - status
 *            properties:
 *              name:
 *                type: string
 *                default: Adminlead 
 *              city:
 *                type: text
 *                default: city
 *              zip_code:
 *                type: text
 *                default: zip_code
 *              state:
 *                type: text
 *                default: state
 *              country:
 *                type: text
 *                default: country
 *              phone_number:
 *                type: text
 *                default: phone_number
 *              email:
 *                type: text
 *                default: email
 *              address:
 *                type: text
 *                default: address
 *              additional_info:
 *                type: text
 *                default: additional_info
 *              status:
 *                type: boolean
 *                default: 0
 *     responses:
 *       '200':
 *         description: Lead created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/lead/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Lead
 *     tags: [Admin > Lead]
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
 *         description: Lead retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/lead/get/{id}:
 *   get:
 *     summary: Get a lead by ID
 *     tags: [Admin > Lead]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the lead to retrieve
 *     responses:
 *       '200':
 *         description: Lead retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the Lead to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Lead not found
 * 
 * /api/admin/lead/update/{id}:
 *   put:
 *     summary: Update a lead
 *     tags: [Admin > Lead]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Lead to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - city
 *              - zip_code
 *              - state
 *              - country
 *              - phone_number
 *              - email
 *              - address
 *              - additional_info
 *              - follow_date
 *              - status
 *            properties:
 *              name:
 *                type: string
 *                default: Lead 
 *              city:
 *                type: text
 *                default: city
 *              zip_code:
 *                type: text
 *                default: zip_code
 *              state:
 *                type: text
 *                default: state
 *              country:
 *                type: text
 *                default: country
 *              phone_number:
 *                type: text
 *                default: phone_number
 *              email:
 *                type: text
 *                default: email
 *              address:
 *                type: text
 *                default: address
 *              additional_info:
 *                type: text
 *                default: additional_info
 *              follow_date:
 *                type: string
 *                default: "02/02/2024"
 *              status:
 *                type: boolean
 *                default: 0 
 *     responses:
 *       '200':
 *         description: Lead updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Lead not found
 * 
 * /api/admin/lead/delete:
 *   delete:
 *     summary: Delete a lead
 *     tags: [Admin > Lead]
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
 *         description: lead deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Lead not found
 * 
 * /api/admin/lead/assign-lead:
 *   put:
 *     summary: Assign lead to other users
 *     tags: [Admin > Lead]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *              - assigned_to
 *            properties:
 *              id:
 *                type: number
 *                default: 3
 *              assigned_to:
 *                type: number
 *                default: 1
 *     responses:
 *       '200':
 *         description: Lead updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Lead not found
 * 
 * /api/admin/lead/get-status/{id}:
 *   get:
 *     summary: Get a lead by ID
 *     tags: [Admin > Lead]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: number
 *         description: ID of the lead to retrieve
 *     responses:
 *       '200':
 *         description: Lead status retreived successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *               description: ID of the Lead to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Lead not found
 */
router.post("/create", validateCreateLeadBody, LeadController.add);
router.get("/list", validateListLeadQuery, LeadController.list);
router.get("/get/:id", validateEditLeadParams, LeadController.get);
router.put("/update/:id", validateEditLeadParams, validateEditLeadBody, LeadController.update);
router.delete("/delete", validateEditMultipleIdsBody, LeadController.delete);

router.put("/assign-lead", validateAssignLeadBody, LeadController.assignLeadToAdminUser);
router.get("/get-status/:id", validateEditLeadParams, validateLeadStatusBody, LeadController.getLeadStatus);
// ====== Lead Ends ======

export default router;
