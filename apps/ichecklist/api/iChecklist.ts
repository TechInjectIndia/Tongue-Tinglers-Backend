import * as express from "express";
import PdiChecklistController from "../controllers/iChecklist";
import {
    validateCreateIChecklistBody,
    validateDeleteMultipleIdsBody,
    validateEditChecklistBody,
    validateEditCheckpointParams,
    validateListChecklistQuery,
} from "../validations/iChecklistValidation";
const router = express.Router();

// ===== Swagger Documentation =====
/**
 * @swagger
 * tags:
 *   name: Checklist
 *   description: API for managing Checklist
 */

/**
 * @swagger
 * /api/admin/checklist/create:
 *   post:
 *     summary: Create a new checklist
 *     tags: [Checklist]
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
 *               checkPoints:
 *                  type: object
 *                  properties:
 *                   key:
 *                     type: number,
 *                   value:
 *                     type: boolean
 *                  items:
 *                   type: number
 *               franchiseModelId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Checklist created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *
 * /api/admin/checklist/list:
 *   get:
 *     summary: Retrieve a list of checklist
 *     tags: [Checklist]
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
 * /api/admin/checklist/get/{id}:
 *   get:
 *     summary: Get a Checklist by ID
 *     tags: [Checklist]
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
 *         description: Checklist details retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Checklist not found
 *
 * /api/admin/checklist/update/{id}:
 *   put:
 *     summary: Update a Checklist by ID
 *     tags: [Checklist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the Checklist to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               checkPoints:
 *                 type: integer
 *               franchiseModelId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Checklist updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Checklist not found
 *
 * /api/admin/checklist/delete:
 *   delete:
 *     summary: Delete one or more Checklist
 *     tags: [Checklist]
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
 *         description: Checklist deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: One or more Checklist not found
 */

router.post(
    "/create",
    validateCreateIChecklistBody,
    PdiChecklistController.create
);
router.get("/list", validateListChecklistQuery, PdiChecklistController.list);
router.get(
    "/get/:id",
    validateEditCheckpointParams,
    PdiChecklistController.get
);
router.put(
    "/update/:id",
    validateEditChecklistBody,
    validateEditChecklistBody,
    PdiChecklistController.update
);
router.delete(
    "/delete",
    validateDeleteMultipleIdsBody,
    PdiChecklistController.delete
);

export default router;
