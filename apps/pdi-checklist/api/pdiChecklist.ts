import * as express from "express";
import PdiChecklistController from "../controllers/PdiChecklistController";
import {
    validateCreatePdiChecklistBody,
    validateUpdatePdiChecklistParams,
    validateUpdatePdiChecklistBody,
    validateGetPdiChecklistParams,
    validateDeletePdiChecklistBody,
} from "../validations/pdiChecklistValidation";
import { hasPermission } from '../../../middlewares';

const router = express.Router();

/**
 * @swagger
 * /api/admin/pdi-checklist/create:
 *   post:
 *     summary: Create a new PDI Checklist
 *     tags: [Admin > PDI Checklist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - franchiseeId
 *               - checklistName
 *               - pdiDate
 *               - status
 *               - items
 *             properties:
 *               franchiseeId:
 *                 type: string
 *               checklistName:
 *                 type: string
 *               pdiDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *               items:
 *                 type: object
 *     responses:
 *       '200':
 *         description: PDI Checklist created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/pdi-checklist/update/{id}:
 *   put:
 *     summary: Update a PDI Checklist
 *     tags: [Admin > PDI Checklist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the PDI Checklist to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - checklistName
 *               - pdiDate
 *               - status
 *               - items
 *             properties:
 *               checklistName:
 *                 type: string
 *               pdiDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *               items:
 *                 type: object
 *     responses:
 *       '200':
 *         description: PDI Checklist updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: PDI Checklist not found
 * 
 * /api/admin/pdi-checklist/get/{id}:
 *   get:
 *     summary: Get a PDI Checklist by ID
 *     tags: [Admin > PDI Checklist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the PDI Checklist to retrieve
 *     responses:
 *       '200':
 *         description: PDI Checklist retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: PDI Checklist not found
 * 
 * /api/admin/pdi-checklist/delete:
 *   delete:
 *     summary: Delete a PDI Checklist
 *     tags: [Admin > PDI Checklist]
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
 *         description: PDI Checklist deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: PDI Checklist not found
 */

router.post("/create", hasPermission('pdichecklist', 'create'), validateCreatePdiChecklistBody, PdiChecklistController.create);
router.put("/update/:id", hasPermission('pdichecklist', 'update'), validateUpdatePdiChecklistParams, validateUpdatePdiChecklistBody, PdiChecklistController.update);
router.get("/get/:id", hasPermission('pdichecklist', 'read'), validateGetPdiChecklistParams, PdiChecklistController.get);
router.delete("/delete", hasPermission('pdichecklist', 'delete'), validateDeletePdiChecklistBody, PdiChecklistController.delete);

export default router;
