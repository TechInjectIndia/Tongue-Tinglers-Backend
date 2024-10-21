import * as express from "express";
import ProposalModelController from "../controllers";
import * as ProposalModelValidation from "../validations";

const router = express.Router();

const {
  validateCreateProposalModelBody,
  validateEditProposalModelBody,
  validateEditProposalModelParams,
  validateListProposalModelQuery,
  validateEditMultipleIdsBody,
} = ProposalModelValidation;

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
 *         alt:
 *           type: string
 *           description: Alternative text for the image
 *     ProposalModel:
 *       type: object
 *       required:
 *         - title
 *         - createdAt
 *         - createdBy
 *         - budget
 *         - files
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the Proposal model
 *           example: "Fast Food Proposal Model"
 *         budget:
 *           type: number
 *           format: float
 *           description: Budget for the Proposal model
 *           example: 50000.00
 *         files:
 *           type: array
 *           description: List of SEO-optimized images
 *           items:
 *             $ref: '#/components/schemas/SeoImage'
 */

/**
 * @swagger
 * /api/admin/lead/Proposal-model/create:
 *   post:
 *     summary: Create a new ProposalModel
 *     tags: [ProposalModel]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProposalModel'
 *     responses:
 *       '201':
 *         description: ProposalModel created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProposalModel'
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
 * /api/admin/lead/Proposal-model/list:
 *   get:
 *     summary: Get all ProposalModels
 *     tags: [ProposalModel]
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
 *         description: ProposalModels retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProposalModel'
 *                 total:
 *                   type: integer
 *                   description: Total number of ProposalModels
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
 * /api/admin/lead/Proposal-model/get/{id}:
 *   get:
 *     summary: Get a ProposalModel by ID
 *     tags: [ProposalModel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the ProposalModel to retrieve
 *     responses:
 *       '200':
 *         description: ProposalModel retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProposalModel'
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
 *         description: ProposalModel not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "ProposalModel not found"
 */

/**
 * @swagger
 * /api/admin/lead/Proposal-model/update/{id}:
 *   put:
 *     summary: Update a ProposalModel
 *     tags: [ProposalModel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the ProposalModel to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProposalModel'
 *     responses:
 *       '200':
 *         description: ProposalModel updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProposalModel'
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
 *         description: ProposalModel not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "ProposalModel not found"
 */

/**
 * @swagger
 * /api/admin/lead/Proposal-model/delete:
 *   delete:
 *     summary: Delete one or more ProposalModels
 *     tags: [ProposalModel]
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
 *                 example: ["uuid1", "uuid2"]
 *     responses:
 *       '200':
 *         description: ProposalModels deleted successfully
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
router.post("/create", validateCreateProposalModelBody, ProposalModelController.create);
router.get("/list", validateListProposalModelQuery, ProposalModelController.list);
router.get("/get/:id", validateEditProposalModelParams, ProposalModelController.get);
router.put("/update/:id", validateEditProposalModelParams, validateEditProposalModelBody, ProposalModelController.update);
router.delete("/delete", validateEditMultipleIdsBody, ProposalModelController.delete);

export default router;
