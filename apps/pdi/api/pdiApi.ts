import * as express from "express";
import PdiChecklistController from "../controllers/pdiController";
import { validateCreateIChecklistBody, validateDeleteMultipleIdsBody, validateEditChecklistBody, validateEditCheckpointParams, validateListChecklistQuery } from "../validations/pdiValidations";
const router = express.Router();


// ===== Swagger Documentation =====
/**
 * @swagger
 * tags:
 *   name: pdi
 *   description: API for managing PDI
 */

/**
 * @swagger
 * /api/admin/pdi/create:
 *   post:
 *     summary: Create a new PDI
 *     tags: [PDI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - checkpoints
 *               - franchiseId
 *             properties:
 *               checkpoints:
 *                  type: object
 *                  properties:
 *                   key:
 *                     type: number,
 *                   value:
 *                     type: boolean
 *                  items:
 *                   type: number
 *               franchiseId:
 *                 type: number
 *     responses:
 *       201:
 *         description: PDI created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *
 * /api/admin/pdi/list:
 *   get:
 *     summary: Retrieve a list of PDI
 *     tags: [PDI]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: Number of PDI to retrieve
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         description: Number of PDI to skip
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: createdBy
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of PDI retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *
 * /api/admin/pdi/get/{id}:
 *   get:
 *     summary: Get a PDI by ID
 *     tags: [checklist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the Area
 *     responses:
 *       200:
 *         description: PDI details retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: PDI not found
 *
 * /api/admin/checklist/update/{id}:
 *   put:
 *     summary: Update a PDI by ID
 *     tags: [PDI]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the PDI to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               checkpoints:
 *                 type: integer
 *               franchiseModel:
 *                 type: number
 *     responses:
 *       200:
 *         description: PDI updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: PDI not found
 *
 * /api/admin/pdi/delete:
 *   delete:
 *     summary: Delete one or more PDI
 *     tags: [PDI]
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
 *                   type: number
 *                 example: [1, 2]
 *     responses:
 *       200:
 *         description: PDI deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: One or more PDI not found
 */


router.post('/create', validateCreateIChecklistBody,PdiChecklistController.create);
router.get('/list',validateListChecklistQuery, PdiChecklistController.list);
router.get('/get/:id', validateEditCheckpointParams, PdiChecklistController.get);
router.put('/update/:id', validateEditChecklistBody, validateEditChecklistBody,PdiChecklistController.update);
router.delete('/delete', validateDeleteMultipleIdsBody, PdiChecklistController.delete);

export default router;

