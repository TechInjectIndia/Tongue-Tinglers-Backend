import * as express from "express";
import FranchiseModelController from "../controllers";
import * as FranchiseModelValidation from "../validations";

const router = express.Router();

const {
  validateCreateFranchiseModelBody,
  validateEditFranchiseModelBody,
  validateEditFranchiseModelParams,
  validateListFranchiseModelQuery,
  validateEditMultipleIdsBody,
} = FranchiseModelValidation;

// ====== FranchiseModel Starts ======
/**
 * @swagger
 * components:
 *   schemas:
 *     SeoImage:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *           format: uri
 *           description: URL of the image
 *         altText:
 *           type: string
 *           description: Alternative text for the image
 *     ExtraFields:
 *       type: object
 *       additionalProperties:
 *         type: string
 *     FranchiseModel:
 *       type: object
 *       required:
 *         - description
 *         - title
 *         - reqArea
 *         - images
 *         - investment
 *         - runningCost
 *         - bestFor
 *         - inclusions
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the FranchiseModel
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         description:
 *           type: string
 *           description: Detailed description of the franchise model
 *           example: "A comprehensive franchise model for fast food chains."
 *         title:
 *           type: string
 *           description: Title of the franchise model
 *           example: "Fast Food Franchise Model"
 *         reqArea:
 *           type: integer
 *           description: Required area in square feet
 *           example: 1500
 *         images:
 *           type: array
 *           description: List of SEO-optimized images
 *           items:
 *             $ref: '#/components/schemas/SeoImage'
 *         investment:
 *           type: number
 *           format: float
 *           description: Initial investment required
 *           example: 50000.00
 *         runningCost:
 *           type: number
 *           format: float
 *           description: Monthly running cost
 *           example: 15000.00
 *         bestFor:
 *           type: array
 *           description: Categories best suited for the franchise
 *           items:
 *             type: string
 *           example: ["Urban Areas", "High Foot Traffic Locations"]
 *         inclusions:
 *           type: array
 *           description: Items included in the franchise package
 *           items:
 *             type: string
 *           example: ["Training", "Marketing Materials", "Initial Inventory"]
 *         others:
 *           $ref: '#/components/schemas/ExtraFields'
 */

/**
 * @swagger
 * /api/admin/lead/franchise-model/create:
 *   post:
 *     summary: Create a new FranchiseModel
 *     tags: [FranchiseModel]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FranchiseModel'
 *     responses:
 *       '201':
 *         description: FranchiseModel created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FranchiseModel'
 *       '400':
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validation error message"
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 */

/**
 * @swagger
 * /api/admin/lead/franchise-model/list:
 *   get:
 *     summary: Get all FranchiseModels
 *     tags: [FranchiseModel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: Number of records to retrieve
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *         required: false
 *         description: Number of records to skip
 *     responses:
 *       '200':
 *         description: FranchiseModels retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FranchiseModel'
 *                 total:
 *                   type: integer
 *                   description: Total number of FranchiseModels
 *       '400':
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid query parameters"
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 */

/**
 * @swagger
 * /api/admin/lead/franchise-model/get/{id}:
 *   get:
 *     summary: Get a FranchiseModel by ID
 *     tags: [FranchiseModel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the FranchiseModel to retrieve
 *     responses:
 *       '200':
 *         description: FranchiseModel retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FranchiseModel'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       '404':
 *         description: FranchiseModel not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "FranchiseModel not found"
 */

/**
 * @swagger
 * /api/admin/lead/franchise-model/update/{id}:
 *   put:
 *     summary: Update a FranchiseModel
 *     tags: [FranchiseModel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the FranchiseModel to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FranchiseModel'
 *     responses:
 *       '200':
 *         description: FranchiseModel updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FranchiseModel'
 *       '400':
 *         description: Invalid request body or parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validation error message"
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       '404':
 *         description: FranchiseModel not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "FranchiseModel not found"
 */

/**
 * @swagger
 * /api/admin/lead/franchise-model/delete:
 *   delete:
 *     summary: Delete one or more FranchiseModels
 *     tags: [FranchiseModel]
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
 *                   format: uuid
 *                 description: Array of FranchiseModel IDs to delete
 *                 example: ["123e4567-e89b-12d3-a456-426614174000"]
 *     responses:
 *       '200':
 *         description: FranchiseModels deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedCount:
 *                   type: integer
 *                   description: Number of FranchiseModels deleted
 *                   example: 2
 *       '400':
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validation error message"
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       '404':
 *         description: One or more FranchiseModels not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "One or more FranchiseModels not found"
 */

router.post("/create", validateCreateFranchiseModelBody, FranchiseModelController.create);
router.get("/list", validateListFranchiseModelQuery, FranchiseModelController.list);
router.get("/get/:id", validateEditFranchiseModelParams, FranchiseModelController.get);
router.put("/update/:id", validateEditFranchiseModelParams, validateEditFranchiseModelBody, FranchiseModelController.update);
router.delete("/delete", validateEditMultipleIdsBody, FranchiseModelController.delete);

export default router;
