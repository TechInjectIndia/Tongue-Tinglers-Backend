import * as express from "express";
import PdiCheckpointController from "../controllers/pdiCheckpointController";
import {validateCreatePdiCheckpointBody, validateEditCheckpointBody, validateEditCheckpointParams, validateListCheckpointQuery, validateDeleteMultipleIdsBody} from "../validations/pdiCheckpointValidation";

const router = express.Router();

// ===== Swagger Documentation =====
/**
 * @swagger
 * tags:
 *   name: Checkpoints
 *   description: API for managing Checkpoints
 */

/**
 * @swagger
 * /api/admin/checkpoint/create:
 *   post:
 *     summary: Create a new checkpoint
 *     tags: [Checkpoint]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Checkpoint"
 *     responses:
 *       201:
 *         description: Area created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *
 * /api/admin/checkpoint/list:
 *   get:
 *     summary: Retrieve a list of Checkpoints
 *     tags: [Checkpoint]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: Number of Checkpoint to retrieve
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         description: Number of Checkpoint to skip
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
 *         description: List of Checkpoints retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *
 * /api/admin/checkpoint/get/{id}:
 *   get:
 *     summary: Get a Checkpoint by ID
 *     tags: [Checkpoint]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the Checkpoint
 *     responses:
 *       200:
 *         description: Checkpoint details retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Checkpoint not found
 *
 * /api/admin/checkpoint/update/{id}:
 *   put:
 *     summary: Update a Checkpoint by ID
 *     tags: [Checkpoint]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the Checkpoint to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Checkpoint"
 *     responses:
 *       200:
 *         description: Checkpoint updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Checkpoint not found
 *
 * /api/admin/checkpoint/delete:
 *   delete:
 *     summary: Delete one or more Checkpoint
 *     tags: [Checkpoint]
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
 *         description: Checkpoint deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: One or more Checkpoint not found
 */



router.post('/create', validateCreatePdiCheckpointBody,PdiCheckpointController.create);
router.get('/list',validateListCheckpointQuery, PdiCheckpointController.list);
router.get('/get/:id', PdiCheckpointController.get);
router.put('/update/:id', validateEditCheckpointBody,PdiCheckpointController.update);
router.delete('/delete', validateDeleteMultipleIdsBody, PdiCheckpointController.delete);

export default router;

