import * as express from "express";
import LeadController from "../controllers/lead";
import * as LeadValidation from "../validations/lead";
import { hasPermission } from '../../../middlewares';

const router = express.Router();

const {
  validateConvertLeadParams,
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
 *              - firstName
 *              - lastName
 *              - city
 *              - zipCode
 *              - state
 *              - country
 *              - phoneNumber
 *              - email
 *              - address
 *              - additionalInfo
 *              - status
 *              - referby
 *            properties:
 *              firstName:
 *                type: string
 *                default: firstName 
 *              lastName:
 *                type: string
 *                default: lastName 
 *              city:
 *                type: string
 *                default: city
 *              zipCode:
 *                type: string
 *                default: zipCode
 *              state:
 *                type: string
 *                default: state
 *              country:
 *                type: string
 *                default: country
 *              phoneNumber:
 *                type: string
 *                default: phoneNumber
 *              email:
 *                type: string
 *                default: email
 *              address:
 *                type: string
 *                default: address
 *              additionalInfo:
 *                type: text
 *                default: additionalInfo
 *              status:
 *                type: string
 *                default: new
 *              referby:
 *                type: string
 *                default: 'JCHKDHJ'
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
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Lead to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - city
 *               - zipCode
 *               - state
 *               - country
 *               - phoneNumber
 *               - address
 *               - additionalInfo
 *               - followedDate
 *               - status
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: "First name of the lead."
 *               lastName:
 *                 type: string
 *                 description: "Last name of the lead."
 *               city:
 *                 type: string
 *                 description: "City of residence."
 *               zipCode:
 *                 type: string
 *                 description: "Postal code."
 *               state:
 *                 type: string
 *                 description: "State of residence."
 *               country:
 *                 type: string
 *                 description: "Country of residence."
 *               phoneNumber:
 *                 type: string
 *                 description: "Contact phone number."
 *               address:
 *                 type: string
 *                 description: "Street address."
 *               additionalInfo:
 *                 type: string
 *                 description: "Any additional information about the lead."
 *               followedDate:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - date
 *                     - by
 *                     - isFollowedUp
 *                   properties:
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-12T09:30:50.95+05:30"
 *                       description: "Date of follow-up."
 *                     isFollowedUp:
 *                       type: boolean
 *                       description: "Indicates if the follow-up was made."
 *               status:
 *                 type: string
 *                 description: "Current status of the lead."
 *                 enum: 
 *                   - new
 *                   - in_progress
 *                   - completed
 *                   - closed
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
 *              - assignedTo
 *            properties:
 *              id:
 *                type: string
 *                default: "cf75234c-27a4-4cb8-8f52-0339fbac31fa"
 *              assignedTo:
 *                type: number
 *                default: 1
 *     responses:
 *       '200':
 *         description: Lead assigned successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Lead not found
 * 
 * /api/admin/lead/get-status/{id}:
 *   get:
 *     summary: Get status for lead
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
 * 
 * /api/admin/lead/convert-lead:
 *   post:
 *     summary: convert Lead to franchisee
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
 *            properties:
 *              id:
 *                type: string
 *                default: 1
 *     responses:
 *       '200':
 *         description: Lead coverted successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */
router.post("/create", hasPermission('lead', 'create'), validateCreateLeadBody, LeadController.create);
router.get("/list", hasPermission('lead', 'read'), validateListLeadQuery, LeadController.list);
router.get("/get/:id", hasPermission('lead', 'read'), validateEditLeadParams, LeadController.get);
router.put("/update/:id", hasPermission('lead', 'update'), validateEditLeadParams, validateEditLeadBody, LeadController.update);
router.delete("/delete", hasPermission('lead', 'delete'), validateEditMultipleIdsBody, LeadController.delete);

router.put("/assign-lead", hasPermission('lead', 'update'), validateAssignLeadBody, LeadController.assignLeadToAdminUser);
router.get("/get-status/:id", hasPermission('lead', 'update'), validateLeadStatusBody, LeadController.getLeadStatus);

router.post("/convert-lead", hasPermission('lead', 'update'), validateConvertLeadParams, LeadController.convertLeadToFranchisee);
// ====== Lead Ends ======

export default router;
