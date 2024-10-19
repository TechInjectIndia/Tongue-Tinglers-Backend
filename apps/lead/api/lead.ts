import * as express from "express";
import LeadController from "../controllers/lead";
import { 
    validateCreateLeadBody,
    validateListLeadQuery,
    validateEditLeadParams,
    validateEditLeadBody,
    validateEditMultipleIdsBody,
    validateAssignLeadBody,
    validateLeadStatusBody,
    validateConvertLeadParams 
} from "../validations/lead";
import { hasPermission } from '../../../middlewares';
import affiliateRouter from "../../affiliate/api/";
import franchiseModelRouter from "../../franchise_model/api/";
import proposalModelRouter from "../../proposal_model/api/";

const router = express.Router();

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
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - phoneNumber
 *               - email
 *               - address
 *               - additionalInfo
 *               - status
 *               - referBy
 *               - assign
 *               - followDetails
 *               - source
 *               - sourceInfo
 *               - notes
 *               - logs
 *               - proposalModals
 *               - franchiseModals
 *               - affiliate
 *               - marketing
 *               - other
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   zipCode:
 *                     type: string
 *                   country:
 *                     type: string
 *                   PAN:
 *                     type: string
 *               additionalInfo:
 *                 type: string
 *               status:
 *                 type: string
 *               referBy:
 *                 type: object
 *                 properties:
 *                   userName:
 *                     type: string
 *                   id:
 *                     type: string
 *               assign:
 *                 type: object
 *                 properties:
 *                   assignedTo:
 *                     type: object
 *                     properties:
 *                       userName:
 *                         type: string
 *                       id:
 *                         type: string
 *                   assignedBy:
 *                     type: object
 *                     properties:
 *                       userName:
 *                         type: string
 *                       id:
 *                         type: string
 *                   assignedDate:
 *                     type: string
 *                     format: date-time
 *               followDetails:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     followedDate:
 *                       type: string
 *                       format: date-time
 *                     followedBy:
 *                       type: object
 *                       properties:
 *                         userName:
 *                           type: string
 *                         id:
 *                           type: string
 *                     notes:
 *                       type: string
 *                     description:
 *                       type: string
 *                     status:
 *                       type: string
 *                     reminder:
 *                       type: string
 *                       format: date-time
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     createdBy:
 *                       type: object
 *                       properties:
 *                         userName:
 *                           type: string
 *                         id:
 *                           type: string
 *               source:
 *                 type: string
 *               sourceInfo:
 *                 type: string
 *               notes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     note:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date-time
 *                     userDetails:
 *                       type: object
 *                       properties:
 *                         userName:
 *                           type: string
 *                         id:
 *                           type: string
 *               logs:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     events:
 *                       type: string
 *                     timeline:
 *                       type: string
 *                       format: date-time
 *                     userDetails:
 *                       type: object
 *                       properties:
 *                         userName:
 *                           type: string
 *                         id:
 *                           type: string
 *               proposalModals:
 *                 type: array
 *                 items:
 *                   type: string
 *               franchiseModals:
 *                 type: array
 *                 items:
 *                   type: string
 *               affiliate:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *               marketing:
 *                 type: array
 *                 items:
 *                   type: string
 *               other:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *     responses:
 *       '200':
 *         description: Lead created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
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
 *               - phoneNumber
 *               - email
 *               - address
 *               - additionalInfo
 *               - status
 *               - referBy
 *               - assign
 *               - followDetails
 *               - source
 *               - sourceInfo
 *               - notes
 *               - logs
 *               - proposalModals
 *               - franchiseModals
 *               - affiliate
 *               - marketing
 *               - other
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   zipCode:
 *                     type: string
 *                   country:
 *                     type: string
 *                   PAN:
 *                     type: string
 *               additionalInfo:
 *                 type: string
 *               status:
 *                 type: string
 *               referBy:
 *                 type: object
 *                 nullable: true
 *                 properties:
 *                   userName:
 *                     type: string
 *                   id:
 *                     type: string
 *               assign:
 *                 type: object
 *                 properties:
 *                   assignedTo:
 *                     type: object
 *                     properties:
 *                       userName:
 *                         type: string
 *                       id:
 *                         type: string
 *                   assignedBy:
 *                     type: object
 *                     properties:
 *                       userName:
 *                         type: string
 *                       id:
 *                         type: string
 *                   assignedDate:
 *                     type: string
 *                     format: date-time
 *               followDetails:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     followedDate:
 *                       type: string
 *                       format: date-time
 *                     followedBy:
 *                       type: object
 *                       properties:
 *                         userName:
 *                           type: string
 *                         id:
 *                           type: string
 *                     notes:
 *                       type: string
 *                     description:
 *                       type: string
 *                     status:
 *                       type: string
 *                     reminder:
 *                       type: string
 *                       format: date-time
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     createdBy:
 *                       type: object
 *                       properties:
 *                         userName:
 *                           type: string
 *                         id:
 *                           type: string
 *               source:
 *                 type: string
 *               sourceInfo:
 *                 type: string
 *               notes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     note:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date-time
 *                     userDetails:
 *                       type: object
 *                       properties:
 *                         userName:
 *                           type: string
 *                         id:
 *                           type: string
 *               logs:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     events:
 *                       type: string
 *                     timeline:
 *                       type: string
 *                       format: date-time
 *                     userDetails:
 *                       type: object
 *                       properties:
 *                         userName:
 *                           type: string
 *                         id:
 *                           type: string
 *               proposalModals:
 *                 type: array
 *                 items:
 *                   type: string
 *               franchiseModals:
 *                 type: array
 *                 items:
 *                   type: string
 *               affiliate:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *               marketing:
 *                 type: array
 *                 items:
 *                   type: string
 *               other:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
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
 * /api/admin/lead/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Leads
 *     tags: [Admin > Lead]
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
 *         description: How many Rows want to skip
 *     responses:
 *       '200':
 *         description: Leads retrieved successfully
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
 *         schema:
 *           type: string
 *         description: ID of the lead to retrieve
 *     responses:
 *       '200':
 *         description: Lead retrieved successfully
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
 *     responses:
 *       '200':
 *         description: Lead deleted successfully
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
 *             type: object
 *             required:
 *               - id
 *               - assignedTo
 *             properties:
 *               id:
 *                 type: string
 *               assignedTo:
 *                 type: object
 *                 properties:
 *                   userName:
 *                     type: string
 *                   id:
 *                     type: string
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
 *         schema:
 *           type: number
 *         description: ID of the lead to retrieve
 *     responses:
 *       '200':
 *         description: Lead status retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Lead not found
 * 
 * /api/admin/lead/convert-lead:
 *   post:
 *     summary: Convert Lead to franchisee
 *     tags: [Admin > Lead]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Lead converted successfully
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

router.use("/affiliate", affiliateRouter);
router.use("/franchise-model", franchiseModelRouter);
router.use("/proposal-model", proposalModelRouter);
export default router;
