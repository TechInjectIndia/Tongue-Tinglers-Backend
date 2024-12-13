import * as express from "express";
import PdiChecklistController from "../controllers/pdiController";
import {
    validateCreateIChecklistBody,
    validateDeleteMultipleIdsBody,
    validateEditChecklistBody,
    validateEditCheckpointParams,
    validateId,
    validateListChecklistQuery,
    validateProspectId,
} from "../validations/pdiValidations";
const router = express.Router();

// ===== Swagger Documentation =====
/**
 * @swagger
 * tags:
 *   name: Pdi
 *   description: API for managing Pdi
 */

/**
 * @swagger
 * /api/admin/pdi/create:
 *   post:
 *     summary: Create a new Pdi
 *     tags: [Pdi]
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
 *               checkpoints:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     key:
 *                       type: number
 *                     value:
 *                       type: boolean
 *               prospectId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Pdi created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *
 * /api/admin/pdi/list:
 *   get:
 *     summary: Retrieve a list of Pdi
 *     tags: [Pdi]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: Number of Pdi to retrieve
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         description: Number of Pdi to skip
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
 *         description: List of Pdi retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *
 * /api/admin/pdi/get/{id}:
 *   get:
 *     summary: Get a Pdi by ID
 *     tags: [Pdi]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the Pdi
 *     responses:
 *       200:
 *         description: Pdi details retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pdi not found
 *
 * /api/admin/pdi/getPdiByProspect/{prospectId}:
 *   get:
 *     summary: Get a Pdi by prospectId
 *     tags: [Pdi]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: prospectId
 *         required: true
 *         schema:
 *           type: number
 *         description: prospectId of the Pdi
 *     responses:
 *       200:
 *         description: Pdi details retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pdi not found
 * 
 * /api/admin/pdi/update/{id}:
 *   put:
 *     summary: Update a Pdi by ID
 *     tags: [Pdi]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the Pdi to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               checkpoints:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     key:
 *                       type: number
 *                     value:
 *                       type: boolean
 *               prospectId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Pdi updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pdi not found
 *
 * /api/admin/pdi/delete:
 *   delete:
 *     summary: Delete one or more Pdi
 *     tags: [Pdi]
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
 *         description: Pdi deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: One or more Pdi not found
 */



router.post(
    "/create",validateCreateIChecklistBody,
    PdiChecklistController.create
);
router.get("/list", validateListChecklistQuery, PdiChecklistController.list);
router.get(
    "/get/:id", validateId,
    PdiChecklistController.get
);

router.get("/getPdiByProspect/:prospectId", validateProspectId,PdiChecklistController.getPdiByProspectId)
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
