// src/routes/RegionRoutes.ts
import * as express from "express";
import RegionController from "../controllers/RegionController";
import * as RegionValidation from "../validations/RegionValidation";

const router = express.Router();

const {
  validateCreateRegionBody,
  validateEditRegionBody,
  validateEditRegionParams,
  validateListRegionQuery,
  validateEditMultipleIdsBody,
} = RegionValidation;

// ====== Regions Starts ======
/**
 * @swagger
 * /api/admin/region/create:
 *   post:
 *     summary: Create a new Region
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
 *               - name
 *               - code
 *               - description
 *               - isActive
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Northern Region"
 *               code:
 *                 type: string
 *                 example: "Country Name"
 *               description:
 *                 type: string
 *                 example: "Country Name"
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       '201':
 *         description: Region created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *
 * /api/admin/region/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Regions
 *     tags: [Regions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         required: false
 *         schema:
 *           type: integer
 *         description: Size of the retrieved data
 *       - in: query
 *         name: skip
 *         required: false
 *         schema:
 *           type: integer
 *         description: How many rows to skip
 *     responses:
 *       '200':
 *         description: Regions retrieved successfully
 *       '400':
 *         description: Invalid request
 *       '401':
 *         description: Unauthorized
 *
 * /api/admin/region/get/{id}:
 *   get:
 *     summary: Get a Region by ID
 *     tags: [Regions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Region to retrieve
 *     responses:
 *       '200':
 *         description: Region retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Region not found
 *
 * /api/admin/region/update/{id}:
 *   put:
 *     summary: Update a Region
 *     tags: [Regions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Region to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Region updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Region not found
 *
 * /api/admin/region/delete:
 *   delete:
 *     summary: Delete Regions
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
 *                   type: string
 *                 example: ["1", "2"]
 *     responses:
 *       '200':
 *         description: Regions deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Region not found
 */
router.post("/create", validateCreateRegionBody, RegionController.create);
router.get("/list", validateListRegionQuery, RegionController.list);
router.get("/get/:id", validateEditRegionParams, RegionController.get);
router.put("/update/:id", validateEditRegionParams, validateEditRegionBody, RegionController.update);
router.delete("/delete", validateEditMultipleIdsBody, RegionController.delete);

export default router;
