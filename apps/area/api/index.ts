import * as express from 'express';
import AreaController from '../controllers/AreaController';
import * as AreaValidation from '../validations/AreaValidation';

const router = express.Router();

const {
  validateCreateAreaBody,
  validateEditAreaBody,
  validateEditAreaParams,
  validateListAreaQuery,
  validateEditMultipleIdsBody,
} = AreaValidation;

// ===== Swagger Documentation =====
/**
 * @swagger
 * tags:
 *   name: Areas
 *   description: API for managing Areas
 */

/**
 * @swagger
 * /api/admin/area/create:
 *   post:
 *     summary: Create a new Area
 *     tags: [Areas]
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
 *                 example: "Northern Area"
 *     responses:
 *       201:
 *         description: Area created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *
 * /api/admin/area/list:
 *   get:
 *     summary: Retrieve a list of Areas
 *     tags: [Areas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: Number of Areas to retrieve
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         description: Number of Areas to skip
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
 *         description: List of Areas retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *
 * /api/admin/area/get/{id}:
 *   get:
 *     summary: Get a Area by ID
 *     tags: [Areas]
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
 *         description: Area details retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Area not found
 *
 * /api/admin/area/update/{id}:
 *   put:
 *     summary: Update a Area by ID
 *     tags: [Areas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the Area to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Area"
 *     responses:
 *       200:
 *         description: Area updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Area not found
 *
 * /api/admin/area/delete:
 *   delete:
 *     summary: Delete one or more Areas
 *     tags: [Areas]
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
 *         description: Areas deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: One or more Areas not found
 */

// ===== Route Definitions =====
router.post('/create', AreaController.create);
router.get('/list', AreaController.list);
router.get('/get/:id', AreaController.get);
router.put('/update/:id', AreaController.update);
router.delete('/delete', AreaController.delete);

export default router;
