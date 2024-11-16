import * as express from 'express';
import RegionController from '../controllers/RegionController';
import * as RegionValidation from '../validations/RegionValidation';

const router = express.Router();

const {
  validateCreateRegionBody,
  validateEditRegionBody,
  validateEditRegionParams,
  validateListRegionQuery,
  validateEditMultipleIdsBody,
} = RegionValidation;

// ===== Swagger Documentation =====
/**
 * @swagger
 * tags:
 *   name: Regions
 *   description: API for managing regions
 */

/**
 * @swagger
 * /api/admin/region/create:
 *   post:
 *     summary: Create a new region
 *     tags: [Regions]
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
 *               - area
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Northern Region"
 *               area:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [100, 200]
 *     responses:
 *       201:
 *         description: Region created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *
 * /api/admin/region/list:
 *   get:
 *     summary: Get all region with filtering and pagination
 *     tags: [Regions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         required: true
 *         schema:
 *           type: integer
 *         description: Number of records to retrieve per page (limit).
 *       - in: query
 *         name: skip
 *         required: true
 *         schema:
 *           type: integer
 *         description: Number of records to skip (offset).
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: Search keyword for matching regions based on name, franchise ID, region, description, or other relevant fields.
 *       - in: query
 *         name: sorting
 *         required: false
 *         schema:
 *           type: string
 *           enum: [id ASC, id DESC, name ASC, name DESC, createdAt ASC, createdAt DESC]
 *         description: Sorting order for the results, e.g., 'id ASC' or 'createdAt DESC'.
 *       - in: query
 *         name: id
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter regions by id.
 *       - in: query
 *         name: title
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter regions by title.
 *       - in: query
 *         name: area
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter regions by area.
 *       - in: query
 *         name: createdBy
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter regions by createdBy.
 *       - in: query
 *         name: trashOnly
 *         required: false
 *         schema:
 *           type: string
 *         description: Flag to return only regions marked for deletion (trash).
 *     responses:
 *       '200':
 *         description: regions retrieved successfully
 *       '400':
 *         description: Invalid request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 * 
 * /api/admin/region/get/{id}:
 *   get:
 *     summary: Get a region by ID
 *     tags: [Regions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the region
 *     responses:
 *       200:
 *         description: Region details retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Region not found
 *
 * /api/admin/region/update/{id}:
 *   put:
 *     summary: Update a region by ID
 *     tags: [Regions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the region to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Region"
 *               area:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [150, 250]
 *     responses:
 *       200:
 *         description: Region updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Region not found
 *
 * /api/admin/region/delete:
 *   delete:
 *     summary: Delete one or more regions
 *     tags: [Regions]
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
 *         description: Regions deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: One or more regions not found
 */

// ===== Route Definitions =====
router.post('/create', RegionController.create);
router.get('/list', RegionController.list);
router.get('/get/:id', RegionController.get);
router.put('/update/:id', RegionController.update);
router.delete('/delete', RegionController.delete);

export default router;
